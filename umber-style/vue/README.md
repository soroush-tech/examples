# Vue

The tour of the `react` example, with `@umber-style/vue` in a Vite app of single-file components. The
styled components and the sheet are made in `src/style.ts`; the templates use them as components.

| What                                  | Where                                                                 |
| ------------------------------------- | --------------------------------------------------------------------- |
| `createStyle`, typed from the theme   | `src/style.ts`                                                        |
| `styled` with object and theme styles | `Page`, `Card`, `Title`, `Input`, `Dot` in `src/style.ts`             |
| A variant by attribute                | `Button`, `variant="outline"`, kept off the element by the Vue filter |
| A state style                         | `&:hover` and `&:focus-visible` on `Button`, `&:focus` on `Input`     |
| A responsive value                    | `Grid`: one column, three from `theme.breakpoints[0]` up              |
| `keyframes`                           | `pulse`, used by `Dot`                                                |
| Global styles                         | `base` and `<Global :styles="base" />` in `App.vue`                   |
| `StyleSheet.create` and `useStyle`    | `SheetCard.vue`: two entries in the `style` of `Card`                 |
| `css` and `apply`                     | `note`, on plain `<p>` elements with `v-bind="apply(note)"`           |
| `useTheme`                            | `Swatch.vue` prints the primary colour of the nearest provider        |
| `ThemeProvider`, nested               | the brand card in `App.vue`                                           |
| A theme switch                        | a new `:theme` for the outermost provider, which rewrites its `:root` rule |

What differs from React comes from Vue: `useTheme()` is a computed ref, `apply()` returns `{ class }`
(bound with `v-bind`), and a string tag gets every attribute unless a filter says otherwise, which is why
`Button` takes `shouldForwardProp` from `@umber-style/is-prop-valid/vue`.

## Run it

```sh
npm install
npm run dev         # Vite dev server
npm run build       # vue-tsc --noEmit && vite build
npm run preview     # serve the build
npm run typecheck   # vue-tsc --noEmit
```

## What to look at

- **Dark theme** turns the page dark; the classes of the buttons and cards stay the same.
- The brand card keeps its own surface and primary, and its `Swatch` prints the brand primary.
- **Select** adds the `selected` entry to the card: a class in the `overrides` layer, no `style` attribute.
- Hover, Tab to and focus the controls; make the window narrower than 640px and the cards stack.
- The Outline button has no `variant` attribute, and `document.querySelectorAll('[style]').length` is `0`.

## Verified

With `@umber-style/vue` and `@umber-style/is-prop-valid` 0.2.0, Vue 3.5.46, Vite 8.3.8, vue-tsc 3.3.14
and TypeScript 6.0.3 (vue-tsc does not run on TypeScript 7, which has no `lib/tsc` to load): a fresh
`npm install`, `npm run typecheck` and `npm run build` exit 0. In Chromium (Playwright), on `vite preview`
and on the dev server, the same checks as the `react` example, with the same results: the body
`#faf7f4` to `#121110` and back, both variants following the theme, the brand card unchanged, the
swatches, three columns then one, the animation, hover, focus and Tab, the sheet ring, no console error
or warning, no `style` attribute. The class names are the ones the React example makes for the same
styles.
