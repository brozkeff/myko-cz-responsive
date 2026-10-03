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
- [ ] Zveřejnit experimentální v0.0.3.
- [ ] Potvrdit opravu na telefonu uživatele; správce skriptů zatím není známý.

## Verze 0.0.4 – fotografie v atlasu

- [ ] Zvětšit fotografii v modalu na dostupnou šířku telefonu, zachovat proporce a přístupné zavření.
- [ ] Ověřit portrét, krajinu a panorama při šířkách 320, 412 a 800 px a regresi ostatních stránek.
- [ ] Zveřejnit experimentální v0.0.4.

Prioritou fotografií je plná šířka a svislé posouvání vysokých snímků. Rozpracované CSS a testy jsou dočasně uložené v ignorované složce tmp/. Tagy již vydaných verzí zůstávají beze změny.
