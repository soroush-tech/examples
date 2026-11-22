# Vanilla

UmberStyle with no framework, in one file (`src/main.ts`) of plain TypeScript and the DOM:

- **tokens as variables**: `createEngine(theme)` turns every token into a CSS variable, and
  `engine.refs.palette.primary` is the reference `var(--umber-palette-primary)`;
- **a class from a style object**: `engine.css({ ... })` returns a class name and writes its rule once.
  Its values are references, so the same class serves every theme;
- **a theme class**: `engine.themeClass(darkTheme, 'dark')` returns the class string that declares the
  dark values, with its colour scheme;
- **a theme switch**: the button puts the other theme class on `<html>`. Nothing is recomputed: the
  classes of the card and the button stay the same, only the variables change;
- **global rules**: `engine.insertGlobal({ body: { ... } })` for the page background and text;
- **a class with no theme**: `css` of `@umber-style/css` for the monospace value, a style that needs no
  token and no engine.

## Run it

```sh
npm install
npm run dev         # Vite dev server
npm run build       # tsc --noEmit && vite build
npm run preview     # serve the build
npm run typecheck   # tsc --noEmit
```

## What to look at

- The line under the title prints the reference the style holds and the value it has now; it changes
  when you click **Dark theme**.
- In the developer tools, `<html>` swaps one `umber-theme-...` class for another while the button keeps its
  class. The head holds two style elements: `data-style="umber"` (the engine, in cascade layers) and
  `data-style="css"` (the plain layer, unlayered).
- No element has a `style` attribute.

## Verified

With `@umber-style/core` and `@umber-style/css` 0.2.0, Vite 8.3.8 and TypeScript 7.0.2: a fresh
`npm install`, `npm run typecheck` and `npm run build` exit 0. In Chromium (Playwright), on `vite preview`
and on the dev server: the body is `#faf7f4` and the card `#ffffff`, then `#121110` and `#1d1b19` after
the switch, and back; the button goes from `#8a4b2a` to `#e0a07a` with the same class; the printed value
follows; hover gives opacity 0.8; the code element has the monospace font; no console error or
warning; no `style` attribute.
