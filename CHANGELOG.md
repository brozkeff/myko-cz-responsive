# Historie změn

Změny zapisujeme podle [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/). Verze používají [SemVer](https://semver.org/lang/cs/).

## [Unreleased]

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
