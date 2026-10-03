// Copyright (c) 2026 Myko.cz Responsive contributors
// SPDX-License-Identifier: EUPL-1.2
// Development-only browser check; no website assets are distributed.
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { firefox, chromium } = require('playwright');
const script = readFileSync('myko-responsive.user.js', 'utf8');
const fixtures = process.argv.includes('--fixtures');
const pages = fixtures ? [
  ['atlas', '/myko-atlas/'], ['alphabet', '/myko-atlas/abecedni-atlas/'],
  ['systematic', '/myko-atlas/systematicky-atlas/'], ['genus', '/myko-atlas/Boletus/'],
  ['species', '/myko-atlas/Boletus-edulis/'], ['search', '/myko-atlas/?searchtext=hrib'],
] : [['synthetic', '/myko-atlas/example/']];
const synthetic = `<html><head><style>#main{width:1240px}#centercol{width:760px}#content{font-size:12px}</style></head>
  <body class="myko"><div id="main"><div id="leftcol"><div id="menu"><a href="/">Domů</a></div></div>
  <div id="centercol"><div id="content"><h3>Popis</h3><p>Ukázkový popis.</p>
  <table class="atlas"><tr><td width="550">Systematika</td></tr></table>
  <table class="atlas"><tr><td><a href="/photo.jpg" data-lightbox="test"><span class="imgwrap" style="width:173px;height:135px"><img width="154" height="117" src="/thumb.jpg"></span></a></td><td>&nbsp;</td></tr></table>
  <img class="icon" src="/mykoatlas/edible.gif" title="Doporučená jedlá houba">
  </div></div></div></body></html>`;

