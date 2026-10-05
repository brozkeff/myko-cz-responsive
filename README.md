# Myko.cz na mobilu

Uživatelský skript pro pohodlné čtení [atlasu hub myko.cz](https://www.myko.cz/myko-atlas/) na telefonu, především ve Firefoxu na Androidu. Přizpůsobuje fotografie, text, hledání a navigaci obrazovkám do 1000 px. Ostatní části webu lze upravit volitelně.

Potřebuje internet; atlas neukládá pro použití bez signálu. Vydání, stav vývoje a výsledky zkoušek najdete v [CHANGELOG.md](CHANGELOG.md) a na [GitHubu](https://github.com/brozkeff/myko-cz-responsive/releases).

## Instalace a aktualizace

1. Do Firefoxu nainstalujte [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/).
2. Ve Firefoxu otevřete **[instalační odkaz](https://raw.githubusercontent.com/brozkeff/myko-cz-responsive/master/myko-responsive.user.js)**. Z aplikace ChatGPT zvolte otevření v externím prohlížeči.
3. Potvrďte instalaci nebo aktualizaci. Pokud se zobrazí pouze text, zkopírujte celý obsah do editoru skriptu v Tampermonkey a uložte jej.
4. Otevřete nebo obnovte [Myko atlas](https://www.myko.cz/myko-atlas/).

Instaluje se jediný soubor `myko-responsive.user.js`; CSS už je uvnitř. Při aktualizaci nahraďte předchozí skript, aby neběžely dvě kopie. Automatické aktualizace nejsou nastavené. Úpravy vypnete ve správci skriptů; při potížích zkontrolujte, že je skript zapnutý a nepoužíváte režim „Stránka pro počítač“.

## Volitelné zobrazení celého webu

V atlasu zůstávají při posouvání nahoře název stránky, **☰ Menu**, návrat do atlasu a **Hledat houbu**. Menu otevře původní navigaci ČMS, odkaz na hledání posune stránku k formuláři. Ovladače „+“ a „−“ v systematice mají větší dotykovou plochu. Původní nadpisy a obsah zůstávají zachované.

Atlas se přizpůsobuje vždy. Pro ostatní stránky zaškrtněte **Mobilní zobrazení celého webu**, nebo použijte přepínač v nabídce Tampermonkey. Volba je ve výchozím stavu vypnutá, ukládá se a změna obnoví stránku. Další otevřené karty obnovte ručně. Vypnutí vrátí ostatní stránky k původnímu zobrazení; atlas zůstane responzivní.

Skript má přístup ke všem cestám `myko.cz` a `www.myko.cz`. Oprávnění `GM_getValue`, `GM_setValue`, `GM_registerMenuCommand` a jejich protějšky `GM.*` slouží pro nastavení a položku nabídky; správce může požadovat jejich potvrzení. Bez těchto API atlas funguje dál a volba se ukládá v prohlížeči zvlášť pro každou adresu původu (např. `myko.cz` a `www.myko.cz`). Nabídka správce pak není dostupná. Skript neodesílá data dalším službám. Režim celého webu podporuje běžné původní rozložení; specializované stránky a velké tabulky mohou potřebovat další úpravy.

## Poděkování a licence

Děkujeme **České mykologické společnosti**, autorům atlasu a fotografům za [myko.cz](https://www.myko.cz/). Toto je nezávislý projekt úprav zobrazení.

Texty, fotografie, grafika a původní kód myko.cz zůstávají pod autorskými právy příslušných držitelů. Nejsou součástí distribuovaných skriptů a licence tohoto projektu se na ně nevztahuje. Původní údaje o autorství zachováváme.

Vlastní kód: **EUPL-1.2**, úplné znění v [LICENSE](LICENSE). Copyright © 2026 přispěvatelé projektu Myko.cz Responsive.

## Vývoj

CSS upravujte v `myko-responsive.css`; `node build.mjs` ho vloží do skriptu a `node build.mjs --check` ověří shodu. Instalace skriptu nevyžaduje Node.js ani jiné závislosti. Podklady z webu patří pouze do ignorované složky `tmp/`.

Browserový test vyžaduje Playwright jen při vývoji:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node check.cjs --chromium
```

S místními podklady lze přidat `--fixtures`; API správce skriptů jsou simulovaná. Pro Firefox vynechte `--chromium` a nainstalujte jeho testovací prohlížeč. Test nenahrazuje ruční zkoušky na telefonu.

Pravidla jsou v [AGENTS.md](AGENTS.md), plán a předání práce v [PLANS.md](PLANS.md). Chyby hlaste na [GitHubu](https://github.com/brozkeff/myko-cz-responsive/issues).

Pro skutečné zkoušky Android Firefoxu je na vývojovém Macu ověřený emulátor Android 16 s Tampermonkey. [Postup, výsledky a plán UX úprav](PLANS.md#android-16-vm-a-další-ux-práce--2026-10-05) zahrnují snímky přes ADB i ruční ovládání uživatelem. Emulátor nenahrazuje kontrolu na fyzickém telefonu.
