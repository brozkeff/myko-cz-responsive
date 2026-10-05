# Repository instructions

- Communicate with the user in English; preserve the language of edited files. README, changelog, and user-facing controls are Czech.
- Focus on `/myko-atlas/`: mobile use as a mushroom field guide, especially Android Firefox. Since 0.0.2, other website sections have an optional responsive mode, disabled by default. The atlas stays responsive when it is switched off.
- Follow the ponytail approach: plain JavaScript and CSS, no framework or dependency unless needed. Prefer CSS to DOM rewrites and retain the website's existing behavior.
- Keep search, species links, photo enlargement, descriptions, edibility indicators, possible lookalikes, and author credits accessible. Do not alter identification information.
- Match userscripts only to myko.cz and www.myko.cz; all paths are needed for the optional whole-site mode. Preserve zoom, keyboard access, readable contrast, and usable touch targets.
- Download inspection pages and assets only into `tmp/`. It is gitignored. Do not commit or bundle myko.cz content or apply our license to upstream assets.
- Current version: `0.1.0`; use SemVer. Keep userscript metadata, documentation, and changelog consistent.
- License original project code under EUPL-1.2. Include copyright and `SPDX-License-Identifier: EUPL-1.2` in JavaScript and CSS headers. Use `Copyright (c) 2026 Myko.cz Responsive contributors` until the user provides another attribution.
- Keep the installation artifact self-contained where practical. If CSS is maintained separately, document how it is included and avoid relying on an unpublished remote URL.
- Verify atlas home, search results, alphabetical/systematic listings, genus pages, and species details at narrow portrait and landscape widths. Check page overflow, image aspect ratios, search submission, photo enlargement, touch targets, and desktop behavior. Report browser/device checks accurately.
- Start with one small runnable check for nontrivial script logic; avoid unnecessary tooling. Do not claim Android Firefox was tested without actually testing it.
- Maintain Czech `README.md`, Keep a Changelog `CHANGELOG.md`, and Obsidian task lists in `PLANS.md`. Keep unfinished work explicit.
- Use `master`. Stage named files, use conventional commits, and push only when requested. Prefer supported RTK filters for noisy output; native commands for concise or exact output.
- Record completed durable outcomes once with the ObsidianLog skill, if available. Skip read-only exploration and no-ops.
