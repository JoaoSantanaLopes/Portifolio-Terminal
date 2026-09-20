# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint     # ESLint over the whole repo
```

There is no test setup in this project (no test runner, no test files).

## What this is

A single-page personal portfolio (https://joao-santana.vercel.app/) rendered as a fake shell.
`react-terminal-ui` supplies the terminal chrome and the input line; every "page" of the
portfolio is a React component printed as a terminal output line. There is no router —
navigation is typing commands.

## Architecture

**Command dispatch.** [src/commands.js](src/commands.js) is the single registry: each entry has
`name`, `aliases`, and `description` (an i18n key, not literal text). [src/App.jsx](src/App.jsx)
matches typed input against `name` or `aliases` and maps the canonical `name` to a component in a
`switch`. Adding a command means editing *three* places: the registry, the `switch` in
`handleCommandInput`, and the translation keys for its description in both languages.
[Ajuda.jsx](src/components/Ajuda.jsx) (the `help` output) renders itself from the registry, so it
needs no edit. `limpar` is special-cased: it resets state and returns early instead of pushing output.

**Terminal state.** `terminalLineData` is an array of *JSX elements*, appended to on every input and
passed as children to `<Terminal>`. Output components are rendered once at push time and keep the
language they were rendered with — switching language does not retranslate scrollback.

**Two input modes.** `promptState.active` switches `handleInput` between `handleCommandInput` and
`handlePromptInput`. The latter is a 3-step wizard (name → email → message) started by the button in
[Contato.jsx](src/components/Contato.jsx), which sends via EmailJS. The EmailJS service/template/public
IDs are hardcoded in `handlePromptInput`; the public key is intentionally client-side.

**Keyboard handling is imperative.** `react-terminal-ui` owns the `<input>`, so history (↑/↓), Tab
completion and the like are attached in a `useEffect` that reaches into the DOM via `containerRef`,
listens in the *capture* phase, and calls `stopImmediatePropagation()` to beat the library's own
handlers. Because that effect runs once with `[]`, it reads live state through
`commandHistoryRef` / `promptActiveRef` mirrors rather than closing over state. Writing into the
input uses `setNativeInputValue()` (`document.execCommand('insertText')`) so React's controlled-input
state stays in sync — assigning `input.value` directly will not work.

**i18n.** [src/i18n.js](src/i18n.js) holds *all* strings for both `pt` (default) and `en` inline in
one `resources` object; there are no translation JSON files. Any new UI string goes in both
language trees. Content lives in [src/projectsData.js](src/projectsData.js) and
[src/experiencesData.js](src/experiencesData.js) as data objects that store i18n *keys*
(`titleKey`, `roleKey`, `descriptionKeys`, and even entries inside `skills`) which the card
components resolve with `t()`. Dates are translated strings too, not date values.

**Static assets.** Project GIFs, `avatar.jpg` and the CVs live in [public/](public/) and are
referenced by absolute path (`/java_parking.gif`). [Curriculo.jsx](src/components/Curriculo.jsx)
picks `/cv-en.pdf` or `/cv-pt.pdf` from the active language and renders it with
`@react-pdf-viewer`, whose pdf.js worker is loaded from a unpkg CDN URL pinned to the
`pdfjs-dist` version in package.json — bump both together.

**Styling.** Plain CSS, one `.css` file per component imported by that component, plus global
[src/index.css](src/index.css) which also overrides `react-terminal-ui` internals. A few components
(`LanguageSwitcher`, `Projetos`) use inline style objects instead. Terminal height is a hardcoded
`83vh` in App.jsx and the mobile breakpoint (`width <= 500`, which strips the prompt string and the
window title) is a `window.innerWidth` check, not a media query.

## Conventions

Component names, CSS classes, i18n keys and command names are in Portuguese; English aliases exist
only as command aliases. Comments and commit messages are in Portuguese. The ESLint config errors on
unused vars except those matching `^[A-Z_]`.
