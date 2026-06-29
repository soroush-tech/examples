# Styled System Svelte Example

Uses [`@soroush.tech/styled-system/css`](../../../packages/styled-system) to drive a
Svelte app from a single theme.

```sh
npm i && npm run dev
```

Then open the printed URL (Rollup + sirv).

## How it works

Svelte has no `styled()` runtime, and it doesn't need one. `css()` turns a block of
theme-aware style props into a plain style object; [Emotion](https://emotion.sh) hands
that object back as a class name. One helper is the whole integration:

```js
import { css as emotion } from 'emotion'
import css from '@soroush.tech/styled-system/css'
import theme from './theme.js'

const sx = (styles) => emotion(css(styles)(theme))
```

```svelte
<h1 class={sx({ fontFamily: 'heading', fontSize: [5, 6, 7], color: 'text', mb: 2 })}>
  styled-system × Svelte
</h1>
```

What [`App.svelte`](./App.svelte) demonstrates:

- **Theme tokens** — `color: 'primary'`, `boxShadow: 'card'`, `borderRadius: 'default'`
  resolve from the named scales in [`theme.js`](./theme.js).
- **Responsive arrays** — `fontSize: [5, 6, 7]` and `flex: ['1 1 100%', '1 1 50%', '1 1 33%']`
  expand into `@media` rules at the theme's breakpoints.
- **Aliases** — `px`, `py`, `mx`, `bg` map to their full CSS properties, and negatives
  (`mx: -2`) pull from the space scale.
- **Variants** — `variant: 'buttons.primary'` pulls a whole named style object, including
  its `&:hover` state.

## Local package resolution

Like the other demos in this folder, this app installs the package from the committed
tarball (`file:../soroush.tech-styled-system-0.1.0.tgz`) rather than the workspace. See
the [examples README](../README.md) for how to refresh it after changing the package.
