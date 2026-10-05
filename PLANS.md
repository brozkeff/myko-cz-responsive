# Plán a předání práce

## Cíl

Připravit jednoduchý uživatelský skript a CSS pro pohodlné používání atlasu hub myko.cz na telefonu v lese. Prioritou je Android Firefox. První verze je `0.0.1`, pod licencí EUPL 1.2.

## Hotovo

- [x] Inicializovat Git na větvi `master`.
- [x] Přidat licenci EUPL 1.2.
- [x] Stáhnout základní podklady pro místní prohlídku.
- [x] Přejmenovat složku podkladů z `tmpp/` na `tmp/` a ignorovat ji v Gitu.
- [x] Připravit README, AGENTS.md, changelog a předání práce.

## První verze

- [x] Implementovat `myko-responsive.user.js` s metadaty verze `0.0.1` a přesným omezením na atlas.
- [x] Implementovat CSS overrides a přidat copyright i SPDX do JS a CSS.
- [x] Přizpůsobit pevné sloupce a tabulky fotografií šířce telefonu.
- [x] Zpřístupnit vyhledávání a navigaci na každé stránce atlasu.
- [x] Přidat pohodlné odkazy na části popisu druhu.
- [x] Ověřit funkčnost i zobrazení a zapsat skutečně provedené kontroly.
- [x] Aktualizovat instalační návod podle hotového souboru a vydat `0.0.1` v changelogu.

## Zjištění pro navázání

Podklady jsou pouze místní a nejsou licencovány tímto projektem. V `tmp/` jsou `atlas.html`, `alphabet.html`, `search.html`, `genus.html`, `species.html` a `main.css`.

HTML používá kódování Windows-1250. Pro čtení českého textu lze použít `iconv -f WINDOWS-1250 -t UTF-8 tmp/species.html`.

Původní CSS má `#main` široký 1240 px a plovoucí sloupce `#leftcol`, `#centercol`, `#rightcol`. Obsah je v `#content`. Atlas používá `table.atlas`, případně `table.atlaslist`, a obaly fotografií `span.imgwrap` s pevnými inline rozměry. Fotografie se zvětšují přes odkazy s `data-lightbox`; zachovat jejich chování i údaje o autorství. Stejná třída tabulek slouží také systematice a literatuře, proto nepřevádět všechny tabulky bez rozlišení na fotogalerie.

Vyhledávání na úvodní stránce atlasu je skryté v `#search`, má pole `name="searchtext"` a odesílá GET. Detail druhu obsahuje nadpisy jako Popis, Výskyt a Možná záměna. Abecední přehled má dlouhou řadu odkazů na písmena.

Implementace používá běžné JS a CSS bez runtime závislostí. `node build.mjs` vkládá CSS do jediného instalačního souboru. Použití bez internetu není součástí implementace.

## Kontroly a další práce

Browserový test `check.cjs --fixtures --chromium` ověřuje šest místních rozložení (úvod atlasu, abecední a systematický seznam, rod, druh a výsledky hledání) při šířkách 320, 360, 412, 800 a 1280 px. Kontroluje přetečení stránky, odesílání hledání, menu, cíle odkazů na části stránky, proporce fotografií, lightbox, zachování původního textu a odkazů i omezení na atlas. Fotografie jsou nahrazené jedním místním vzorkem; nejde o kontrolu živého serveru.

- [ ] Ověřit instalaci a používání na skutečném Android Firefoxu s Tampermonkey.
- [ ] Ověřit další správce skriptů a prohlížeče.

Testovací Firefox na tomto Macu selhal při spuštění (chyba sandboxu/renderování a timeout); úspěšné kontroly jsou z Chromium. Snímky pro místní vizuální kontrolu jsou v ignorované složce `tmp/`.

## První zveřejnění

- [x] Zkontrolovat kód a shodu licence s EUPL 1.2; vyloučit podklady myko.cz z publikace.
- [x] Označit README jako experimentální ranou alfu a připravit přímý instalační odkaz na `v0.0.1`.
- [x] Vytvořit veřejný repozitář `brozkeff/myko-cz-responsive`, nastavit `origin` a odeslat `master`.
- [x] Zveřejnit tag a předběžné vydání `v0.0.1` pro ruční instalaci na telefonu.

