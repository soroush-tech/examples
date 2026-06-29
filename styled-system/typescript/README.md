# Styled System TypeScript Demo

First-class TypeScript usage of [`@soroush.tech/styled-system`](../../../packages/styled-system)
with Emotion. A typed walk-through of (almost) every example in the
[docs](../../../packages/styled-system/docs) — the style functions drop into `styled()`
with no `any`/adapter, and the prop interfaces are **theme-scale-aware** (matching
`@types/styled-system@5.1.25`).

```sh
npm i
npm run dev        # Vite dev server
npm run build      # tsc --noEmit && vite build
npm run typecheck  # tsc --noEmit
```

`npm run typecheck` (`tsc --noEmit`) is the verification: it passes only if the package's
exported types resolve and behave as a drop-in. `npm run dev` / `npm run build` run it
for real with Vite + React 19 + Emotion.

## What it covers

| File                  | Docs section                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme.ts`            | [Theme specification](../../../packages/styled-system/docs/theme-specification.md) — a typed theme with every scale                                                       |
| `App.tsx`             | [Getting started](../../../packages/styled-system/docs/getting-started.md) — a typed `Box`                                                                                |
| `style-functions.tsx` | [API](../../../packages/styled-system/docs/api.md) — `space`, `color`, `typography`, `layout`, `flexbox`, `grid`, `background`, `border`, `position`, `shadow`, `compose` |
| `responsive.tsx`      | [Responsive styles](../../../packages/styled-system/docs/responsive-styles.md) — array + aliased object syntax                                                            |
| `variants.tsx`        | [Variants](../../../packages/styled-system/docs/variants.md) — `variant`, custom prop, `scale`, `buttonStyle`/`textStyle`/`colorStyle`                                    |
| `custom-props.tsx`    | [Custom props](../../../packages/styled-system/docs/custom-props.md) — `system`, `.propNames`, `compose`                                                                  |
| `subpaths.ts`         | [css / theme-get / props](../../../packages/styled-system/docs/css.md) — the subpath exports + `should-forward-prop`                                                      |
| `type-safety.ts`      | [TypeScript](../../../packages/styled-system/docs/typescript.md) — `@ts-expect-error` proofs that off-scale values are rejected                                           |

Try changing `bg="primary"` to `bg="green"` in `src/App.tsx` — `tsc` will flag it,
because `green` isn't in the theme's `colors`.
