# Další vývoj

Usnadnit používání atlasu při hledání hub v terénu, především ve Firefoxu na Androidu. Historie změn je v [CHANGELOG.md](CHANGELOG.md), návod k instalaci a sestavení skriptu v [README.md](README.md).

## Další práce

- [ ] Prověřit hlášení, že se fotografie po klepnutí dostatečně nezvětší. Zjistit konkrétní stránku a snímek; při dosavadních zkouškách se problém neprojevil. I fotografie s nízkým rozlišením má na jemném displeji využít celou šířku. Zachovat poměr stran, jméno autora a snadné zavření okna.
- [ ] Zpřehlednit začátek stránky: omezit opakující se nabídky a zvážit krátký úryvek z původního textu v horní liště.
- [ ] Na skutečném telefonu vyzkoušet hledání podle českého i latinského názvu, klávesnici a tlačítko Zpět. Po návratu má stránka zůstat posunutá na původní místo. Ověřit také přiblížení stránky, větší písmo a čtečku obrazovky TalkBack.
- [ ] Ověřit, zda nastavení mobilního zobrazení celého webu zůstane uložené po restartu Firefoxu a zda se web správně zobrazuje i na počítači.

## Poznámky k vývoji

- [x] Verze 0.1.1: nastavit viewport atlasu při začátku načítání a přizpůsobit zvětšené fotografie výšce obrazovky v poloze na šířku. Ověřeno ve Firefoxu s Tampermonkey na emulátoru Androidu 16: celý snímek a autor na šířku, otevření detailu a návrat tlačítkem Zpět bez nadměrného přiblížení. Automatické kontroly v Chromiu prošly pro všechny podkladové stránky při šířkách 320–1280 px, včetně hledání a obou prohlížečů fotografií. Automatický desktopový Firefox se na tomto Macu nespustil (chyba grafického framebufferu a sandboxu); jeho kontroly nelze potvrdit.
- [ ] Na skutečném telefonu zopakovat návrat z výsledků hledání přes Zpět a ověřit zachování ručního přiblížení; emulátor nenahrazuje tuto zkoušku.
- Původní web používá kódování Windows-1250. Zachovat hledání s diakritikou, údaje k určování hub, odkazy a jména autorů.
- Tabulky atlasu obsahují také systematiku a literaturu; nepřevádět je všechny na fotogalerie. Web používá dva různé nástroje pro zvětšování fotografií.
- U displejů s vysokou hustotou pixelů (HiDPI) měnit při zkouškách rozlišení i hustotu pixelů tak, aby šířka v CSS pixelech zůstala stejná. Samotné zvýšení rozlišení může přepnout stránku do rozložení pro počítač.
- Verze 0.1.0 prošla kontrolou zobrazení na výšku i na šířku ve Firefoxu s Tampermonkey na Androidu 16. Automatické testy kontrolují rozložení stránky, spuštění skriptu a fotografie. Uživatel potvrdil, že se atlas dá dobře používat; zbývají zkoušky uvedené výše.

## Emulátor Androidu

- Na vývojovém Macu je virtuální zařízení `MapFlip_API_36` s Firefoxem a Tampermonkey. Používá ho i jiný projekt; nepoužívat `-wipe-data`.
- Spuštění: `emulator -avd MapFlip_API_36 -no-snapshot-save`. Připojená zařízení vypíše `adb devices -l`.
- Snímek obrazovky pořídit příkazem `adb shell screencap -p /sdcard/myko.png` a stáhnout přes `adb pull /sdcard/myko.png tmp/android-screen.png`. K ovládání slouží `adb shell input`; místo klepnutí určit podle aktuálního snímku.
- Pro zkoušku místní verze zkopírovat skript do `tmp/`, spustit `python3 -m http.server 8765 --bind 127.0.0.1 --directory tmp`, nastavit přesměrování portu přes `adb reverse tcp:8765 tcp:8765` a ve Firefoxu otevřít `http://127.0.0.1:8765/myko-responsive.user.js`. Po zkoušce zastavit server a zrušit přesměrování příkazem `adb reverse --remove tcp:8765`.
- Po aktualizaci skriptu znovu načíst otevřené stránky. Totéž udělat po změně hustoty pixelů; po zkoušce vrátit původní rozlišení, hustotu pixelů a nastavení otáčení obrazovky.
- Při ruční zkoušce zadat uživateli jeden konkrétní úkol a přestat zařízení ovládat přes ADB, dokud uživatel nepředá ovládání zpět. Zapisovat jen problémy důležité pro další vývoj.
