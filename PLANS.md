# Další vývoj

Prioritou je atlas hub jako terénní průvodce v Android Firefoxu. Historie vydání je v [CHANGELOG.md](CHANGELOG.md), instalace a build v [README.md](README.md).

## Priority

- [ ] Prověřit hlášený malý modal na konkrétní stránce a fotografii; v dosavadních zkouškách se nereprodukoval. Zachovat plnou šířku i u malých zdrojů na HiDPI displeji, proporce, kredit a dostupné zavření.
- [ ] Zjednodušit první zobrazení: omezit opakovanou navigaci a zvážit stručný kontext v horní liště podle původního obsahu.
- [ ] Na fyzickém telefonu ověřit české i latinské hledání, klávesnici, návrat Zpět a pozici stránky; také zoom, větší písmo a TalkBack.
- [ ] Ověřit ukládání volby celého webu po restartu Firefoxu a desktopové chování v běžném prohlížeči.

## Důležité pro vývoj

- Původní web používá Windows-1250. Zachovat české hledání, identifikační údaje, odkazy a autorství.
- Tabulky atlasu nejsou jen galerie: nepřevádět systematiku či literaturu na mřížku fotografií. Web používá dva prohlížeče fotografií.
- HiDPI testovat změnou rozlišení i hustoty při stejné CSS šířce; samotné vyšší rozlišení může zapnout desktopové rozložení.
- Základní rozložení 0.1.0 prošlo v Android 16 Firefoxu s Tampermonkey v portrétu i krajině; automatické kontroly zahrnují rozložení, start skriptu a fotografie. Uživatel potvrzuje praktickou použitelnost. Otevřené body výše jsou cílené další kontroly.

## Android emulátor

- Na vývojovém Macu je AVD `MapFlip_API_36` s Firefoxem a Tampermonkey. Jde o sdílený emulátor; nepoužívat `-wipe-data`.
- Spuštění: `emulator -avd MapFlip_API_36 -no-snapshot-save`. Připojené zařízení zjistit přes `adb devices -l`.
- Snímek: `adb shell screencap -p /sdcard/myko.png`, poté `adb pull /sdcard/myko.png tmp/android-screen.png`. Pro ovládání použít `adb shell input`; souřadnice vždy odvodit z aktuálního snímku.
- Místní build: zkopírovat skript do `tmp/`, spustit `python3 -m http.server 8765 --bind 127.0.0.1 --directory tmp`, připojit `adb reverse tcp:8765 tcp:8765` a ve Firefoxu otevřít `http://127.0.0.1:8765/myko-responsive.user.js`. Po zkoušce zastavit server a odebrat pravidlo přes `adb reverse --remove tcp:8765`.
- Po aktualizaci obnovit testované karty. Po změně hustoty znovu načíst stránku; po zkoušce vrátit rozlišení, hustotu a otáčení.
- Při ručním testu zadat uživateli jeden konkrétní úkol a pozastavit vstup ADB, dokud uživatel nepředá ovládání zpět. Zapisovat jen problémy důležité pro další vývoj.
