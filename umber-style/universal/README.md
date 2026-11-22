# One source for the web and React Native

An Expo app whose screen is written once, in `src/App.tsx`, and runs on the web and on iOS and Android. It imports its styling from `umber-style/react`: on the web that entry is the React binding (classes and CSS variables), on a phone it is the React Native binding (real values in native style objects). The app has a styled button, a sheet whose entries are given through `style`, a nested theme, and a light and dark switch that changes what is drawn. A card at the bottom asks the binding itself which one it is.

## Run it

```sh
npm install
npm run web          # the web side, at http://localhost:8081
npm start            # the dev server for a phone (Expo Go), see below
npm run typecheck    # tsc --noEmit
npx expo export --platform web       # or android, ios: the production bundles, in dist/
```

## Which file is shared

| File                   | Web                                              | iOS and Android                       |
| ---------------------- | ------------------------------------------------ | ------------------------------------- |
| `src/App.tsx`          | shared                                           | shared                                |
| `src/style.ts`         | shared: `createStyle` from `umber-style/react`   | shared                                |
| `src/theme.ts`         | shared: the only place with colours              | shared                                |
| `src/host.tsx`         | `div`, `span`, a `button` that takes `onPress`   | not used                              |
| `src/host.native.tsx`  | not used                                         | `View`, `Text`, `Pressable`           |

The bundler picks the host file: Metro takes `host.native.tsx` for iOS and Android and `host.tsx` for the web. The host files also give the options of `createStyle`: the web gets the prefix `umber`, React Native gets none, because it has no class names and would warn about the option.

`umber-style/react` is resolved by the export conditions of the package. Expo's Metro uses the `react-native` condition for iOS and Android and `browser` for the web (`@expo/metro-config`, `unstable_conditionsByPlatform`), so the web target of Expo gets the React binding, renders through `react-dom`, and needs no separate web page. The source maps of the three exports show it:

| Export    | UmberStyle modules in the bundle                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `web`     | `umber-style/dist/react.mjs`, `@umber-style/react/dist/*`, `@umber-style/core`, `src/host.tsx`              |
| `android` | `umber-style/dist/react-native.mjs`, `@umber-style/react-native/dist/*`, `@umber-style/core`, `src/host.native.tsx` |
| `ios`     | the same as `android`                                                                                      |

## What to look at

In the browser:

- The page background, the cards and the buttons take their colours from the theme. "Switch the page to dark" changes them; nothing in the markup gets a `style` attribute, and the classes of the components stay the same: only the `:root` rule of the theme is rewritten.
- The second card is under a nested `ThemeProvider` with a partial theme: it keeps its own surface and text colour in both themes of the page. In the developer tools its wrapper is a `div` with `display: contents` and the theme classes.
- The third card is under another nested `ThemeProvider`, with a switch of its own: "Switch this card to dark" gives that provider its dark theme, and only that card changes. The page's switch does not touch it, and its switch does not touch the page.
- The last card says `umber-style/react resolved to the React binding (web)`, `themeClass(lightTheme)` gave a class string such as `umber-theme-1cc15bl umber-boundary`, and a sheet entry is a class.

On a phone, the same screen: the same cards and colours, the button switches the theme. The last card should say `umber-style/react resolved to the React Native binding`, `themeClass(lightTheme) gave ""` (React Native has no classes), a sheet entry is a style object such as `{"fontSize":13,"color":"#6b625c"}`, and the elements are `View, Text and Pressable`.

## On a phone with Expo Go

The app was not run on a device or an emulator here (the machine has no Android SDK, Java or iOS toolchain). The Android and iOS bundles were built with `npx expo export`, which exited 0. To run it on your phone:

1. Install Expo Go for SDK 58 from the App Store or Google Play (Expo Go 58.0.7 on iOS, 58.0.5 on Android when this was written). Expo Go runs one SDK; if yours is for another one, `npx expo start` says so.
2. In this folder: `npm install`, then `npx expo start`.
3. Scan the QR code that the terminal prints: with the Camera app on iOS, with Expo Go ("Scan QR code") on Android. The phone and the computer must be on the same network; if they are not, or a firewall is in the way, run `npx expo start --tunnel` instead.
4. You should see the title "One source, two platforms", a card that says "The page is in the light theme." with a brown "Switch the page to dark" button, a light blue card (a nested theme), a light green card with a green "Switch this card to dark" button (a nested theme with its own switch), and the "Which binding?" card.
5. Tap "Switch the page to dark": the background turns near black, the first card dark, its button light orange, and the text says "The page is in the dark theme."; the blue card and the green card stay as they are. Tap again to go back.
6. Tap "Switch this card to dark" on the green card: only that card turns dark green, with a light green button, and the rest of the page stays as it is. Tap again and it is light green again. Switch the page in between: the card keeps its own theme.
7. Read the "Which binding?" card: it should name the React Native binding and show `themeClass(lightTheme) gave ""`.

## Verified

With `umber-style` 0.2.0, Expo SDK 58.0.26, React Native 0.88.1, React 19.3.0, react-native-web 0.21.4 and TypeScript 6.0.3 (the version Expo's template pins), on Node 26: a fresh `npm install`, `npx expo install --check` and `npx expo-doctor` with no issue, `tsc --noEmit`, and `npx expo export` for `web`, `android` and `ios`, each with exit code 0. The web side was loaded in headless Chromium, from the development server and from the production export: the computed colours of the page, the cards and the buttons before and after the switch and back, the `display: contents` wrapper of the nested theme, the hover opacity of the button, no `[style]` attribute on any element, and no console error or warning.
