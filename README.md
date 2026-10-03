# Myko.cz na mobilu

Úpravy zobrazení [atlasu hub na myko.cz](https://www.myko.cz/myko-atlas/) pro malé obrazovky, především Firefox na Androidu. Cílem je pohodlně číst popisy, prohlížet fotografie a hledat houby přímo v lese.

Verze **0.0.1** obsahuje samostatný uživatelský skript [myko-responsive.user.js](myko-responsive.user.js). Úpravy se zapínají při šířce okna do 1000 px; na širším displeji zůstává původní rozložení.

**Experimentální raná alfa:** jde o první verzi určenou k ručnímu testování. Může obsahovat chyby a změny původního webu mohou úpravy rozbít. Android Firefox se správci skriptů zatím čeká na ověření na skutečném telefonu.

Zdrojový kód a hlášení chyb: [GitHub](https://github.com/brozkeff/myko-cz-responsive). Balíčky prvního vydání: [v0.0.1](https://github.com/brozkeff/myko-cz-responsive/releases/tag/v0.0.1).

## Co skript umí

- Přizpůsobit atlas šířce telefonu bez nutnosti posouvat celou stránku do stran.
- Zpřístupnit vyhledávání, seznamy druhů a navigaci po atlasu.
- Zobrazovat fotografie v rozložení vhodném pro mobil a zachovat jejich zvětšování.
- Usnadnit čtení popisu, výskytu a možných záměn pomocí odkazů na jednotlivé části.
- Zobrazit slovní význam ikony jedlosti a zpřístupnit menu webu tlačítkem.

Skript běží pouze na cestách `/myko-atlas/` na `myko.cz` a `www.myko.cz`. Upravuje zobrazení původního webu a nevytváří vlastní databázi hub. **Potřebuje připojení k internetu; používání bez signálu není řešené.** Před vycházkou si můžete otevřít potřebné druhy do záložek, ale prohlížeč nemusí načtené stránky uchovat. Skript nic nestahuje na pozadí ani neposílá data dalším službám; vyhledávání odesílá přímo na myko.cz.

## Instalace

Instaluje se pouze soubor `myko-responsive.user.js`. CSS už je uvnitř; samostatný soubor CSS není potřeba instalovat.

**[Nainstalovat experimentální verzi 0.0.1](https://raw.githubusercontent.com/brozkeff/myko-cz-responsive/v0.0.1/myko-responsive.user.js)** – otevřete tento odkaz ve Firefoxu na Androidu s nainstalovaným Tampermonkey. Pokud odkaz otevíráte z aplikace ChatGPT, zvolte otevření v externím prohlížeči. Tampermonkey může nabídnout instalaci; pokud zobrazí pouze text, použijte ruční postup níže.

1. Do Firefoxu na Androidu nainstalujte [Tampermonkey z katalogu Mozilla](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/), který uvádí podporu Firefoxu pro Android.
2. Otevřete správu skriptů Tampermonkey a vytvořte nový skript.
3. Otevřete [myko-responsive.user.js](myko-responsive.user.js), zobrazte jeho prostý obsah (na GitHubu tlačítkem **Raw**) a zkopírujte jej celý do editoru místo výchozí šablony. Uložte skript a ověřte, že je zapnutý. Při otevření přímého odkazu na soubor může správce nabídnout instalaci rovnou.
4. Otevřete nebo obnovte [Myko atlas](https://www.myko.cz/myko-atlas/).

Na počítači je postup obdobný s Tampermonkey nebo kompatibilním správcem uživatelských skriptů. Kompatibilitu s dalšími správci a prohlížeči bude potřeba ověřit. Pokud chcete úpravy vypnout, zakažte skript ve správci a obnovte stránku.

Při aktualizaci nahraďte obsah stejného skriptu novou verzí a uložte jej. Automatické aktualizace zatím nejsou nastavené. Když se úpravy nezobrazí, zkontrolujte, že jste v atlasu, skript je zapnutý a prohlížeč nepoužívá režim „Stránka pro počítač“.

## Poděkování a autorská práva

Děkujeme **České mykologické společnosti**, autorům atlasu a fotografům za [myko.cz](https://www.myko.cz/) a jeho atlas hub. Jde o nezávislý projekt úprav zobrazení, nikoli o oficiální projekt ČMS.

Obsah myko.cz, včetně textů, fotografií, grafiky a původního kódu, zůstává chráněn autorskými právy jeho příslušných držitelů. Licence tohoto repozitáře se na něj nevztahuje. Zachováváme původní údaje o autorství; stažené podklady slouží jen k místnímu zkoumání ve složce `tmp/` a nejsou součástí distribuovaných skriptů.

Vlastní skripty a CSS tohoto projektu jsou vydány pod licencí **European Union Public Licence 1.2 (EUPL-1.2)**. Úplné znění je v souboru [LICENSE](LICENSE). Copyright © 2026 přispěvatelé projektu Myko.cz Responsive.

## Ověření

Rozložení bylo ověřeno v Chromium nad místními kopiemi šesti stránek atlasu při šířkách 320, 360, 412, 800 a 1280 px. Test kontroluje také hledání, menu, fotografie a zachování původních textů a odkazů. Android Firefox ani instalace přes Tampermonkey zatím nebyly ověřeny na skutečném zařízení; testovací Firefox se na tomto Macu nepodařilo spustit.

## Vývoj

Postup a předání rozpracované práce jsou v [PLANS.md](PLANS.md), pravidla pro práci v repozitáři v [AGENTS.md](AGENTS.md) a historie změn v [CHANGELOG.md](CHANGELOG.md).

Používáme verzování SemVer. Začínáme verzí `0.0.1`; závislosti a sestavovací nástroje přidáváme jen tehdy, když jsou potřeba. Podklady stažené z webu ukládejte výhradně do ignorované složky `tmp/`.

CSS upravujte v `myko-responsive.css`. Příkaz `node build.mjs` ho vloží do uživatelského skriptu; `node build.mjs --check` ověří shodu. Při instalaci nejsou potřeba Node.js ani jiné závislosti.

Malý browserový test používá Playwright pouze při vývoji:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install firefox
node check.cjs
# Alternativně: npx playwright install chromium && node check.cjs --chromium
```

Příkaz `node check.cjs --fixtures` (nebo s přepínačem `--chromium`) navíc ověří místní podklady z `tmp/`; tato složka se nedistribuuje. Test nahrazuje fotografie jedním vzorkem a používá místní kopie CSS a knihovny lightbox. Neověřuje síťové služby ani instalaci přes správce skriptů.
