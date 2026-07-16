/* =========================================================
   THAIVÄG — applogik
   ========================================================= */

/* ---------- Toner: form + färg. Kärnan i hela designen. ---------- */
const TONE = [
  { n: "Mellan",   d: "M2 9 H30",              tip: "Jämn, avslappnad — som vanligt svenskt tal.", ex: "maa = komma" },
  { n: "Låg",      d: "M2 13 H30",             tip: "Jämn, men i botten av rösten.",              ex: "gài = kyckling" },
  { n: "Fallande", d: "M2 4 Q16 5 30 15",      tip: "Börjar högt och faller — eftertryckligt.",   ex: "mâi = inte" },
  { n: "Hög",      d: "M2 8 Q16 4 30 3",       tip: "Uppe i taket, lätt pressad.",                ex: "máa = häst" },
  { n: "Stigande", d: "M2 9 Q12 15 30 3",      tip: "Dippar och stiger — som ett frågande va?",   ex: "mǎa = hund" },
];

/* Renderar fonetik med en tonlinje under varje stavelse */
function phon(ph, tones, size) {
  const parts = ph.split(/[\s-]+/).filter(Boolean);
  const sep = ph.match(/[\s-]/g) || [];
  let html = '<div class="tph">';
  parts.forEach((s, i) => {
    const t = (tones && tones[i] !== undefined) ? tones[i] : 0;
    const tail = sep[i] === "-" ? "-" : "";
    html += `<span class="syl tc${t}">
      <span class="syl-t"${size ? ` style="font-size:${size}px"` : ""}>${s}${tail}</span>
      <svg width="32" height="17" viewBox="0 0 32 17" aria-hidden="true"><path d="${TONE[t].d}"/></svg>
    </span>`;
  });
  return html + "</div>";
}

/* ---------- Tal ---------- */
function thaiVoice() {
  try {
    return (speechSynthesis.getVoices() || []).find(v => (v.lang || "").toLowerCase().startsWith("th")) || null;
  } catch { return null; }
}
function say(text) {
  try {
    const s = speechSynthesis;
    if (!s) return;
    if (s.speaking || s.pending) s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = thaiVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "th-TH"; }
    u.rate = 0.75;
    setTimeout(() => { try { s.speak(u); } catch {} }, 30);
  } catch {}
}
try { speechSynthesis.onvoiceschanged = () => {}; } catch {}