Veřejný repozitář: https://github.com/brozkeff/myko-cz-responsive. Předběžné vydání: https://github.com/brozkeff/myko-cz-responsive/releases/tag/v0.0.1. Přímý instalační odkaz byl stažen a jeho obsah porovnán s lokálním skriptem; shoduje se. GitHub rozpoznává licenci EUPL-1.2. V repozitáři ani v přílohách vydání nejsou stažené podklady myko.cz.


## Verze 0.0.2

- [x] Zaznamenat uživatelskou zprávu: první testy 0.0.1 na Moto G85 ve Firefoxu fungují.
- [x] Přidat volitelné responzivní zobrazení celého webu, výchozí stav vypnuto.
- [x] Uložit přepínač ve správci skriptů a zpřístupnit jej i v jeho nabídce.
- [x] Rozšířit metadata a návod k oprávněním na celý web.
- [x] Ověřit regresi atlasu, přepínač a reprezentativní stránky mimo atlas.
- [x] Zveřejnit experimentální v0.0.2 na GitHubu.
- [ ] Ručně ověřit 0.0.2 na Moto G85 ve Firefoxu.

Verze 0.0.2: 55 kontrol rozložení v Chromium (11 místních stránek při pěti šířkách), oba původní prohlížeče fotografií, zachování textu a odkazů, výchozí vypnutý režim mimo atlas a uložení přepínače přes obnovení stránky. API správce skriptů test simuluje; skutečná oprávnění a nabídka Tampermonkey vyžadují ruční test.

Vydání: https://github.com/brozkeff/myko-cz-responsive/releases/tag/v0.0.2. Přímý instalační odkaz na tag `v0.0.2` byl stažen a obsah se shoduje s testovaným lokálním skriptem. Remote používá HTTPS; při publikaci bylo potřeba použít přihlašovací údaje `gh`, protože SSH autentizace selhala.


## Verze 0.0.3 – oprava startu atlasu

- [x] Zkrátit README a přesunout údaje o vydání do changelogu.
- [x] Reprodukovat výpadek 0.0.2 bez API správce a opravit start atlasu.
- [x] Podporovat původní i asynchronní API a ověřit selhání nastavení či nabídky.
- [x] Ověřit 55 rozložení a tři varianty startu v Chromium.
- [x] Zveřejnit experimentální v0.0.3.
- [x] Potvrdit opravu na telefonu uživatele: ruční test 0.0.3 obnovil funkční atlas ve Firefoxu. Správce skriptů zatím není známý.

## Verze 0.0.4 – fotografie v atlasu

- [x] Zvětšit fotografii v modalu na dostupnou šířku telefonu, zachovat proporce a přístupné zavření.
- [x] Ověřit portrét, krajinu a panorama při šířkách 320, 412 a 800 px a regresi ostatních stránek.
- [x] Zveřejnit experimentální v0.0.4.

Prioritou fotografií je plná šířka a svislé posouvání vysokých snímků. Oprava je v CSS a samostatná devítibodová kontrola v check.cjs (--modal-only). Původní prohlížeč zmenšuje portrét na 232 px při šířce obrazovky 320 px; nový test tuto chybu zachytí. Tagy již vydaných verzí zůstávají beze změny.

Hotfix 0.0.3 je zveřejněn: https://github.com/brozkeff/myko-cz-responsive/releases/tag/v0.0.3. Přímý instalační soubor se shoduje s ověřeným lokálním skriptem.

Verze 0.0.4 je zveřejněna: https://github.com/brozkeff/myko-cz-responsive/releases/tag/v0.0.4. Stažený instalační soubor se shoduje s lokálním skriptem. Ověřeno 55 rozložení, tři varianty startu a devět kombinací fotografií; navíc posouvání vysokých snímků a zavření po posunutí. Ruční potvrzení na Android Firefoxu zůstává otevřené.

