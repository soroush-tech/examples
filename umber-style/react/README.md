# React

A tour of `@umber-style/react` in a Vite app, in one file (`src/App.tsx`):

| What                                 | Where in `App.tsx`                                                       |
| ------------------------------------ | ------------------------------------------------------------------------ |
| `createStyle`, typed from the theme  | `src/style.ts`                                                           |
| `styled` with object and theme styles | `Page`, `Card`, `Title`, `Input`, `Dot`                                  |
| A variant by prop                    | `Button`, `variant="solid" \| "outline"` (kept off the element)          |
| A state style                        | `&:hover` and `&:focus-visible` on `Button`, `&:focus` on `Input`        |
| A responsive value                   | `Grid`: one column, three from `theme.breakpoints[0]` up                 |
| `keyframes`                          | `pulse`, used by `Dot`                                                   |
| Global styles                        | `globalStyles` and `<Global styles={base} />`: the reset and `body`      |
| `StyleSheet.create` and `useStyle`   | `SheetCard`: two entries in the `style` prop of `Card`                   |
| `css` and `apply`                    | `note`, put on plain `<p>` elements with `{...apply(note)}`              |
| `useTheme`                           | `Swatch` prints the primary colour of the nearest provider               |
| `ThemeProvider`, nested              | the brand card                                                           |
| A theme switch                       | a new `theme` for the outermost provider, which rewrites its `:root` rule |

## Run it

```sh
npm install
npm run dev         # Vite dev server
npm run build       # tsc --noEmit && vite build
npm run preview     # serve the build
npm run typecheck   # tsc --noEmit
```

## What to look at

- **Dark theme** turns the page dark. Only the `:root` rule of the theme changes: in the developer tools
  the classes of the buttons and cards stay the same before and after.
- The nested brand card keeps its own surface and primary colour, and its `Swatch` prints the brand
  primary while the top one prints the page's.
- **Select** in the StyleSheet card adds the `selected` entry: the card gets a ring through a class in
  the `overrides` layer, not a `style` attribute.
- Hover a button (it fades), Tab to one (an outline), focus the input (its border takes the primary).
- Make the window narrower than 640px: the three cards stack.
- `document.querySelectorAll('[style]').length` is `0`.

This is a client-only app: before its script runs the page has no CSS. The `static-themes` example
shows a page whose theme is in the HTML from the first frame.

## Verified

With `@umber-style/react` 0.2.0, React 19.3.1, Vite 8.3.8 and TypeScript 7.0.2: a fresh `npm install`,
`npm run typecheck` and `npm run build` exit 0. In Chromium (Playwright), on `vite preview` and on the
dev server: the body is `#faf7f4` and turns `#121110` after the switch (and back), with
`color-scheme` following; both button variants change colour with the theme and `variant` is not an
attribute; the brand card stays `#eef6f8` with a `#2a6f8a` button in both themes; the swatches read
`#8a4b2a` / `#2a6f8a`, then `#e0a07a` / `#2a6f8a`; the grid has three columns at 1100px and one at 500px;
the dot runs `pulse-...` for 1.5s; hover gives opacity 0.8, focus a primary border, Tab a 3px outline;
selecting the sheet card adds the ring; no console error or warning; no `style` attribute.