/* ---------- Lagring (fungerar på GitHub Pages, till skillnad från i chatten) ---------- */
const KEY = "thaivag-v1";
let P = {};
try { P = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { P = {}; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch {} }
function lvl(id) { return (P[id] && P[id].b) || 0; }
function grade(id, ok) {
  const c = P[id] || { b: 0, r: 0, w: 0 };
  P[id] = { b: ok ? Math.min(4, c.b + 1) : 0, r: c.r + (ok ? 1 : 0), w: c.w + (ok ? 0 : 1) };
  save();
}

/* ---------- Navigering ---------- */
let view = "start";
function go(v) {
  view = v;
  document.querySelectorAll(".view").forEach(e => e.classList.remove("on"));
  document.getElementById("v-" + v).classList.add("on");
  document.querySelectorAll(".nav-link").forEach(b => b.classList.toggle("on", b.dataset.v === v));
  window.scrollTo({ top: 0, behavior: "instant" });
  if (v === "ord") drawCats();
  if (v === "dlg") drawDlgCats();
  if (v === "tran") drawTrain();
}

/* ---------- Start ---------- */
function drawStart() {
  const demo = [
    { th: "มา", ph: "maa", sv: "komma", t: 0 },
    { th: "หมา", ph: "mǎa", sv: "hund",  t: 4 },
    { th: "ม้า", ph: "máa", sv: "häst",  t: 3 },
  ];
  document.getElementById("tonedemo").innerHTML = demo.map(d => `
    <button class="tone-card" style="--tc:var(--t${d.t})" onclick="say('${d.th}')">
      <span class="tw thai">${d.th}</span>
      <svg width="60" height="22" viewBox="0 0 32 17" aria-hidden="true"><path class="tline" d="${TONE[d.t].d}"/></svg>
      <div class="tp">${d.ph}</div>
      <div class="tm">${d.sv}</div>
    </button>`).join("");

  const withEx = WORDS.filter(w => w.ex).length;
  const known = WORDS.filter(w => lvl(w.id) >= 3).length;
  document.getElementById("stats").innerHTML = [
    [WORDS.length, "ord & fraser"],
    [withEx, "exempelmeningar"],
    [GRAMMAR.length, "grammatikmoduler"],
    [DIALOGS.reduce((a, d) => a + d.rows.length, 0), "dialogfraser"],
    [known, "du behärskar"],
  ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join("");
}

/* ---------- Ordförråd ---------- */
function drawCats() {
  document.getElementById("ord-list").style.display = "";
  document.getElementById("ord-detail").style.display = "none";
  document.getElementById("cats").innerHTML = CATS.map(c => {
    const ws = WORDS.filter(w => w.cat === c.id);
    const m = ws.filter(w => lvl(w.id) >= 3).length;
    const ex = ws.filter(w => w.ex).length;
    return `<button class="cat" onclick="openCat('${c.id}')">
      <div class="cat-e">${c.e}</div>
      <div class="cat-n">${c.n}</div>
      <div class="cat-m">${ws.length} ord · ${ex} meningar</div>
      <div class="bar"><i style="width:${ws.length ? (m / ws.length) * 100 : 0}%"></i></div>
    </button>`;
  }).join("");
}

let hide = "none", open = null, shown = new Set();
function openCat(id) {
  const c = CATS.find(x => x.id === id);
  const ws = WORDS.filter(w => w.cat === id);
  hide = "none"; open = null; shown.clear(); curCat = id;
  document.getElementById("ord-list").style.display = "none";
  const d = document.getElementById("ord-detail");
  d.style.display = "";
  d.innerHTML = `
    <button class="back" onclick="drawCats()">← Alla kategorier</button>
    <h2 class="h2">${c.e} ${c.n}</h2>
    <p class="sub">Tryck på ett ord för att se det i en mening. Färgen och linjen under varje stavelse är tonen.</p>
    <div class="tools">
      <button class="chip" onclick="startCat('${id}','kort')">Öva som glosskort</button>
      <button class="chip" onclick="startCat('${id}','quiz')">Öva som quiz</button>
      <button class="chip gold" id="h-th" onclick="setHide('th')">Dölj thai</button>
      <button class="chip gold" id="h-sv" onclick="setHide('sv')">Dölj svenska</button>
    </div>
    <div class="words" id="wlist"></div>`;
  drawWords(ws);
}
function setHide(m) {
  hide = hide === m ? "none" : m;
  open = null; shown.clear();
  document.getElementById("h-th").classList.toggle("on", hide === "th");
  document.getElementById("h-sv").classList.toggle("on", hide === "sv");
  drawWords(WORDS.filter(w => w.cat === curCat));
}
let curCat = null;
function drawWords(ws) {
  document.getElementById("wlist").innerHTML = ws.map(w => {
    const b = lvl(w.id);
    const vis = hide === "none" || shown.has(w.id);
    const hTh = hide === "th" && !vis;
    const hSv = hide === "sv" && !vis;
    const isOpen = open === w.id && vis;
    let ex = "";
    if (isOpen) {
      ex = w.ex
        ? `<div class="ex">
             <div class="ex-th thai">${w.ex.th}</div>
             ${phon(w.ex.ph, w.ex.t)}
             <div class="ex-sv">${w.ex.sv}</div>
             <button class="chip" style="margin-top:10px" onclick="event.stopPropagation();say('${w.ex.th}')">Lyssna på meningen</button>
           </div>`
        : `<div class="ex-none">Ingen exempelmening än — den här kategorin fylls på i nästa omgång.</div>`;
    }
    return `<div class="word" onclick="tog('${w.id}')">
      <button class="spk" onclick="event.stopPropagation();say('${w.th}')" aria-label="Lyssna">▶</button>
      <div>
        ${hTh ? '<span class="hid">visa thai</span>' :
          `<div class="w-th thai">${w.th} ${w.add ? '<span class="star">★</span>' : ""}</div>${phon(w.ph, w.t)}`}
        ${hSv ? '<span class="hid">visa svenska</span>' : `<div class="w-sv">${w.sv}</div>`}
        ${w.note && vis ? `<div class="w-note">${w.note}</div>` : ""}
      </div>
      <div class="dot ${b >= 3 ? "l3" : b >= 1 ? "l1" : ""}"></div>
      ${ex}
    </div>`;
  }).join("");
}
function tog(id) {
  if (hide !== "none" && !shown.has(id)) shown.add(id);
  else open = open === id ? null : id;
  drawWords(WORDS.filter(w => w.cat === curCat));
}

/* ---------- Grammatik ---------- */
/* ---------- Fraser & dialoger ---------- */
function drawDlgCats() {
  document.getElementById("dlg-list").style.display = "";
  document.getElementById("dlg-detail").style.display = "none";
  document.getElementById("dlg-cats").innerHTML = DIALOGS.map(d => `
    <button class="cat" onclick="openDlg('${d.id}')">
      <div class="cat-e">${d.e}</div>
      <div class="cat-n">${d.n}</div>
      <div class="cat-m">${d.rows.length} fraser</div>
    </button>`).join("");
}
function openDlg(id) {
  const dlg = DIALOGS.find(x => x.id === id);
  document.getElementById("dlg-list").style.display = "none";
  const el = document.getElementById("dlg-detail");
  el.style.display = "";
  el.innerHTML = `
    <button class="back" onclick="drawDlgCats()">← Alla scener</button>
    <h2 class="h2">${dlg.e} ${dlg.n}</h2>
    <p class="sub">${dlg.lead}</p>
    <div class="words">
      ${dlg.rows.map(r => `
        <div class="word" style="cursor:default">
          <button class="spk" onclick="say('${r.th}')" aria-label="Lyssna">▶</button>
          <div>
            <div class="w-th thai">${r.th}</div>
            ${phon(r.ph, r.t)}
            <div class="w-sv">${r.sv}</div>
            ${r.note ? `<div class="w-note">${r.note}</div>` : ""}
          </div>
          <div></div>
        </div>`).join("")}
    </div>`;
}

function drawGram() {
  document.getElementById("gram").innerHTML = GRAMMAR.map((g, i) => `
    <div class="g" id="g${i}">
      <button class="g-head" onclick="togG(${i})">
        <span class="g-kick">${g.kicker}</span>
        <span class="g-n">${g.n}</span>
        <span class="g-caret">›</span>
      </button>
      <div class="g-body">
        <div class="g-lead">${g.lead}</div>
        ${g.body.map(p => `<p>${p}</p>`).join("")}
        <div class="g-ex">
          ${g.ex.map(e => `<div class="g-ex-row">
            <button class="spk" onclick="say('${e[0]}')" aria-label="Lyssna">▶</button>
            <div style="flex:1">
              <div class="thai" style="font-size:18px">${e[0]}</div>
              <div class="ph" style="font-size:14px;color:var(--jade);margin:2px 0 3px">${e[1]}</div>
              <div style="font-size:13.5px;color:var(--muted)">${e[2]}</div>
            </div>
          </div>`).join("")}
        </div>
        ${g.warn ? `<div class="g-warn">${g.warn}</div>` : ""}
      </div>
    </div>`).join("");
}
function togG(i) { document.getElementById("g" + i).classList.toggle("open"); }

/* ---------- Träna ---------- */
const W = [8, 5, 3, 1.6, .6];
function pick(pool, n) {
  const items = [...pool], out = [];
  while (out.length < n && items.length) {
    const ws = items.map(w => W[lvl(w.id)]);
    let r = Math.random() * ws.reduce((a, b) => a + b, 0), idx = items.length - 1;
    for (let i = 0; i < items.length; i++) { r -= ws[i]; if (r <= 0) { idx = i; break; } }
    out.push(items.splice(idx, 1)[0]);
  }
  return out;
}
let S = null;
function drawTrain() {
  if (S) return render();
  const known = WORDS.filter(w => lvl(w.id) >= 3).length;
  document.getElementById("tran").innerHTML = `
    <h2 class="h2">Träna</h2>
    <p class="sub">Rätt svar lyfter ordet en nivå, fel skickar tillbaka det till start och gör att det dyker upp oftare. Du behärskar ${known} av ${WORDS.length} ord.</p>
    <div class="modes">
      <button class="mode" onclick="start(null,'kort')">
        <div style="font-size:22px">🂠</div><b>Glosskort</b><span>Svenska → thai. Säg det högt, vänd, bedöm dig själv.</span>
      </button>
      <button class="mode" onclick="start(null,'quiz')">
        <div style="font-size:22px">◎</div><b>Fyrval</b><span>Snabbt igenkänningstest med fyra alternativ.</span>
      </button>
    </div>`;
}
function startCat(cat, mode) { go("tran"); start(cat, mode); }
function start(cat, mode) {
  const pool = cat ? WORDS.filter(w => w.cat === cat) : WORDS;
  const items = pick(pool, Math.min(12, pool.length)).map(w => ({
    w, opts: mode === "quiz" ? opts(w) : null,
  }));
  S = { items, i: 0, mode, cat, flip: false, pickd: null, right: 0, miss: [] };
  go("tran"); render();
}
function opts(w) {
  const same = WORDS.filter(x => x.cat === w.cat && x.id !== w.id && x.sv !== w.sv);
  const pool = same.length >= 3 ? same : WORDS.filter(x => x.id !== w.id);
  const o = [w], seen = new Set([w.sv]);
  for (const x of pool.sort(() => Math.random() - .5)) {
    if (!seen.has(x.sv)) { o.push(x); seen.add(x.sv); }
    if (o.length === 4) break;
  }
  return o.sort(() => Math.random() - .5);
}
function render() {
  const el = document.getElementById("tran");
  if (!S) return drawTrain();
  if (S.i >= S.items.length) {
    el.innerHTML = `
      <button class="back" onclick="S=null;drawTrain()">← Träna</button>
      <div class="done">
        <div class="done-n">${S.right}<span style="color:var(--faint);font-size:32px">/${S.items.length}</span></div>
        <div class="done-t">${S.miss.length ? "Missarna kommer oftare i nästa pass." : "sèt láew — felfritt."}</div>
        ${S.miss.length ? `<div class="words" style="text-align:left;margin-bottom:18px">${S.miss.map(w => `
          <div class="word">
            <button class="spk" onclick="say('${w.th}')" aria-label="Lyssna">▶</button>
            <div><div class="w-th thai">${w.th}</div>${phon(w.ph, w.t)}<div class="w-sv">${w.sv}</div></div>
            <div></div>
          </div>`).join("")}</div>` : ""}
        <button class="btn btn-go" onclick="start(S.cat,S.mode)">Nytt pass</button>
        ${S.miss.length ? `<button class="btn btn-alt" onclick="again()">Öva bara missarna (${S.miss.length})</button>` : ""}
      </div>`;
    return;
  }
  const c = S.items[S.i], w = c.w;
  const bar = `<div class="prog"><i style="width:${(S.i / S.items.length) * 100}%"></i></div>`;
  const head = `<button class="back" onclick="S=null;drawTrain()">← Avbryt</button>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <span class="eyebrow" style="margin:0">${S.mode === "kort" ? "Glosskort" : "Fyrval"}</span>
      <span class="ph" style="color:var(--faint);font-size:13px">${S.i + 1} / ${S.items.length}</span>
    </div>${bar}`;

  if (S.mode === "kort") {
    el.innerHTML = head + `
      <div class="card" onclick="S.flip=!S.flip;render()">
        <div>
          ${!S.flip
            ? `<div class="card-sv">${w.sv}</div><div class="card-hint">Säg det på thai — tryck sedan för att vända.</div>`
            : `<div class="card-th thai">${w.th}</div>${phon(w.ph, w.t, 20)}
               ${w.note ? `<div class="w-note" style="margin-top:12px">${w.note}</div>` : ""}
               ${w.ex ? `<div class="ex" style="margin-top:18px;text-align:left">
                  <div class="ex-th thai">${w.ex.th}</div>${phon(w.ex.ph, w.ex.t)}
                  <div class="ex-sv">${w.ex.sv}</div></div>` : ""}
               <button class="chip" style="margin-top:14px" onclick="event.stopPropagation();say('${w.th}')">Lyssna</button>`}
        </div>
      </div>
      ${S.flip ? `<div class="grade">
        <button class="btn btn-no" onclick="next(false)">Kunde inte</button>
        <button class="btn btn-yes" onclick="next(true)">Kunde det</button>
      </div>` : ""}`;
  } else {
    const done = S.pickd !== null;
    el.innerHTML = head + `
      <div class="card" style="min-height:180px;cursor:default">
        <div><div class="card-sv" style="font-size:32px">${w.sv}</div></div>
      </div>
      <div class="opts">
        ${c.opts.map((o, i) => {
          let cls = "";
          if (done) cls = o.id === w.id ? " right" : (i === S.pickd ? " wrong" : "");
          return `<button class="opt${cls}" ${done ? "disabled" : ""} onclick="ans(${i})">
            <span class="thai" style="font-size:18px">${o.th}</span>
            <span class="ph" style="color:var(--jade);margin-left:10px;font-size:14px">${o.ph}</span>
          </button>`;
        }).join("")}
      </div>
      ${done ? `<button class="btn btn-go" style="margin-top:14px" onclick="next(c_ok())">Nästa</button>` : ""}`;
  }
}
function ans(i) { S.pickd = i; say(S.items[S.i].w.th); render(); }
function c_ok() { const c = S.items[S.i]; return c.opts[S.pickd].id === c.w.id; }
function next(ok) {
  const w = S.items[S.i].w;
  grade(w.id, ok);
  if (ok) S.right++; else S.miss.push(w);
  S.i++; S.flip = false; S.pickd = null;
  render(); drawStart();
}
function again() {
  const m = S.miss;
  S = { items: m.map(w => ({ w, opts: S.mode === "quiz" ? opts(w) : null })), i: 0, mode: S.mode, cat: S.cat, flip: false, pickd: null, right: 0, miss: [] };
  render();
}

/* ---------- Uttal ---------- */
function drawUtt() {
  const kons = [
    ["g", "som g i gata", "gài (kyckling), gin (äta)"],
    ["k", "som k i katt — alltid med luftpust", "kun (du), kâao (ris)"],
    ["bp", "p utan luftpust — som p:et i spela", "bpai (gå), bpen (vara)"],
    ["p", "som p i pappa — med luftpust", "pûut (prata), pǒm (jag)"],
    ["dt", "t utan luftpust — som t:et i stark", "dtó (bord), dtông (måste)"],
    ["t", "som t i tak — med luftpust", "tam (göra), tîi-nǎi (var)"],
    ["j", "ungefär dj som i djungel, kort", "jà (ska), jèp (gör ont)"],
    ["ch", "som engelskt ch i church", "chôp (gilla), chái (använda)"],
    ["ng", "som ng i sång — men kan börja ord", "ngoen (pengar): säg sång-en, ta bort så-"],
    ["-p -t -k", "stannar i munnen, släpps aldrig ut", "Slut-L blir N: bill → bin (nota)"],
  ];
  const vok = [
    ["o / oo", "å! Alltid å — aldrig o som i ro", "rón (varm), chôp (gilla), sǒng (2)"],
    ["oe", "ö", "doen (gå) ≈ dön, ngoen (pengar) ≈ ngön"],
    ["ae", "ä som i här", "gâeo (glas), dàet (solsken)"],
    ["ue", "säg i, men forma munnen som för o", "súe (köpa), nǔea (norr)"],
    ["oy", "åj", "à-ròy (gott), nòy (lite)"],
    ["a / aa", "kort a i katt / långt a i far", "Dubbel vokal = lång vokal, alltid"],
    ["ai / ao", "aj / au", "dâi (kan), kǎo (han/hon)"],
  ];
  document.getElementById("utt").innerHTML = `
    <h2 class="h2">Uttal</h2>
    <p class="sub">Systemet är byggt på en enda regel: läs bokstäverna som en svensk, så kommer rätt ljud ut. Traditionell translitterering skriver ก som "k" fast det låter som svenskt <b style="color:var(--paper)">g</b> — därför skrivs ไก่ här som gài, inte kai.</p>

    <h3 class="g-n" style="margin:26px 0 12px">De fem tonerna</h3>
    <p class="sub" style="margin-bottom:14px">Tonen är en del av ordet, inte en betoning. Varje ton har en egen färg och en egen linje — samma system som används i hela sajten.</p>
    <div class="rows">
      ${TONE.map((t, i) => `<div class="tone-row">
        <b class="tc${i}" style="color:var(--t${i})">${["a","à","â","á","ǎ"][i]}</b>
        <svg width="40" height="20" viewBox="0 0 32 17" class="tc${i}"><path d="${t.d}" style="stroke:var(--t${i});stroke-width:2.4;fill:none;stroke-linecap:round"/></svg>
        <div><div class="tn">${t.n} · <span style="color:var(--muted);font-weight:400">${t.ex}</span></div><div class="tt">${t.tip}</div></div>
      </div>`).join("")}
    </div>

    <h3 class="g-n" style="margin:26px 0 12px">Konsonanter</h3>
    <div class="rows">${kons.map(r => `<div class="row"><div class="row-k">${r[0]}</div><div><div class="row-v">${r[1]}</div><div class="row-e">${r[2]}</div></div></div>`).join("")}</div>

    <h3 class="g-n" style="margin:26px 0 12px">Vokaler</h3>
    <div class="rows">${vok.map(r => `<div class="row"><div class="row-k">${r[0]}</div><div><div class="row-v">${r[1]}</div><div class="row-e">${r[2]}</div></div></div>`).join("")}</div>

    <div class="note-box">
      <h4>Som man: pǒm och kráp</h4>
      <p>Ordlistor använder ofta chǎn för "jag" — det är kvinnligt. Säg <b style="color:var(--paper)">pǒm</b> och avsluta artigt med <b style="color:var(--paper)">kráp</b>: "Pǒm mâi kâo-jai kráp" = jag förstår inte.</p>
    </div>

    <div class="note-box" style="margin-top:12px;background:rgba(63,217,164,.06);border-color:rgba(63,217,164,.25)">
      <h4 style="color:var(--jade)">Hör du inget?</h4>
      <p>Uppläsningen använder enhetens egen thailändska röst. Saknas den: <b style="color:var(--paper)">iPhone</b> → Inställningar › Tillgänglighet › Uppläst innehåll › Röster › Thailändska. <b style="color:var(--paper)">Android</b> → Inställningar › Text-till-tal › installera thailändska. <b style="color:var(--paper)">Dator</b> → Chrome och Edge har oftast thai inbyggt.</p>
    </div>`;
}

/* ---------- Start ---------- */
drawStart();
drawGram();
drawUtt();
