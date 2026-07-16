# Thaiväg

En sajt för att lära sig prata thailändska på basnivå: verifierat ordförråd med exempelmeningar, grammatik och uttalsträning. Ingen serverkod, inga kostnader, ingen inloggning.

---

## Så publicerar du den (GitHub Pages, gratis)

1. Gå till **github.com** → knappen **New** (grön, uppe till vänster).
2. Döp repot till `thaivag`. Välj **Public**. Klicka **Create repository**.
3. På nästa sida: klicka **uploading an existing file**.
4. Dra in **alla fem filerna** (`index.html`, `styles.css`, `app.js`, `vocab.js`, `grammar.js`) i rutan. Klicka **Commit changes**.
5. Gå till **Settings** (kugghjulet uppe i repot) → **Pages** i vänstermenyn.
6. Under *Branch*: välj **main** och **/ (root)**. Klicka **Save**.
7. Vänta ~1 minut. Sidan ligger nu på:

```
https://DITT-ANVÄNDARNAMN.github.io/thaivag/
```

Lägg till den på hemskärmen i telefonen så beter den sig som en app.

**Viktigt:** filerna måste ligga direkt i repot, inte i en undermapp. Om du ser en tom sida — kontrollera att `index.html` finns i rotläget.

---

## Så fyller du på innehåll

All text ligger i två filer. Du behöver aldrig röra `app.js` eller `styles.css`.

### Lägga till ett ord

Öppna `vocab.js` på GitHub, klicka pennan (✏️) och lägg till ett objekt i `window.WORDS`:

```js
{"id":"ไก่|kyckling","th":"ไก่","ph":"gài","sv":"kyckling","cat":"mat","t":[1]}
```

| Fält  | Betyder |
|-------|---------|
| `id`  | Måste vara `thai|svenska` — det är nyckeln som sparar dina framsteg |
| `th`  | Thailändsk skrift |
| `ph`  | Uttal i vårt system (g, bp, dt, o=å, oe=ö, ue, oy) |
| `sv`  | Svensk betydelse |
| `cat` | Kategori-id: `fragor fraser verb beskriv folk mat tid plats resa stad natur shop sma nr` |
| `t`   | Ton per stavelse: `0` mellan, `1` låg, `2` fallande, `3` hög, `4` stigande |
| `note`| (valfritt) Tips som visas under ordet |
| `add` | (valfritt) `1` = tillägg utöver källistan, visas med ★ |
| `ex`  | (valfritt) Exempelmening: `{"th":"...","ph":"...","sv":"...","t":[0,1,2]}` |

### Lägga till en exempelmening

Lägg `ex` på ordet:

```js
{"id":"ปั๊มน้ำมัน|bensinmack","th":"ปั๊มน้ำมัน","ph":"bpám náam-man","sv":"bensinmack","cat":"stad","t":[3,3,0],
 "ex":{"th":"ผมจะหยุดที่ปั๊มน้ำมัน","ph":"pǒm jà yùt tîi bpám náam-man","sv":"Jag ska stanna vid bensinmacken.","t":[4,1,1,2,3,3,0]}}
```

`t` i meningen ska ha **ett tal per stavelse**, i samma ordning som stavelserna i `ph`.

### Lägga till en grammatikmodul

`grammar.js` — kopiera ett befintligt block och byt ut texten.

---

## Uttalssystemet

Regeln är: **läs bokstäverna som en svensk, så kommer rätt ljud ut.**

| Skrivs | Uttalas |
|--------|---------|
| `g`    | som g i *gata* (ไก่ = **gài**, inte "kai") |
| `k`    | k med luftpust |
| `bp`   | p utan luftpust — som p:et i *spela* |
| `dt`   | t utan luftpust — som t:et i *stark* |
| `o`    | **alltid å** — aldrig o som i *ro* |
| `oe`   | ö |
| `ae`   | ä |
| `ue`   | i med o-mun |
| `oy`   | åj |
| dubbel vokal | lång vokal |

Tonerna markeras `à â á ǎ` och ritas som färgade linjer under varje stavelse.

---

## Vad som är verifierat och vad som inte är det

- Ordförrådet är genomgånget mot källdokumentet. Tio rena fel är rättade, och rättelserna står i ordets anteckning.
- ★ markerar ord som lagts till utöver källan.
- Exempelmeningarna är handskrivna och byggda av ord som redan finns i ordförrådet — de repeterar alltså andra glosor medan de lär ut sammanhang.
- **Täckningen är ojämn:** 115 av 498 ord har exempelmening idag. Kategorierna visar sin egen täckning så du ser var luckorna finns.

## Ljudet

Uppläsningen använder enhetens egen talsyntes. Saknas thailändsk röst:
- **iPhone:** Inställningar › Tillgänglighet › Uppläst innehåll › Röster › Thailändska
- **Android:** Inställningar › Text-till-tal › installera thailändska
- **Dator:** Chrome och Edge har oftast thai inbyggt

Talsyntes är bra för att kalibrera toner, men den är syntetisk. Stäm av mot riktiga talare med jämna mellanrum.
