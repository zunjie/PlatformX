# PlatformX — An Open-Model Workbench for Office, Development & Design

A pure static single-page workbench with zero build step and zero runtime dependencies: just open `index.html`. It bundles open-model routing, an expert / skill / connector marketplace, task and project collaboration, automation templates, and a credits-and-plans system.

- **Live app**: <https://platformx.app.workbuddy.host/?sharecode=LGBT6NPMNN>
- **Static preview**: <https://zunjie.github.io/PlatformX/>
- **Repository**: <https://github.com/zunjie/PlatformX>

[中文文档](./README.md) · **English**

## Features

| Module | Description |
| --- | --- |
| Workbench | Three modes — Office / Development / Design. Drag-and-drop attachments (≤ 100 MB), model switching, prompt templates |
| Tasks | Create tasks, transition status, attach deliverables, keyword search and filters. Global search `⌘K`, new task `⌘N` |
| Projects | Multi-project grouping with per-project task statistics |
| Library | Indexed documents, spreadsheets and links; 10 sample items |
| Experts | 300 expert roles across 8 domains (Office / Dev / Design / Data / Marketing / Operations / Finance & Legal / Education & Research) |
| Skills | 300 invocable skills covering documents, coding, design and data processing |
| Connectors | 300 third-party service connectors in 7 groups, including DingTalk, Slack, Microsoft Teams and Telegram |
| Automation | 10 ready-made scheduled task templates (daily digests, weekly reports, data audits, code-review reminders, …) |
| Plans & Credits | 3 plan tiers, credit balance and consumption history |
| Account | Phone OTP sign-in, WeChat QR sign-in, account linking, cloud sync after sign-in |
| Mobile | Download entries for iOS / Android / HarmonyOS, with QR code |

Brand icons are reproduced from [Simple Icons](https://simpleicons.org/) (CC0): 190 authentic vector logos plus 110 brand-colored monogram badges for Chinese products Simple Icons does not cover.

## Tech Stack

- **Frontend**: vanilla HTML / CSS / JavaScript (ES2020+), no framework, no bundler
- **Routing**: hash routing (`#/home`, `#/tasks`, `#/experts`, …)
- **Persistence**: `localStorage` + WorkBuddy Cloud dual write
- **Cloud**: WorkBuddy Cloud SDK (Auth / Database / LLM / Storage), vendored into `js/workbuddy-cloud-sdk.js` — **no CDN dependency**
- **Testing**: Puppeteer + headless Chrome end-to-end suites

## Project Layout

```
platformx/
├── index.html                  # single-page entry
├── css/
│   └── styles.css              # design tokens + components
├── js/
│   ├── app.js                  # routing, rendering, events, cloud sync
│   ├── data.js                 # static data: models / skills / experts / connectors / plans
│   ├── brand-icons.js          # brand icon map (Simple Icons paths + CN monograms)
│   ├── cloud.js                # cloud client bootstrap
│   └── workbuddy-cloud-sdk.js  # vendored cloud SDK (works offline)
├── assets/                     # logo, favicons
└── qa/                         # end-to-end tests and reports
```

## Run Locally

Either way works — a static server avoids `file://` cross-origin limits:

```bash
# Python
python -m http.server 8080

# or Node
npx serve .
```

Then open <http://localhost:8080>. Opening `index.html` directly also works, with cloud features falling back to local mode.

## Testing

End-to-end suites live in `qa/` and require Chrome:

```bash
cd qa
npm install
node px-test.mjs          # full regression (63 checks)
node app-dl-test.mjs      # mobile download entries
node cloud-test.mjs       # cloud SDK load and sign-in entry
node top300-test.mjs      # skills / experts / connectors data integrity
```

Chrome is auto-detected per platform; override with `CHROME_PATH=/path/to/chrome`.
Scripts load the page over `file://`, so they pass `--allow-file-access-from-files --disable-web-security`.

CI runs the full regression on every push and pull request via `.github/workflows/qa.yml`, and uploads `qa-result.json` plus screenshots as build artifacts.

## Deployment

The project is a static site — any static host works.

**GitHub Pages** (enabled; rebuilds on every push to `main`):

```bash
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY   # a local proxy can break the git tunnel to github.com
git add -A && git commit -m "update" && git push
```

Pages config: source = `main` / repository root. The root `.nojekyll` file skips Jekyll processing.

**WorkBuddy hosting**: production runs at `https://platformx.app.workbuddy.host/`, which keeps the cloud-service origin allowlist, so cloud sign-in and cross-device sync only work on that domain.

## Cloud Service & Limits

The cloud client is bootstrapped in `js/cloud.js` with two tables:

- `user_state`: one row per user — `plan` / `credits` / `credit_log` / `settings`
- `tasks`: many rows per user — `task_uid` + `payload` (JSONB) holding the full task object

When signed out or the cloud is unreachable, the app falls back to `localStorage` and keeps working.

> **Origin allowlist**: the backend enforces an exact origin match. On custom domains such as `zunjie.github.io`, cloud sign-in and cross-device sync are unavailable while everything else works normally. Use `platformx.app.workbuddy.host` for full functionality.

## Version

Current version **v2.11**. Recent changes:

- Skills / experts / connectors expanded to 300 each, in 8 domains
- Brand icon system: 190 authentic vector logos + 110 Chinese-brand monograms
- Cloud SDK vendored locally, removing the jsdelivr CDN dependency (no more blank screens or silent downgrades on network hiccups)
- HarmonyOS download entry added, using the Huawei wordmark logo
- WeChat Pay / Alipay logos restored in the payment sheet and connector list

## Notice

The UI and data are for demonstration. Model capabilities, connector status and credit history are front-end mock data; replace `js/data.js` with API responses for real integration.

## License

[MIT](./LICENSE)
