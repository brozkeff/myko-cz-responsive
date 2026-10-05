# Myko.cz na mobilu

Uživatelský skript pro pohodlné čtení [atlasu hub myko.cz](https://www.myko.cz/myko-atlas/) na telefonu, především ve Firefoxu na Androidu. Přizpůsobuje fotografie, text a hledání; název stránky a menu zůstávají dostupné při posouvání. Vyžaduje internet.

## Instalace a aktualizace

1. Do Firefoxu nainstalujte [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/).
2. Ve Firefoxu otevřete **[instalační odkaz](https://raw.githubusercontent.com/brozkeff/myko-cz-responsive/master/myko-responsive.user.js)** a potvrďte instalaci či aktualizaci. Pokud vidíte jen text, vložte ho do editoru skriptu v Tampermonkey a uložte.
3. Otevřete nebo obnovte [Myko atlas](https://www.myko.cz/myko-atlas/). Obnovte i ostatní otevřené karty.

CSS je součástí skriptu. Při aktualizaci nahraďte předchozí kopii; automatické aktualizace nejsou nastavené. Skript vypnete ve správci. Při potížích zkontrolujte, že je zapnutý a Firefox nepoužívá „Stránka pro počítač“.

## Používání

- **☰ Menu** otevře navigaci ČMS, **Hledat houbu** posune stránku k formuláři. Fotografie lze otevřít klepnutím.
- Atlas se přizpůsobuje vždy. Pro ostatní stránky zapněte **Mobilní zobrazení celého webu** na stránce nebo v nabídce Tampermonkey. Volba se ukládá a změna obnoví stránku.
- Skript běží pouze na `myko.cz` a `www.myko.cz`. Oprávnění správce slouží k uložení nastavení a nabídce; bez nich atlas funguje dál. Data se neposílají dalším službám.

## Vývoj

CSS upravujte v `myko-responsive.css`; `node build.mjs` ho vloží do skriptu a `node build.mjs --check` ověří shodu. Podklady z webu patří pouze do ignorované složky `tmp/`.

Browserové kontroly vyžadují Playwright:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node check.cjs --chromium
```

S místními podklady přidejte `--fixtures`; testy simulují API správce. Pro testovací Firefox nainstalujte jeho prohlížeč a vynechte `--chromium`.

[PLANS.md](PLANS.md) obsahuje další práci a postup pro Android emulátor, [CHANGELOG.md](CHANGELOG.md) historii změn a [AGENTS.md](AGENTS.md) pravidla vývoje. Chyby hlaste na [GitHubu](https://github.com/brozkeff/myko-cz-responsive/issues).

## Poděkování a licence

Děkujeme České mykologické společnosti a autorům [myko.cz](https://www.myko.cz/). Tento nezávislý skript zachovává původní obsah i autorství. Texty, fotografie a původní kód webu nejsou součástí distribuce a naše licence se na ně nevztahuje.

Vlastní kód: [EUPL-1.2](LICENSE). Copyright © 2026 přispěvatelé projektu Myko.cz Responsive.
