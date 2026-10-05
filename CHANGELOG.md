# Historie změn

Podle [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/) a [SemVer](https://semver.org/lang/cs/). Podrobnosti zkoušek a další práce jsou v [PLANS.md](PLANS.md).

## [Unreleased]

## [0.1.0] - 2026-10-05

### Přidáno

- Stálá horní lišta atlasu s názvem stránky, menu ČMS, návratem do atlasu a hledáním.
- Větší dotykové plochy a přístupné názvy ovladačů systematiky „+“ a „−“.
- Postup testování v Android emulátoru a předávání ovládání uživateli.

### Opraveno

- Browserový test používá správný podklad pro každou šířku obrazovky.

## [0.0.4] - 2026-10-03

### Opraveno

- Zvětšené fotografie vyplňují dostupnou šířku telefonu a zachovávají poměr stran; vysoké snímky lze posouvat.
- Zavírací tlačítko fotografií zůstává dostupné i po posunutí a má větší dotykovou plochu.

## [0.0.3] - 2026-10-03

### Opraveno

- Atlas funguje i při chybějícím či selhávajícím API správce skriptů.
- Podpora asynchronního API `GM.*` a náhradní ukládání nastavení v prohlížeči.
- Rozpoznání úvodu atlasu bez koncového lomítka.

## [0.0.2] - 2026-10-03

### Přidáno

- Volitelné mobilní zobrazení celého webu s uloženým přepínačem na stránce a v Tampermonkey; atlas se přizpůsobuje vždy.

### Změněno

- Rozsah skriptu rozšířen na všechny cesty `myko.cz` a `www.myko.cz`.
- Přizpůsobení popisků fotografií, formulářů, stránkování a staršího prohlížeče fotografií mimo atlas.

## [0.0.1] - 2026-10-03

### Přidáno

- Samostatný uživatelský skript s vloženým CSS pro mobilní atlas hub při šířce do 1000 px.
- Hledání na každé stránce atlasu, odkazy na části popisu, rozbalovací menu a slovní význam ikon jedlosti.
- Nástroj pro vložení CSS, browserové kontroly a česká dokumentace; vlastní kód pod licencí EUPL-1.2.

### Opraveno

- Zachování českého hledaného názvu při kódování webu Windows-1250.