## Android 16 VM a další UX práce — 2026-10-05

### Ověřené prostředí

- [x] Spustit existující AVD `MapFlip_API_36` v samostatném viditelném okně. Android 16 / API 36, ARM64, profil Pixel 7, 1080 × 2400 px, 420 dpi; emulátor 37.2.12.0.
- [x] Nainstalovat Firefox 157.0 z oficiálního ARM64 APK Mozilla. Verze potvrzena v O aplikaci Firefox.
- [x] Nainstalovat Tampermonkey 5.5.0. Uživatel dokončil instalaci ručně v okně emulátoru, během jeho ovládání byly příkazy ADB pozastavené.
- [x] Nainstalovat vydaný skript 0.0.4 přes instalační odkaz na tag a potvrzení Tampermonkey. Živý atlas skutečně používá úpravy skriptu.
- [x] Vypnout v nastavení Firefoxu překlady i nabídku překladu; další české stránky se otevřely bez dialogu.
- [x] Ověřit snímky obrazovky, hierarchii UI, klepnutí, tažení, zadávání textu a otáčení přes ADB. Po kontrole vrátit automatické otáčení a portrét.
- [x] Prohlédnout živý úvod atlasu, výsledky hledání `hrib`, abecední a systematický přehled, rod `Boletus` a druh `Boletus-edulis` v portrétu. Formulář skutečně odeslal hledání na server.
- [x] Prohlédnout rod a galerii druhu v krajině. U druhu otevřít fotografii, posunout ji a zavřít modal i po posunutí.

Snímky a exporty UI jsou pouze v ignorovaném `tmp/android-*`. Jde o skutečný Android Firefox s rozšířením a živým webem, ale o emulátor s myší a softwarovým vykreslováním, nikoli o měření výkonu či ergonomie fyzického Moto G85. Kompletní matice všech stránek a orientací, pinch zoom, česká klávesnice, TalkBack a desktopová regrese v této kontrole neproběhly. Zadávání přes ADB potřebovalo po zaostření krátkou prodlevu; objevila se také plovoucí lišta vstupní metody. Běžnou dotykovou klávesnici je třeba ověřit samostatně.

### Co ukázala kontrola

Uživatel hlásí modal s fotografií stejně velkou nebo menší než náhled. Na `Boletus-edulis` se skriptem 0.0.4 se to zatím nereprodukovalo: fotografie v portrétu využila téměř celou šířku a byla přibližně dvakrát širší než náhled. V krajině rovněž využila dostupnou šířku, šla posouvat a křížek zůstal dostupný. Kredit zůstal v portrétním modalu čitelný. Hlášení zůstává otevřené; potřebujeme konkrétní stránku, fotografii a verzi skriptu. Fotografie na úvodu a v přehledu rodu mohou vést na detail druhu, nejde vždy o otevření modalu.

Na přání uživatele byl ověřen také dočasný profil 2160 × 4800 px při 840 dpi: stejná přibližná šířka v CSS px jako výchozí profil, dvojnásobný počet fyzických pixelů v každé ose. Fotografie košíku měla zdroj 1280 × 960 px a v modalu vyplnila přibližně 2000 fyzických pixelů na šířku, tedy se upscalovala. Po změně hustoty za běhu nebyl na jednom snímku vidět křížek; při novém načtení stránky byl znovu viditelný. Změny hustoty za běhu proto zkoušet odděleně od běžného startu na HiDPI zařízení. Rozlišení, hustota i otáčení byly vráceny na původní hodnoty.

Požadavek pro další kontroly: fotografie mají vyplnit dostupnou šířku i nad původní rozlišení zdroje; mírná neostrost je přijatelná. `max-width: 100%` samo zvětšení nezaručuje, moderní modal používá `width: 100%`. Testovat zvlášť CSS šířku, hustotu pixelů, skutečný velký zdroj a starší prohlížeč fotografií. Bez změny hustoty pouhé zvýšení rozlišení nemusí odpovídat telefonu a může přepnout web do desktopového breakpointu.

