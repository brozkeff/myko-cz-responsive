# Historie změn

Změny zapisujeme podle [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/). Verze používají [SemVer](https://semver.org/lang/cs/).

## [Unreleased]

## [0.1.0] - 2026-10-05

Experimentální raná alfa s novou stálou navigací atlasu.

### Přidáno

- Kompaktní horní lišta s názvem stránky, menu ČMS, návratem do atlasu a odkazem na hledání, dostupná i při posouvání. Původní H1 zůstává dostupný čtečkám obrazovky.
- Viditelné dotykové plochy alespoň 44 × 44 CSS px a přístupné názvy pro ovladače systematiky „+“ a „−“.

### Opraveno

- Browserový test načítá správný podklad pro každou šířku; po kontrole hledání se už další šířky nepřepnou na úvod atlasu.

### Ověření

- Kontroly stálé lišty po posunutí, dostupnosti hledání a dotykové plochy systematiky. Přidané kontroly fotografií 120 × 90 px ověřují zvětšení na dostupnou šířku i nad původní rozměry.
- Prošlo 55 kontrol rozložení při pěti šířkách včetně desktopové, tři varianty startu a 12 kombinací fotografií v Chromium nad místními podklady.
- Android 16 VM, Firefox 157.0 a Tampermonkey 5.5.0: skutečná instalace a aktualizace skriptu, stálá lišta při posouvání, nabídka původního menu a návrat k hledání. Výsledky a rozsah dalších kontrol jsou v PLANS.md.
- Ověřené upscaling chování 0.0.4 na dočasném displeji 2160 × 4800 px / 840 dpi: fotografie 1280 × 960 px využila téměř celou fyzickou šířku obrazovky. Nejde o kontrolu na fyzickém 4K telefonu.

### Omezení

- Uživatelovo hlášení malého modalu zatím nemá potvrzenou reprodukci na konkrétní stránce. Pinch zoom, TalkBack a fyzický telefon zůstávají k ručnímu ověření.

### Dokumentace

- Ověřený postup spuštění existujícího Android 16 VM, snímků a ovládání přes ADB, skutečná instalace Firefoxu, Tampermonkey a skriptu 0.0.4; pravidla předání ovládání uživateli.
- Plán dalších UX úprav: hlášený malý modal, stálá kompaktní navigace s názvem stránky, dotykové ovladače a hledání. Kontrola modalu na `Boletus-edulis` prošla v emulátoru v portrétu i krajině; hlášení z jiné situace zůstává otevřené.

## [0.0.4] - 2026-10-03

Experimentální raná alfa, navazuje na opravu startu v 0.0.3.

### Opraveno

- Zvětšené fotografie v atlasu využívají dostupnou šířku mobilní obrazovky s malým okrajem. Vysoké snímky lze posouvat svisle místo zmenšování podle výšky displeje; poměr stran zůstává zachovaný.
- Zavírací tlačítko má na mobilu 44 × 44 px, zůstává na obrazovce a znak zavření nevyžaduje stažení obrázku. Ovládání původního prohlížeče fotografií je zachované; desktopové rozložení se nemění.

### Ověření

- Devět kontrol modalu: portrét, krajina a panorama při rozměrech obrazovky 320 × 800, 412 × 915 a 800 × 360 px.
- 55 kontrol rozložení a tři kontroly startu v Chromium nad místními podklady se simulovaným API správce skriptů.
- Android Firefox a skutečná instalace čekají na ruční potvrzení.

## [0.0.3] - 2026-10-03

Experimentální opravné vydání. Uživatel hlásí, že 0.0.2 na telefonu přestala upravovat atlas; přesná příčina v jeho správci skriptů zatím není potvrzená.

### Opraveno

- Chybějící nebo selhávající API nastavení či nabídky správce už nezastaví úpravu atlasu. V 0.0.2 šlo tento výpadek reprodukovat chybou `GM_getValue is not defined` ještě před vložením CSS.
- Podpora asynchronního rozhraní `GM.*` vedle původního `GM_*`. Bez API správce se volba ukládá do místního úložiště daného původu webu.
- Rozpoznání úvodu atlasu i bez koncového lomítka.

### Ověření

- 55 kontrol rozložení v Chromium a tři nové kontroly startu: chybějící API, selhávající API a asynchronní `GM.*`.
- Stejný test s původním skriptem 0.0.2 reprodukuje chybu startu.
- Uživatel potvrdil ruční zkoušku 0.0.3: atlas ve Firefoxu na telefonu opět funguje. Konkrétní správce skriptů zatím není známý.
- Úprava velikosti zvětšených fotografií je plánovaná pro 0.0.4.

## [0.0.2] - 2026-10-03

Experimentální raná alfa. Uživatel hlásí úspěšné první zkoušky verze 0.0.1 na Moto G85 ve Firefoxu.

### Přidáno

- Volitelné mobilní zobrazení celého webu, ve výchozím stavu vypnuté; atlas zůstává responzivní.
- Přepínač na upravených stránkách a v nabídce Tampermonkey, s uložením volby a obnovením stránky.
- Rozšířený rozsah na všechny cesty `myko.cz` a `www.myko.cz`, oprávnění pro nastavení a položku nabídky.
- Úpravy popisků fotografií, formulářů, stránkování a staršího prohlížeče fotografií používaného mimo atlas.

### Ověření

- 55 kontrol v Chromium: šest stránek atlasu a pět dalších stránek při šířkách 320, 360, 412, 800 a 1280 px.
- Oba původní prohlížeče fotografií, české hledání, zachování textů a odkazů, uložení přepínače a návrat k původnímu zobrazení. API správce skriptů byla simulovaná.
- Přímý instalační odkaz ověřen porovnáním s testovaným skriptem.

### Omezení

- Režim celého webu je určen pro běžné původní rozložení. Specializované stránky a velké tabulky nejsou plošně ověřené.
- Nový režim ve verzi 0.0.2 čeká na ruční zkoušku na telefonu.

## [0.0.1] - 2026-10-03

První experimentální vydání, raná alfa pro ruční testování.

### Přidáno

- Základ repozitáře na větvi `master`, licence EUPL 1.2 a pravidla pro vývoj.
- Český popis projektu, plán instalace a poděkování České mykologické společnosti.
- Samostatný uživatelský skript s vloženým CSS pro mobilní atlas hub.
- Přizpůsobení sloupců, fotografií a tabulek při šířce do 1000 px.
- Vyhledávání na každé stránce atlasu, odkazy na části popisu a rozbalovací menu webu.
- Slovní význam ikon jedlosti pro ovládání dotykem.
- Vývojový příkaz pro vložení CSS a browserový test.
- Ignorovaná složka `tmp/` pro místní podklady z myko.cz.

### Opraveno

- Zachování českého hledaného názvu při původním kódování webu Windows-1250.

### Omezení

- Vyžaduje připojení k internetu; neukládá atlas pro použití bez signálu.
- Kontroly proběhly v Chromium nad místními podklady. Android Firefox a instalace přes správce skriptů čekají na ověření; testovací Firefox se na tomto Macu nepodařilo spustit.
