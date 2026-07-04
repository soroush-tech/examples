# examples

Standalone, runnable examples for the **`@soroush.tech`** packages. Each example lives on
its own and consumes the **published** npm package.

Clone this repo (or copy any single folder), install, and run.

## Collections

| Folder                                 | Package                                                                | What's inside                                                                                   |
| -------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`styled-system/`](./styled-system)    | [`@soroush.tech/styled-system`](https://www.npmjs.com/package/@soroush.tech/styled-system) | Seven app demos of the style props / `css` API across styled-components, Emotion, Svelte, and a typed Vite tour. |
| [`bench/`](./bench)                     | [`@soroush.tech/bench`](https://www.npmjs.com/package/@soroush.tech/bench)                  | Runnable benchmarks driven by the `soroush-bench` CLI in a CPU/RAM-pinned Docker sandbox.        |

## `styled-system/`

[![npm version](https://img.shields.io/npm/v/@soroush.tech/styled-system.svg)](https://www.npmjs.com/package/@soroush.tech/styled-system)
[![unpacked size](https://img.shields.io/npm/unpacked-size/%40soroush.tech%2Fstyled-system)](https://www.npmjs.com/package/@soroush.tech/styled-system)
[![monthly downloads](https://img.shields.io/npm/dm/@soroush.tech/styled-system.svg)](https://www.npmjs.com/package/@soroush.tech/styled-system)

Each subfolder is a self-contained app. `cd` in, install, and run its start script:

```sh
cd styled-system/basic
npm i && npm start
```

| Example              | Stack                         | Demonstrates                                       |
| -------------------- | ----------------------------- | -------------------------------------------------- |
| `basic`              | styled-components             | Core style props (`space`, `color`, `fontSize`, …) |
| `emotion`            | Emotion                       | The same style functions under Emotion             |
| `css`                | the `css` / `/css` API        | Theme-aware style objects via `css()`              |
| `responsive-objects` | object responsive syntax      | Breakpoint-keyed responsive values                 |
| `theme-aliases`      | scale aliases                 | Named aliases for theme scale values               |
| `svelte`             | Svelte                        | The style functions outside React (`npm run dev`)  |
| `typescript`         | Vite + React 19 + Emotion     | First-class typed, scale-aware props — verified by `tsc --noEmit` |

Start with **`typescript`** for the headline feature: it exercises (almost) every docs
example with full types. See [`styled-system/README.md`](./styled-system/README.md) for
details.

## `bench/`

[![npm version](https://img.shields.io/npm/v/@soroush.tech/bench.svg)](https://www.npmjs.com/package/@soroush.tech/bench)
[![unpacked size](https://img.shields.io/npm/unpacked-size/%40soroush.tech%2Fbench)](https://www.npmjs.com/package/@soroush.tech/bench)
[![monthly downloads](https://img.shields.io/npm/dm/@soroush.tech/bench.svg)](https://www.npmjs.com/package/@soroush.tech/bench)

Benchmarks that consume the published `@soroush.tech/bench` and run inside a pinned Docker
sandbox. Requires **Docker running** and **`@soroush.tech/bench` ≥ 1.0.0**.

```sh
# install-free — npx fetches the CLI and runs a plain-object bench
npx '@soroush.tech/bench' ./bench/clone.bench.ts --cpuset 0 --cpus 1 --memory 512m

# or install the folder, then use the local bin / package script
cd bench && npm install
npm run bench -- ./styled-system-hardest.bench.ts --cpuset 0 --cpus 1 --memory 512m
```

See [`bench/README.md`](./bench/README.md) for the full flag reference and sample output.

## Notes

- These folders are **outside** any pnpm workspace — install each one independently.
- Installed dependencies, build output, and lockfiles are intentionally untracked
  (see [`.gitignore`](./.gitignore)); every example resolves its package fresh from npm.
