# Next.js App Router

A Next.js App Router app with two root layouts, one for each way UmberStyle reaches the page:

- **`/`: server components.** Every styled element is rendered by a server component, with the server
  build of `@umber-style/react` (the `react-server` condition): no `'use client'`, no hook. Each element
  sends its own `<style href precedence>`, which React moves to the head. The theme is a class on
  `<html>` (`ThemeProvider isRoot` and `themeClass`), chosen on the server from a cookie, and the switch
  is a form with a server action, so it works with scripting disabled too.
- **`/registry` and `/registry/stream`: client components under a registry.** The providers file
  (`app/(registry)/providers.tsx`) is the one of `docs/cache-and-server.md`: a cache from
  `@umber-style/cache` for each request, `CacheProvider`, and `useServerInsertedHTML` flushing the new
  rules into the stream as `<style data-umber>` elements. `/registry/stream` streams a late part through
  `Suspense`; its rules arrive with it. The switch gives the outermost provider the dark theme, which
  rewrites the one `:root` rule.

| File                                 | What it is                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------- |
| `theme.ts`                           | The light and dark themes: the only place with colours                     |
| `style.ts`                           | One `createStyle` for the app, used by both builds, and the global rules   |
| `components.ts`                      | Styled components with no directive: either build renders them             |
| `app/(server)/layout.tsx`, `page.tsx` | Server components only; `actions.ts` is the server action of the switch    |
| `app/(registry)/providers.tsx`       | The registry, the theme and the switch (`'use client'`)                    |
| `app/(registry)/parts.tsx`           | The client parts of the registry pages                                     |
| `app/(registry)/registry/stream/page.tsx` | An async server component in `Suspense` that renders a client part late |

## Run it

```sh
npm install
npm run dev        # http://localhost:3100
npm run build && npm start
npm run typecheck  # next typegen && tsc --noEmit
```

## What to look at

- `/`: press "Switch to dark". The page and the card turn dark; reload and the page is dark from the
  first frame, because the server already put the dark class on `<html>`. Turn scripting off in the
  browser and the switch still works (the form posts).
- `/`, in the developer tools: the head holds the style elements of the server components
  (`data-precedence="umber"`), `<html>` has `umber-theme-... umber-boundary umber-scheme-light`.
- `/registry/stream`: "Loading the late part..." shows first; about 1.5 s later the late card arrives,
  with a second `<style data-umber>` element in the body that holds only its new rules. Then press
  "Switch to dark": the whole page turns dark.
- View the source of any page (or load it with scripting disabled): it is styled as it arrives.
- No element of the app has a `style` attribute. Next.js itself adds one to its
  `<next-route-announcer>` (and, under `next dev`, to its development overlay).

## Verified

With `@umber-style/react` 0.2.0, `@umber-style/cache` 0.2.0, Next.js 16.4.6 (Turbopack), React 19.3.1
and TypeScript 7.0.2: `npm install`, `npm run typecheck` and `npm run build` exit 0. On `next start`
and `next dev`, in Chromium: the computed background of `body` and of a card before and after each
switch, the dark first frame with the cookie stored, every engine class of the raw HTML has its rule
in a style element before it (scripting disabled and plain HTTP), one live `:where(:root)` rule after
a switch on `/registry` and `/registry/stream`, no console error or hydration warning.

## Known in 0.2.0

On `/registry/stream`, a theme switched in the browser **while the page is still streaming** is undone
when the late part arrives. To see it: open `/registry/stream` and press "Switch to dark" while
"Loading the late part..." shows. The page turns dark; when the late card arrives, the page and the
cards turn light again, although the button says "Switch to light". The late `<style data-umber>`
element carries a `:where(:root)` rule with the light values that the server rendered (the late part
uses a token, `radii[1]`, that no earlier rule used, so the root rule was written again); it comes
after the rule of the browser's cache in the document and wins. Pressing the switch again sets things
right, because the next root theme the cache declares removes that rule.

A switch made after the late part arrived works, as above. The fault is fixed in the next release of
the packages, where the cache removes the root rules of a style element as it arrives.