(async () => {
  const engine = process.argv.includes('--chromium') ? chromium : firefox;
  const browser = await engine.launch({ timeout: 30000 });
  try {
    const page = await browser.newPage();
    // Mock only the manager APIs; settings persistence is exercised across reloads.
    await page.addInitScript(() => {
      window.GM_getValue = (key, fallback) => JSON.parse(localStorage.getItem(`test:${key}`) ?? JSON.stringify(fallback));
      window.GM_setValue = (key, value) => localStorage.setItem(`test:${key}`, JSON.stringify(value));
      window.GM_registerMenuCommand = (name, callback) => { window.testMenu = { name, callback }; };
    });
    let html = synthetic;
    let photoDimensions = null;
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (route.request().isNavigationRequest()) {
        let body = html;
        if (fixtures && url.search) {
          // Mimic the server echoing a Czech search in its original page encoding.
          // Numeric entities keep the mocked query portable while preserving fixture bytes.
          const original = html.toString('latin1');
          body = Buffer.from(original.replace(/(name="searchtext"[^>]*value=")[^"]*/, '$1h&#345;ib'), 'latin1');
        }
        return route.fulfill({ contentType: `text/html; charset=${fixtures ? 'windows-1250' : 'utf-8'}`, body });
      }
      const assets = fixtures ? {
        '/css/main.css': ['main.css', 'text/css'],
        '/js/jquery-1.7.1.js': ['jquery.js', 'text/javascript'],
        '/lightbox2/dist/js/lightbox.min.js': ['lightbox.js', 'text/javascript'],
        '/lightbox2/dist/css/lightbox.min.css': ['lightbox.css', 'text/css'],
        '/tools/packunpack.js': ['packunpack.js', 'text/javascript'],
        ...Object.fromEntries(['lightbox.css', 'prototype.js', 'scriptaculous.js', 'effects.js', 'builder.js', 'lightbox.js']
          .map(file => [`/lightbox/${file}`, [`legacy-${file}`, file.endsWith('.css') ? 'text/css' : 'text/javascript']])),
      } : {};
      const asset = assets[url.pathname];
      if (asset) return route.fulfill({ contentType: asset[1], body: readFileSync(`tmp/${asset[0]}`) });
      if (fixtures && photoDimensions && /\.jpg$/i.test(url.pathname) && !url.pathname.endsWith('s.jpg')) {
        const [width, height] = photoDimensions;
        return route.fulfill({ contentType: 'image/svg+xml', body: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#48794b"/></svg>` });
      }
      if (fixtures && /\.jpg$/i.test(url.pathname)) return route.fulfill({ contentType: 'image/jpeg', body: readFileSync(url.pathname.endsWith('s.jpg') ? 'tmp/thumbnail.jpg' : 'tmp/photo.jpg') });
      if (!fixtures && url.pathname.endsWith('.jpg')) return route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="154" height="117"><rect width="154" height="117" fill="green"/></svg>' });
      return route.abort();
    });
    // Startup must survive missing, rejected and asynchronous manager APIs.
    html = fixtures ? readFileSync('tmp/atlas.html') : synthetic;
    await page.setViewportSize({ width: 412, height: 915 });
    for (const mode of ['missing', 'rejecting', 'modern']) {
      await page.goto('https://www.myko.cz/myko-atlas');
      await page.evaluate(mode => {
        delete window.GM_getValue;
        delete window.GM_setValue;
        delete window.GM_registerMenuCommand;
        if (mode === 'rejecting') {
          window.GM_getValue = async () => { throw new Error('Storage unavailable'); };
          window.GM_registerMenuCommand = () => { throw new Error('Menu unavailable'); };
        }
        if (mode === 'modern') window.GM = {
          getValue: async () => false,
          setValue: async () => {},
          registerMenuCommand: async () => {},
        };
      }, mode);
      await page.evaluate(script);
      assert.equal(await page.locator('#myko-responsive-style').count(), 1, `Atlas startup: ${mode}`);
      assert.equal(await page.locator('#myko-mobile-search').count(), 1, `Atlas search: ${mode}`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Atlas overflow: ${mode}`);
      console.log(`atlas startup ${mode}: OK`);
    }
    if (fixtures) {
      html = readFileSync('tmp/species.html');
      for (const [orientation, dimensions] of [['portrait', [400, 1200]], ['landscape', [1200, 800]], ['panorama', [1200, 300]]]) {
        photoDimensions = dimensions;
        for (const [width, height] of [[320, 800], [412, 915], [800, 360]]) {
          await page.setViewportSize({ width, height });
          await page.goto('https://www.myko.cz/myko-atlas/Boletus-edulis/');
          await page.evaluate(script);
          await page.locator('#content a[data-lightbox]').first().click();
          await page.locator('.lb-image').waitFor({ state: 'visible' });
          await page.waitForFunction(() => document.querySelector('.lb-image').naturalWidth > 0);
          const image = await page.locator('.lb-image').boundingBox();
          assert.ok(image.width >= width - 24, `${orientation}: modal only ${image.width}px wide at ${width}px`);
          assert.ok(image.x >= 0 && image.x + image.width <= width + 1, 'Modal image outside viewport');
          assert.ok(await page.locator('.lb-image').evaluate(img => Math.abs(img.clientWidth / img.clientHeight - img.naturalWidth / img.naturalHeight) < 0.03), 'Modal image distorted');
          await page.locator('.lb-close').waitFor({ state: 'visible' });
          await page.waitForFunction(() => ['.lightbox', '.lb-outerContainer', '.lb-dataContainer'].every(selector =>
            getComputedStyle(document.querySelector(selector)).opacity === '1'));
          const close = await page.locator('.lb-close').boundingBox();
          assert.ok(close.x >= 0 && close.x + close.width <= width && close.y >= 0 && close.y + close.height <= height, 'Close button outside screen');
          if (orientation === 'portrait' && width === 412) await page.screenshot({ path: 'tmp/modal-portrait.png' });
          if (image.height > height) {
            await page.locator('.lb-image').evaluate(img => {
              const bounds = img.getBoundingClientRect();
              window.scrollBy(0, bounds.bottom - innerHeight);
            });
            assert.ok(await page.locator('.lb-image').evaluate(img => img.getBoundingClientRect().bottom <= innerHeight + 1), 'Tall photo bottom cannot be reached');
            const scrolledClose = await page.locator('.lb-close').boundingBox();
            assert.ok(scrolledClose.y >= 0 && scrolledClose.y + scrolledClose.height <= height, 'Close button lost after scrolling');
          }
          await page.locator('.lb-close').click();
          await page.locator('.lightbox').waitFor({ state: 'hidden' });
          console.log(`modal ${orientation}: ${width}x${height} OK`);
        }
      }
      photoDimensions = null;
    }
    if (process.argv.includes('--modal-only')) return;
    for (const [name, path] of pages) {
      html = fixtures ? readFileSync(`tmp/${name}.html`) : synthetic;
      for (const width of [320, 360, 412, 800, 1280]) {
        await page.setViewportSize({ width, height: width === 800 ? 360 : 800 });
        await page.goto(`https://www.myko.cz${path}`);
        const before = await page.locator('#content').textContent();
        const links = await page.locator('#content a[data-lightbox]').evaluateAll(items => items.map(a => [a.getAttribute('href'), a.getAttribute('title')]));
        await page.evaluate(script);
        await page.evaluate(script); // Repeated injection must not duplicate UI.
        assert.equal(await page.locator('#myko-responsive-style').count(), 1);
        const mobile = width <= 1000;
        assert.equal(await page.locator('.myko-mobile-tools').isVisible(), mobile);
        assert.deepEqual(await page.locator('#content a[data-lightbox]').evaluateAll(items => items.map(a => [a.getAttribute('href'), a.getAttribute('title')])), links);
        const preserved = await page.evaluate(() => {
          const copy = document.querySelector('#content').cloneNode(true);
          copy.querySelectorAll('.myko-mobile-tools, .myko-edibility, .myko-settings').forEach(node => node.remove());
          return copy.textContent.replace(/\s+/g, ' ').trim();
        });
        assert.equal(preserved, before.replace(/\s+/g, ' ').trim(), `${name}: original text changed`);
        if (mobile) {
          const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter(node => node.getBoundingClientRect().right > innerWidth + 1).map(node => `${node.tagName}#${node.id}.${node.className}: ${Math.round(node.getBoundingClientRect().right)}`).slice(0, 15));
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name} overflows at ${width}px: ${overflow.join(', ')}`);
          await page.locator('.myko-menu-toggle').click();
          const targets = await page.locator('.myko-mobile-tools nav a[href^="#"]').evaluateAll(items => items.every(a => document.getElementById(a.hash.slice(1))));
          assert.ok(targets, 'Section link has no target');
          assert.ok(await page.locator('#content .myko-gallery img').evaluateAll(images => images.every(img => !img.naturalWidth || Math.abs(img.clientWidth / img.clientHeight - img.naturalWidth / img.naturalHeight) < 0.03)), 'Thumbnail aspect ratio changed');
          assert.equal(await page.locator('.myko-menu-toggle').getAttribute('aria-expanded'), 'true');
          assert.ok(await page.locator('#menu').isVisible());
          await page.locator('.myko-menu-toggle').click();
          if (fixtures && links.length) {
            await page.locator('#content a[data-lightbox]').first().click();
            await page.locator('.lb-image').waitFor({ state: 'visible' });
            await page.waitForFunction(() => document.querySelector('.lb-image').naturalWidth > 0);
            assert.ok(await page.locator('.lb-image').evaluate(img => Math.abs(img.clientWidth / img.clientHeight - img.naturalWidth / img.naturalHeight) < 0.03));
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Photo viewer overflow');
            await page.keyboard.press('Escape');
            await page.locator('.lightbox').waitFor({ state: 'hidden' });
            await page.locator('.lightboxOverlay').waitFor({ state: 'hidden' });
          }
          if (fixtures && name === 'species' && width === 360) {
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.screenshot({ path: 'tmp/species-mobile.png', fullPage: true });
            await page.screenshot({ path: 'tmp/species-viewport.png' });
          }
          const search = page.locator('#myko-mobile-search');
          await search.fill('hr');
          assert.equal(await search.evaluate(input => input.validity.valid), false);
          await search.fill('hřib');
          const navigation = page.waitForURL(url => url.search === (fixtures ? '?searchtext=h%F8ib' : '?searchtext=h%C5%99ib'));
          await page.locator('.myko-mobile-tools button').click();
          await navigation;
          if (fixtures) html = readFileSync('tmp/atlas.html');
          await page.reload();
          await page.evaluate(script);
          assert.equal(new URL(page.url()).pathname, '/myko-atlas/');
          assert.equal(await search.inputValue(), 'hřib');
        } else {
          assert.equal(await page.locator('#main').evaluate(node => node.getBoundingClientRect().width), 1240);
          assert.ok(await page.locator('#menu').isVisible());
        }
        console.log(`${name}: ${width}px OK`);
      }
    }
    const sitePages = fixtures ? [
      ['home', '/'], ['article', '/clanek2638/'], ['advice', '/poradna/'],
      ['contacts', '/kontakty/'], ['site-search', '/vyhledavani/'],
    ] : [['synthetic-site', '/poradna/']];
    for (const [name, path] of sitePages) {
      html = fixtures ? readFileSync(`tmp/${name}.html`) : synthetic;
      await page.goto(`https://www.myko.cz${path}`);
      await page.evaluate(script);
      assert.equal(await page.locator('#myko-responsive-style').count(), 0, 'Other pages must start unchanged');
      assert.equal(await page.locator('meta[name="viewport"]').count(), 0);
      assert.match(await page.evaluate(() => window.testMenu.name), /^Zapnout/);
      const reload = page.waitForEvent('load');
      await page.evaluate(() => window.testMenu.callback());
      await reload;
      for (const width of [320, 360, 412, 800, 1280]) {
        await page.setViewportSize({ width, height: width === 800 ? 360 : 800 });
        await page.reload();
        const before = await page.locator('#content').textContent();
        const beforeLinks = await page.locator('#content a').evaluateAll(items => items.map(a => a.getAttribute('href')));
        await page.evaluate(script);
        assert.equal(await page.locator('.myko-settings input').isChecked(), true);
        assert.equal(await page.locator('#myko-mobile-search').count(), 0, 'Atlas search must stay atlas-only');
        assert.equal(await page.locator('#content').evaluate(node => {
          const copy = node.cloneNode(true);
          copy.querySelector('.myko-settings').remove();
          return copy.textContent;
        }), before);
        assert.deepEqual(await page.locator('#content a').evaluateAll(items => items.map(a => a.getAttribute('href'))), beforeLinks);
        if (width <= 1000) {
          const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter(node => node.getBoundingClientRect().right > innerWidth + 1).map(node => `${node.tagName}#${node.id}.${node.className}`).slice(0, 10));
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name} overflow: ${overflow}`);
          if (fixtures && ['home', 'article'].includes(name)) {
            await page.locator('a[rel^="lightbox"]').first().click();
            await page.locator('#lightboxImage').waitFor({ state: 'visible' });
            assert.ok(await page.locator('#lightboxImage').evaluate(img => Math.abs(img.clientWidth / img.clientHeight - img.naturalWidth / img.naturalHeight) < 0.03));
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Legacy lightbox overflows');
            await page.locator('#bottomNavClose').click();
            await page.locator('#lightbox').waitFor({ state: 'hidden' });
            await page.locator('#overlay').waitFor({ state: 'hidden' });
          }
          if (fixtures && width === 360 && name === 'article') await page.screenshot({ path: 'tmp/article-mobile.png', fullPage: true });
        } else {
          assert.equal(await page.locator('#main').evaluate(node => node.getBoundingClientRect().width), 1240);
        }
        console.log(`${name}: ${width}px OK`);
      }
      const disable = page.waitForEvent('load');
      await page.locator('.myko-settings input').click();
      await disable;
      await page.evaluate(script);
      assert.equal(await page.locator('#myko-responsive-style').count(), 0);
      assert.equal(await page.locator('.myko-settings').count(), 0);
      assert.equal(await page.evaluate(() => GM_getValue('siteWide', false)), false);
    }
    html = synthetic;
    await page.goto('https://www.myko.cz/myko-atlas/example/');
    await page.evaluate(script);
    assert.equal(await page.locator('.myko-settings input').isChecked(), false);
    const enable = page.waitForEvent('load');
    await page.locator('.myko-settings input').click();
    await enable;
    await page.evaluate(script);
    assert.equal(await page.locator('.myko-settings input').isChecked(), true);
    const disable = page.waitForEvent('load');
    await page.locator('.myko-settings input').click();
    await disable;
    await page.evaluate(script);
    assert.equal(await page.locator('#myko-responsive-style').count(), 1, 'Disabling whole-site mode must preserve the atlas');
    await page.goto('https://www.myko.cz/poradna/');
    await page.evaluate(script);
    assert.equal(await page.locator('#myko-responsive-style').count(), 0);
    await page.goto('https://unrelated.example/myko-atlas/');
    await page.evaluate(script);
    assert.equal(await page.locator('#myko-responsive-style').count(), 0);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
