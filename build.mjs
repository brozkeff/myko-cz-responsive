// Copyright (c) 2026 brozkeff
// SPDX-License-Identifier: EUPL-1.2
// Repository: https://github.com/brozkeff/myko-cz-responsive
// Embed local CSS so installing one userscript requires no remote resources.
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('./myko-responsive.user.js', import.meta.url);
const original = readFileSync(file, 'utf8');
const css = readFileSync(new URL('./myko-responsive.css', import.meta.url), 'utf8');
const result = original.replace(/(  \/\/ CSS-BEGIN[^\n]*\n)[\s\S]*?(  \/\/ CSS-END)/,
  (_, start, end) => `${start}  style.textContent = ${JSON.stringify(css)};\n${end}`);
if (process.argv.includes('--check')) {
  if (result !== original) throw new Error('CSS is out of sync. Run node build.mjs.');
} else {
  writeFileSync(file, result);
}
