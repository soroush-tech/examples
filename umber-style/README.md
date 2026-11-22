# UmberStyle examples

Runnable examples for [UmberStyle](https://www.npmjs.com/package/umber-style), a styling engine for
React, Vue, React Native and plain JavaScript: every theme token becomes a CSS variable, and a theme
switch is a class change. Each folder is a self-contained app that installs the **published** packages
from npm (`^0.2.0`), never a link into the UmberStyle repository.

## The examples

| Folder                                 | Stack                               | Demonstrates                                                                                                                                                                                                                                       | Run                       |
| -------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [`static-themes`](./static-themes)     | Vite + React 19, prerendered        | A static page: light, dark and brand themes as a class on `<html>`, the stored choice applied before the first paint, three nested themes, a theme added at run time, an override through `style`                                                  | `npm start`               |
| [`react`](./react)                     | Vite + React 19                     | `styled`, `ThemeProvider`, `useTheme`, `StyleSheet` entries in `style`, `css`, `keyframes`, global styles, a responsive value, hover and focus, a variant by prop, a theme switch                                                                  | `npm run dev`             |
| [`vue`](./vue)                         | Vite + Vue 3 (single-file components) | The same tour with `@umber-style/vue`, in templates                                                                                                                                                                                              | `npm run dev`             |
| [`vanilla`](./vanilla)                 | Vite + TypeScript, no framework     | `@umber-style/core` alone: tokens as variables, a class from a style object, theme classes, a switch on a button; `@umber-style/css` for a class with no theme                                                                                     | `npm run dev`             |
| [`next-app-router`](./next-app-router) | Next.js 16 App Router + React 19    | Server components styled by the server build (`isRoot` and `themeClass` on `<html>`, a cookie and a server action, works without script); the registry providers file for client components, a page streamed through `Suspense`, a light and dark switch | `npm run build && npm start` |
| [`universal`](./universal)             | Expo SDK 58: web, iOS, Android                     | One component source for the web and React Native through `umber-style/react`: a styled button, sheet entries in `style`, a nested theme, a theme switch; the screen and the bundles show which binding resolved (bundled for iOS and Android, not run on a device here)                                                                                                                                                                                                                                     | `npx expo start`             |

New to UmberStyle? Start with **`react`** (or **`vue`**), then **`static-themes`** for a page whose theme is
in the HTML from the first frame.

## Run one

Each folder installs and runs on its own, with npm:

```sh
cd umber-style/react
npm install
npm run dev
```

Every example has `npm run typecheck` and `npm run build` too; its own README says what to look at.
Lockfiles, `node_modules` and build output are not tracked: a fresh install resolves the packages from
npm.

## Rules the examples keep

- No inline style: no element is given a `style` attribute. The `style` prop of a styled component takes
  sheet entries and style objects, which the engine merges into a class: that is shown, not avoided.
- Colours come from the theme: each example has one `theme.ts`, and no other file holds a colour.
- TypeScript, strict.

## Verified with

UmberStyle 0.2.0 (every package), Node 26.4.0 and npm 11.17.0 on Windows 11, Chromium through
Playwright 1.65.0. Each example: a fresh `npm install`, the type check and the production build exit 0,
and the claims of its README were checked in the running app (computed styles before and after a theme
switch, no console error or hydration warning, no `style` attribute).
The tools: Vite 8.3.8, React 19.3.1, Vue 3.5.46, Next.js 16.4.6, Expo SDK 58.0.26 with React Native 0.88.1,
TypeScript 7.0.2 (6.0.3 in `vue`, for vue-tsc, and in `universal`, the version Expo pins).

## Known in 0.2.0

- **`next-app-router`**: on the streamed page, a theme switched while the page is still streaming is
  undone when the late part arrives, because the late `<style data-umber>` element brings a `:root`
  rule of the light theme that stays live. Switching after the late part arrived works. Fixed in the
  next release. See [its README](./next-app-router/README.md#known-in-020).
- **`universal`**: bundled for iOS and Android (`npx expo export`), and run in a browser on the web, but
  not run on a device or an emulator here. Its README gives the steps with Expo Go. Installing
  `umber-style` in a React Native app also installs `vue`, which `@umber-style/vue` needs; no bundle
  includes it.