Horní menu, hlavička, drobečková navigace, nastavení celého webu, hledání a odkazy na části stránky zabírají velkou část prvního zobrazení. Při posouvání zmizí název i navigace. Systematický přehled má drobné ovladače „+“; samotná velikost textu nezaručuje pohodlné rozbalování prstem.

### Pořadí dalšího vývoje

1. **Fotografie a návrat z modalu.** Nejdřív reprodukovat hlášený malý modal, rozlišit oba původní prohlížeče fotografií a ověřit, že se načítá velká fotografie. Teprve podle důkazu upravit CSS. Přijetí: modal využije šířku, zachová proporce a kredit, při dvousloupcové galerii je zřetelně větší než náhled; vysoký snímek lze posunout a zavřít. U jednosloupcové galerie ověřit přínos vyššího rozlišení a zoomu, nevyžadovat nemožnou šířku větší než displej.
2. **Kompaktní stálá navigace.** Menu, stručný název aktuální stránky a základní návrat do atlasu mají zůstat nahoře při posouvání. Hledání, nastavení a delší odkazy zpřístupnit rozbalením. Krátký kontextový údaj či úryvek musí vycházet z původního textu, bez změny identifikačních údajů. Preferovat `position: sticky` na vhodném existujícím obalu; pokud struktura webu vyžaduje malou lištu, zachovat původní H1 a jeho význam. Přijetí: název a menu jsou dostupné po dlouhém posunutí, odkazy na sekce neskončí pod lištou a otevřená klávesnice, modal ani krajina neztratí podstatnou část obsahu.
3. **Dotykové ovládání a hledání.** Zvětšit aktivní plochy rozbalování systematiky na alespoň 44 × 44 CSS px, ověřit písmena abecedy, stránkování a odkazy na druhy. Zkusit `hřib`, latinský název, prázdné hledání a méně než tři znaky; tlačítko Hledat i potvrzení klávesnicí. Zkontrolovat čitelné názvy výsledků, návrat Zpět a obnovení pozice.
4. **Regrese a vydání.** Ověřit šest typů stránek při úzkém portrétu a krajině, také s větším písmem, zoomem a pomalejší sítí. Vyzkoušet volbu celého webu, uložení po restartu Firefoxu a atlas při vypnuté volbě. Doplnit kontrolu na fyzickém Moto G85 a desktopu. Po opravách sjednotit metadata, vložené CSS a dokumentaci; nové funkce stálé navigace jsou ve verzi 0.1.0. Uživatel povolil po ověření smysluplných úprav zvýšit verzi, zapsat changelog a odeslat na GitHub.

- [ ] Reprodukovat uživatelův malý modal na konkrétní fotografii; ověřit další druhy a starší prohlížeč fotografií mimo atlas.
- [x] Implementovat kompaktní stálou navigaci s názvem stránky, původním menu a návratem k hledání; ověřit po posunutí. Další kontextové úryvky jsou otevřený námět.
- [x] Zvětšit a zpřístupnit ovladače systematiky; doplnit browserovou kontrolu.
- [ ] Zlepšit a ručně ověřit dotykové ovladače systematiky, hledání a návrat Zpět.
- [ ] Dokončit celou matici stránek a orientací, zoom, větší písmo, běžnou českou klávesnici a TalkBack.
- [x] Ověřit nový místní build skutečnou aktualizací v Tampermonkey přes místní server a ADB reverse.
- [x] Prohlédnout finální 0.1.0 na všech šesti typech atlasových stránek v portrétu i krajině; v krajině ověřit stálou lištu po posunutí. Ve skutečném Firefoxu rozbalit systematickou kategorii a v portrétu otevřít a zavřít fotografii košíku v plné šířce s kreditem.
- [ ] Ověřit fyzický telefon, desktopovou regresi a připravit příslušné vydání.

