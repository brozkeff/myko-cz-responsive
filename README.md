# Myko.cz na mobilu

Uživatelský skript pro pohodlné čtení [atlasu hub myko.cz](https://www.myko.cz/myko-atlas/) na telefonu, především ve Firefoxu na Androidu. Přizpůsobuje fotografie, text a hledání; název stránky a menu zůstávají viditelné i při posouvání. Vyžaduje internet.

## Instalace a aktualizace

1. Do Firefoxu nainstalujte [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/).
2. Ve Firefoxu otevřete **[instalační odkaz](https://raw.githubusercontent.com/brozkeff/myko-cz-responsive/master/myko-responsive.user.js)** a potvrďte instalaci či aktualizaci. Pokud vidíte jen text, vložte ho do editoru skriptu v Tampermonkey a uložte.
3. Otevřete [Myko atlas](https://www.myko.cz/myko-atlas/). Pokud už ho máte otevřený, načtěte stránku znovu. Totéž udělejte v ostatních kartách s myko.cz.

CSS je součástí skriptu. Při aktualizaci nahraďte předchozí kopii; skript se sám neaktualizuje. Vypnete ho v Tampermonkey. Pokud nefunguje, zkontrolujte, že je zapnutý a že je ve Firefoxu vypnutá volba „Stránka pro počítač“.

## Používání

- **☰ Menu** otevře nabídku webu ČMS, **Hledat houbu** posune stránku k formuláři. Fotografie lze otevřít klepnutím.
- Atlas se obrazovce telefonu přizpůsobuje vždy. Pro ostatní stránky zapněte **Mobilní zobrazení celého webu** na stránce nebo v nabídce Tampermonkey. Nastavení se ukládá; po změně se stránka znovu načte.
- Skript běží pouze na `myko.cz` a `www.myko.cz`. Oprávnění v Tampermonkey umožňují ukládat nastavení a přidat přepínač do nabídky. Atlas funguje i bez nich. Skript neposílá data dalším službám.

## Vývoj

CSS upravujte v `myko-responsive.css`. Příkaz `node build.mjs` ho vloží do skriptu; `node build.mjs --check` ověří, že vložené CSS odpovídá zdrojovému souboru. Stažené podklady z webu ukládejte pouze do složky `tmp/`, kterou Git nesleduje.

Testy v prohlížeči vyžadují Playwright:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node check.cjs --chromium
```

Pro testy nad místními podklady přidejte `--fixtures`. Testy simulují rozhraní správce skriptů (API). Chcete-li testovat ve Firefoxu, nainstalujte ho příkazem `npx playwright install firefox` a vynechte `--chromium`.

[PLANS.md](PLANS.md) obsahuje plán další práce a návod k použití emulátoru Androidu, [CHANGELOG.md](CHANGELOG.md) historii změn a [AGENTS.md](AGENTS.md) pravidla vývoje. Chyby hlaste na [GitHubu](https://github.com/brozkeff/myko-cz-responsive/issues).

## Poděkování a licence

Děkujeme České mykologické společnosti a autorům [myko.cz](https://www.myko.cz/). Skript vznikl nezávisle na ČMS a zachovává původní obsah i jména autorů. Texty, fotografie a původní kód webu nejsou součástí skriptu a jeho licence se na ně nevztahuje.

Vlastní kód: [EUPL-1.2](LICENSE). Copyright © 2026 brozkeff.

Kód vznikl s pomocí modelu GPT 6.1 Sol. [Zdrojový repozitář na GitHubu](https://github.com/brozkeff/myko-cz-responsive).
