/* Grammatik – handskrivet. Varje exempel är byggt av ord som finns i ordförrådet. */
window.GRAMMAR = [
  {
    id: "ingen-bojning",
    n: "Ingen böjning – alls",
    kicker: "Börja här",
    lead: "Thailändska verb böjs aldrig. Inga tempus, inga personändelser, ingen plural, inga artiklar, inget genus. Ordet du lär dig är ordet du säger – varje gång, i alla lägen.",
    body: [
      "Svenskan tvingar dig att välja: går, gick, har gått, ska gå. Thailändskan har ett enda ord: <b>bpai</b>. Tiden framgår av ett litet extra ord eller av sammanhanget, aldrig av verbet självt.",
      "Det betyder att varje glosa du lär dig är färdig att använda direkt. Ingen böjningstabell står mellan dig och meningen.",
    ],
    ex: [
      ["ผมไป", "pǒm bpai", "Jag går / jag gick / jag ska gå"],
      ["เขาไป", "kǎo bpai", "Han går (samma verbform)"],
      ["เราไป", "rao bpai", "Vi går (fortfarande samma)"],
    ],
    warn: "Fällan: du kommer instinktivt leta efter en dåtidsform. Den finns inte. Släpp den.",
  },
  {
    id: "ordfoljd",
    n: "Ordföljd: precis som svenska",
    kicker: "Grunden",
    lead: "Subjekt – verb – objekt. Samma ordning som svenskan. Det här är den enskilt största gratisgåvan thailändskan ger dig.",
    body: [
      "<b>Pǒm gin kâao</b> = jag äter ris. Ord för ord i samma följd som svenskan. Du kan sätta ihop en fungerande mening från dag ett bara genom att byta ut orden.",
      "Skillnaden mot svenskan kommer först när du lägger på tid och plats – de hamnar i en annan ordning, se modulen <i>Bygg en mening</i>.",
    ],
    ex: [
      ["ผมกินข้าว", "pǒm gin kâao", "Jag äter ris."],
      ["เขาดื่มกาแฟ", "kǎo dùem gaa-fae", "Han dricker kaffe."],
      ["เราชอบทะเล", "rao chôp tá-lee", "Vi gillar havet."],
    ],
  },
  {
    id: "adjektiv",
    n: "Adjektivet kommer efter",
    kicker: "Beskrivande ord",
    lead: "Thailändskan säger inte 'ett stort hus' utan 'hus stort'. Och den behöver inget 'är' – adjektivet fungerar som verb.",
    body: [
      "<b>bâan yài</b> = hus stort = ett stort hus, <i>eller</i> huset är stort. Kontexten avgör, och du behöver aldrig fundera på vilket.",
      "Det här är den vanligaste nybörjarfällan för svenskar: du vill säga <i>yài bâan</i>. Vänd på det. Substantivet först, egenskapen efter.",
    ],
    ex: [
      ["บ้านใหญ่", "bâan yài", "Ett stort hus / huset är stort."],
      ["อาหารอร่อย", "aa-hǎan à-ròy", "Maten är god."],
      ["ผู้หญิงสวย", "pûu-yǐng sǔai", "En vacker kvinna."],
    ],
    warn: "Säg aldrig 'är' före ett adjektiv. Inte <s>aa-hǎan bpen à-ròy</s> – bara aa-hǎan à-ròy.",
  },
  {
    id: "negation",
    n: "Nej: mâi framför verbet",
    kicker: "Småord",
    lead: "Ett ord sköter all negation: mâi. Det ställer sig direkt framför verbet eller adjektivet.",
    body: [
      "<b>pǒm gin</b> = jag äter → <b>pǒm mâi gin</b> = jag äter inte. Ingenting annat ändras.",
      "Ska du förneka ett substantiv (nej, det är inte en taxi) använder du <b>mâi châi</b> i stället.",
    ],
    ex: [
      ["ผมไม่เข้าใจ", "pǒm mâi kâo-jai", "Jag förstår inte."],
      ["ไม่เผ็ด", "mâi pèt", "Inte starkt."],
      ["ไม่ใช่แท็กซี่", "mâi châi táek-sîi", "Det är inte en taxi."],
    ],
    warn: "Hör skillnaden: mâi (fallande) = inte. mǎi (stigande) = frågepartikel. Samma bokstäver, motsatt funktion.",
  },
  {
    id: "tid",
    n: "Tid görs med småord",
    kicker: "Tid & dagar",
    lead: "Eftersom verbet aldrig böjs bär fyra små ord hela tidsaxeln: jà, láew, gam-lang och koei.",
    body: [
      "<b>jà</b> före verbet = framtid. <b>láew</b> efter meningen = det är gjort. <b>gam-lang</b> före verbet = pågår just nu. <b>koei</b> före verbet = har någon gång gjort.",
      "Har du redan sagt ett tidsord (prûng-níi, mûea-waan) kan du oftast strunta i markören helt. Thailändskan upprepar inte information i onödan.",
    ],
    ex: [
      ["ผมจะไปตลาด", "pǒm jà bpai dtà-làat", "Jag ska gå till marknaden."],
      ["ผมกินแล้ว", "pǒm gin láew", "Jag har ätit."],
      ["ผมกำลังกิน", "pǒm gam-lang gin", "Jag håller på att äta."],
      ["ผมเคยไปภูเก็ต", "pǒm koei bpai puu-gèt", "Jag har varit i Phuket."],
    ],
  },
  {
    id: "fragor",
    n: "Frågor: partikeln sist",
    kicker: "Frågeord",
    lead: "Thailändskan kastar aldrig om ordföljden för att fråga. Du lägger bara till ett ord i slutet – meningen är i övrigt oförändrad.",
    body: [
      "<b>mǎi</b> sist = ja/nej-fråga. <b>châi mǎi</b> sist = eller hur? <b>rǔe yang</b> sist = ... än?",
      "Och det viktigaste: frågeorden står kvar där svaret hör hemma. Svenskan flyttar fram frågeordet (<i>Vart går du?</i>), thailändskan gör det inte: <b>kun bpai nǎi</b> = du går vart.",
    ],
    ex: [
      ["อาหารอร่อยไหม", "aa-hǎan à-ròy mǎi", "Är maten god?"],
      ["คุณไปไหน", "kun bpai nǎi", "Vart ska du? (ordagrant: du går vart)"],
      ["กินข้าวหรือยัง", "gin kâao rǔe yang", "Har du ätit än? (thailändarnas 'hur mår du')"],
    ],
    warn: "Svara aldrig 'ja' på en mǎi-fråga med ordet châi. Svara med verbet: à-ròy! (god!) eller mâi à-ròy.",
  },
  {
    id: "dai",
    n: "Kan, får, går det: dâi",
    kicker: "Verb",
    lead: "Ett enda ord täcker svenskans kan, får och går det – och det ställer sig efter verbet, inte före.",
    body: [
      "<b>pǒm pûut tai dâi</b> = jag kan prata thai. Ordagrant: jag pratar thai kan.",
      "Lägg till <b>mǎi</b> så blir det en artig fråga eller begäran: <b>... dâi mǎi</b> = går det bra att ...? Det här är den mest användbara frasstrukturen i hela språket.",
    ],
    ex: [
      ["ผมพูดไทยได้นิดหน่อย", "pǒm pûut tai dâi nít-nòy", "Jag kan prata lite thai."],
      ["ช่วยผมได้ไหม", "chûai pǒm dâi mǎi", "Kan du hjälpa mig?"],
      ["จอดตรงนี้ได้ไหม", "jòt dtrong-níi dâi mǎi", "Kan du stanna precis här?"],
    ],
  },
  {
    id: "artighet",
    n: "Artighet: pǒm och kráp",
    kicker: "Småord & artighet",
    lead: "Som man säger du pǒm om dig själv och avslutar med kráp. Utan kráp låter du inte oförskämd – du låter obekant.",
    body: [
      "<b>kráp</b> läggs sist i nästan allt du säger: frågor, svar, tack, ursäkter. Det är limmet i thailändsk artighet, och det kostar dig ingenting att lära.",
      "Vill du be om något artigt: <b>kǒ ... nòy kráp</b> = kan jag få ... tack. Det fungerar till allt – menyn, notan, en påse, en tjänst.",
    ],
    ex: [
      ["ขอเมนูหน่อยครับ", "kǒ mee-nuu nòy kráp", "Menyn, tack."],
      ["ขอบคุณมากครับ", "kòp-kun mâak kráp", "Tack så mycket."],
      ["ไม่เป็นไรครับ", "mâi-bpen-rai kráp", "Ingen fara."],
    ],
    warn: "Din källlista använder chǎn – det är kvinnligt. Säg pǒm.",
  },
  {
    id: "mattsord",
    n: "Måttsord: den enda riktigt svåra biten",
    kicker: "Siffror",
    lead: "Du kan inte säga 'två öl' på thailändska. Du säger 'öl två flaskor'. Varje räknat substantiv kräver ett måttsord – och ordningen är substantiv, siffra, måttsord.",
    body: [
      "<b>bia sǒng kùat</b> = öl två flaskor. <b>kon sǎam kon</b> = tre personer. Måttsordet berättar <i>vilken sorts sak</i> du räknar.",
      "Du behöver inte kunna alla. Sex stycken tar dig genom vardagen: <b>kon</b> (personer), <b>an</b> (saker i allmänhet), <b>dtua</b> (djur, kläder), <b>kùat</b> (flaskor), <b>gâeo</b> (glas), <b>jaan</b> (portioner).",
      "Och nödutgången: kan du inte måttsordet, använd <b>an</b>. Det låter lite barnsligt men blir alltid förstått.",
    ],
    ex: [
      ["ขอเบียร์สองขวดครับ", "kǒ bia sǒng kùat kráp", "Två öl (flaskor), tack."],
      ["ข้าวผัดหนึ่งจาน", "kâao-pàt nùeng jaan", "En portion stekt ris."],
      ["สำหรับสี่คนครับ", "sǎm-ràp sìi kon kráp", "För fyra personer."],
    ],
    warn: "Ett undantag du möter direkt: säger du bara 'en' hamnar siffran efter måttsordet – jaan nùeng låter naturligare än nùeng jaan på restaurang.",
  },
  {
    id: "jamforelser",
    n: "Jämförelser: gwàa och tîi-sùt",
    kicker: "Beskrivande ord",
    lead: "Två ändelser sköter hela jämförelsesystemet. Inga oregelbundna former, ingen komparativ att memorera.",
    body: [
      "<b>gwàa</b> efter adjektivet = mer än. <b>tîi-sùt</b> efter adjektivet = mest.",
      "Så: dii (bra) → dii gwàa (bättre) → dii tîi-sùt (bäst). Samma mönster på varje adjektiv i språket, utan undantag.",
    ],
    ex: [
      ["ถูกกว่า", "tùuk gwàa", "Billigare."],
      ["ร้านนี้อร่อยที่สุด", "ráan níi à-ròy tîi-sùt", "Den här restaurangen är godast."],
      ["ผมชอบทะเลมากกว่าเมือง", "pǒm chôp tá-lee mâak-gwàa mueang", "Jag gillar havet mer än staden."],
    ],
  },
  {
    id: "jai",
    n: "Hjärtat i språket: jai-orden",
    kicker: "Beskrivande ord",
    lead: "Thailändskan bygger sina känsloord av jai – hjärta. Lär dig mönstret och du får ett dussin ord gratis.",
    body: [
      "<b>kâo-jai</b> = gå in i hjärtat = förstå. <b>dii-jai</b> = bra hjärta = glad. <b>sǐa-jai</b> = trasigt hjärta = ledsen. <b>jai-yen</b> = svalt hjärta = lugn.",
      "Det här är inte bara vokabulär, det är en nyckel till hur thailändare tänker: <b>jai-yen-yen</b> (ta det lugnt) är en av landets viktigaste fraser.",
    ],
    ex: [
      ["ผมเข้าใจแล้ว", "pǒm kâo-jai láew", "Nu förstår jag."],
      ["ดีใจที่ได้เจอครับ", "dii-jai tîi dâi joe kráp", "Kul att träffas."],
      ["ใจเย็นๆ", "jai-yen-yen", "Ta det lugnt."],
    ],
  },
  {
    id: "bygg",
    n: "Bygg en mening själv",
    kicker: "Receptet",
    lead: "Så här sätter du ihop delarna. Ordningen är fast, och du behöver aldrig fylla alla platser.",
    body: [
      "<b>[Vem] + [när] + [verb] + [vad] + [var] + kráp</b>",
      "Lägg märke till att tidsordet kommer tidigt, ofta redan före verbet – tvärtemot svenskan, som gärna lägger det sist. <i>Jag ska äta på restaurangen imorgon</i> blir <b>pǒm prûng-níi jà gin kâao tîi ráan aa-hǎan</b>.",
      "Träna på att fylla platserna en i taget. Två platser är en fungerande mening. Fem är en flytande.",
    ],
    ex: [
      ["ผมกิน", "pǒm gin", "Jag äter. (2 platser – fungerar)"],
      ["ผมจะกินข้าว", "pǒm jà gin kâao", "Jag ska äta ris."],
      ["พรุ่งนี้ผมจะกินข้าวที่ร้านอาหารครับ", "prûng-níi pǒm jà gin kâao tîi ráan aa-hǎan kráp", "Imorgon ska jag äta på restaurangen."],
    ],
  },
];
