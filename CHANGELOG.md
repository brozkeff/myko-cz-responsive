# Historie změn

Podle [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/) a [SemVer](https://semver.org/lang/cs/). Plán dalších úprav a poznámky ke zkouškám jsou v [PLANS.md](PLANS.md).

## [Unreleased]

## [0.1.0] - 2026-10-05

### Přidáno

- Stálá horní lišta atlasu s názvem stránky, nabídkou webu ČMS, návratem do atlasu a hledáním.
- Větší plochy pro klepnutí a popisky pro čtečky obrazovky u ovladačů systematiky „+“ a „−“.
- Návod ke zkouškám v emulátoru Androidu a k předání ovládání uživateli.

### Opraveno

- Test v prohlížeči používá správnou podkladovou stránku pro každou šířku obrazovky.

## [0.0.4] - 2026-10-03

### Opraveno

- Zvětšené fotografie vyplňují dostupnou šířku telefonu a zachovávají poměr stran; vysoké snímky lze posouvat.
- Zavírací tlačítko fotografií zůstává dostupné i po posunutí a má větší plochu pro klepnutí.

## [0.0.3] - 2026-10-03

### Opraveno

- Atlas funguje i při chybějícím či selhávajícím API správce skriptů.
- Podpora asynchronního API `GM.*` a náhradní ukládání nastavení v prohlížeči.
- Úvod atlasu se rozpozná i bez lomítka na konci adresy.

## [0.0.2] - 2026-10-03

### Přidáno

- Volitelné mobilní zobrazení celého webu. Přepínač je na stránce i v Tampermonkey a jeho nastavení se ukládá; atlas se přizpůsobuje vždy.

### Změněno

- Skript lze použít na všech stránkách `myko.cz` a `www.myko.cz`.
- Přizpůsobení popisků fotografií, formulářů, stránkování a staršího prohlížeče fotografií mimo atlas.

## [0.0.1] - 2026-10-03

### Přidáno

- Samostatný uživatelský skript s vloženým CSS, který přizpůsobuje atlas obrazovkám do šířky 1000 px.
- Hledání na každé stránce atlasu, odkazy na části popisu, rozbalovací menu a textové vysvětlení ikon označujících jedlost hub.
- Nástroj pro vložení CSS, testy v prohlížeči a česká dokumentace; vlastní kód pod licencí EUPL-1.2.

### Opraveno

- Správné zobrazení hledaných českých názvů při kódování webu Windows-1250.
