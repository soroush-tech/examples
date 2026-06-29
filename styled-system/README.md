# Styled System examples

Standalone demos for [`@soroush.tech/styled-system`](../../packages/styled-system). Each
folder is its own app — `cd` into one, install, and run its start script:

```sh
npm i && npm start   # CRA examples
```

## The examples

| Folder               | Stack                         | Demonstrates                                                    | Run                                   |
| -------------------- | ----------------------------- | --------------------------------------------------------------- | ------------------------------------- |
| `basic`              | styled-components             | Core style props (`space`, `color`, `fontSize`, …)              | `npm start`                           |
| `emotion`            | Emotion                       | The same style functions under Emotion                          | `npm start`                           |
| `css`                | the `css` / `/css` API        | Theme-aware style objects via `css()`                           | `npm start`                           |
| `responsive-objects` | object responsive syntax      | Breakpoint-keyed responsive values                              | `npm start`                           |
| `theme-aliases`      | scale aliases                 | Named aliases for theme scale values                            | `npm start`                           |
| `svelte`             | Svelte                        | Using the style functions outside React                         | `npm run dev`                         |
| `typescript`         | **Vite + React 19 + Emotion** | First-class typed, scale-aware props — a typed tour of the docs | `npm run dev` · `build` · `typecheck` |

The **`typescript`** example is the one to read for the package's headline feature: it
exercises (almost) every docs example with full types and is verified by `tsc --noEmit`
(see its own [README](./typescript/README.md)). It runs on Vite, not react-scripts.

### Refreshing the tarball

Rebuild and re-pack after changing the package, then reinstall in each example:

```sh
cd packages/styled-system && pnpm build && pnpm pack
mv soroush.tech-styled-system-*.tgz ../../examples/styled-system/
```

If the package version changes, update the `file:` path in each example's `package.json`
to match the new tarball name.