Finální automatická regrese 0.1.0: 55 kontrol rozložení, tři varianty startu a 12 kombinací fotografií v Chromium. Android kontrola rozložení všech šesti typů stránek v obou orientacích nenahrazuje úplnou interakční matici. Firefox při otevření stejné adresy přes intent může použít starou kartu bez obnovení; pro ověření aktualizace použít novou adresu nebo kartu výslovně obnovit. Po tažení počkat na dokončení setrvačného posunu, než se podle snímku klepne.

### Opakování kontroly a ruční spolupráce

Spouštět z kořene projektu. SDK nástroje jsou již v PATH. Před každou relací použít `adb devices -l`; následující sériové číslo platilo při této kontrole. ADB a spuštění okna potřebují v prostředí Codex přístup mimo sandbox.

```sh
emulator -list-avds
emulator -avd MapFlip_API_36 -no-snapshot-save
adb devices -l
adb -s emulator-5554 shell getprop sys.boot_completed
adb -s emulator-5554 shell am start -a android.intent.action.VIEW -d https://www.myko.cz/myko-atlas/ -p org.mozilla.firefox
adb -s emulator-5554 shell screencap -p /sdcard/myko-screen.png
adb -s emulator-5554 pull /sdcard/myko-screen.png tmp/android-screen.png
adb -s emulator-5554 shell uiautomator dump /sdcard/myko-ui.xml
adb -s emulator-5554 pull /sdcard/myko-ui.xml tmp/android-ui.xml
adb -s emulator-5554 shell input tap 260 830
adb -s emulator-5554 shell input swipe 540 650 540 1700 1100
adb -s emulator-5554 shell input text hrib
adb -s emulator-5554 shell wm user-rotation lock 1
adb -s emulator-5554 shell wm user-rotation lock 0
adb -s emulator-5554 shell wm user-rotation free
```

Souřadnice jsou jen příklady z této relace. Před klepnutím znovu zkontrolovat aktuální snímek a UI; rozměry mění otáčení, skrytí adresního řádku i klávesnice. `-no-snapshot-save` chrání spouštěcí snapshot, nevrací změny aplikací v uživatelských datech VM. Nepoužívat `-wipe-data`; jde o sdílený emulátor projektu MapFlip. Pro dlouhodobé testování připravit samostatný AVD až podle potřeby.

Ruční relace: agent otevře výchozí stránku, zadá jediný úkol a pozastaví veškerý vstup ADB. Uživatel ovládá skutečné okno emulátoru myší a klávesnicí, poté napíše „hotovo“ nebo popíše problém. Agent obnoví ovládání až po tomto předání, pořídí snímek a zaznamená cestu i výsledek. Příklad úkolu: „Najdi hřib smrkový, otevři fotografii, najdi možnou záměnu a vrať se do výsledků.“ Zapisovat chybné odbočky a obtížně nalezitelné ovladače; rychlost ADB není měřením použitelnosti pro člověka.

Pro další build nejprve `node build.mjs` a stávající browserové kontroly. Ověřený místní instalační postup: `cp myko-responsive.user.js tmp/myko-responsive.user.js`, spustit `python3 -m http.server 8765 --bind 127.0.0.1 --directory tmp`, připojit `adb -s emulator-5554 reverse tcp:8765 tcp:8765` a ve Firefoxu VM otevřít `http://127.0.0.1:8765/myko-responsive.user.js`. Tampermonkey nabídl aktualizaci 0.0.4 → 0.1.0. Po kontrole zastavit server a odebrat reverse pravidlo. Publikaci na GitHub k testování nepotřebujeme.

Zdroje: [Mozilla — instalace rozšíření v Android Firefoxu](https://support.mozilla.org/en-US/kb/find-and-install-add-ons-firefox-android), [oficiální ARM64 APK Firefox 157.0](https://ftp.mozilla.org/pub/fenix/releases/157.0/android/fenix-157.0-android-arm64-v8a/), [Android — snímky emulátoru](https://developer.android.com/studio/run/emulator-take-screenshots), [Mozilla — ladění na Androidu](https://extensionworkshop.com/documentation/develop/developing-extensions-for-firefox-for-android/).
