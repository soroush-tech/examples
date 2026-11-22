# Static themes

A page rendered to static HTML at build time with `@umber-style/react`, then hydrated so its buttons work.
The theme of the page is a class on `<html>`:

- **light, dark and brand** themes, switched by a button that changes the class on `<html>`: no component
  renders again and no style is recomputed;
- **the stored choice before the first paint**: the choice goes to `localStorage`, and a small script in
  the head puts its class on `<html>` while the document is parsed, so a reload in dark is dark from its
  first frame;
- **three nested themes**: a section inside a section inside a section, each under its own `ThemeProvider`
  that changes the surface, text, border and primary colours;
- **a theme added at run time**: "add a fourth theme" calls `themeClass(sunsetTheme, 'dark')`, which writes
  the rule of the new class on the spot, and switches `<html>` to it;
- **an override through `style`**: the Delete button is the same `Button`, given a sheet entry in its
  `style` prop. The entry's class is in a later cascade layer, so it wins over the component's own
  colour and radius, with no `style` attribute.

`src/prerender.tsx` renders the page with `renderToString`, takes its CSS with `extractPageStyles` (the
rules of the page and of every theme `<html>` can switch to) and writes both, with the head script, into
`dist/index.html`. `src/style.ts` is the one style module that the prerender and the browser share.

## Run it

```sh
npm install
npm start           # build, prerender, then serve dist/ (vite preview)
npm run build       # tsc --noEmit, client build, prerender into dist/index.html
npm run typecheck   # tsc --noEmit
npm run dev         # Vite dev server, for editing
```

`npm run dev` serves `index.html` as it is, with nothing prerendered: the page is drawn by the browser, so
it has no CSS before its script runs. The first paint with the stored theme is a property of the built
page: look at it with `npm start`.

## What to look at

- Click **dark**, then reload: the page comes back dark with no light frame. View the source: `<html>` has
  the light class, the head holds one `<style data-style="umber">` with every theme class, and the script
  after it swaps the class before the body exists.
- Turn JavaScript off and reload: the page is still fully styled, in the default light theme.
- **add a fourth theme**: one rule is added to the style element and the page turns sunset. It is not
  stored: a theme made at run time has no rule in the static HTML.
- The nested sections keep their own surfaces whatever `<html>` has. A nested provider's wrapper also
  carries the class of its whole merged theme (its theme over the provider above), so inside a section
  the tokens it does not change keep the values of the `theme` given to the provider above, not those of
  the class on `<html>`.
- No element has a `style` attribute: `document.querySelectorAll('[style]').length` is `0`.

## Verified

With `@umber-style/react` and `@umber-style/core` 0.2.0, React 19.3.1, Vite 8.3.8, TypeScript 7.0.2 and
Node 26: a fresh `npm install`, `npm run typecheck` and `npm run build` exit 0. In Chromium (Playwright),
on `vite preview`: the body background is `#faf7f4`, `#121110`, `#eef6f8` and `#2b1a24` under light,
dark, brand and the added theme; with dark stored, the body is `#121110` at the moment `<body>` is
created, before any script was fetched; the Delete button is the danger colour with a radius of `0px`
while Save keeps the primary colour and `8px`; the three sections have their own backgrounds; no
console error or warning; no `style` attribute; one style element. With scripting disabled the page is
styled in light.
