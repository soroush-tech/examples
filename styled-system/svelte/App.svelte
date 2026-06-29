<script>
  import { css as emotion } from 'emotion'
  import css from '@soroush.tech/styled-system/css'
  import theme from './theme.js'

  // Svelte has no styled() runtime, but it doesn't need one: styled-system's
  // css() turns a block of theme-aware style props into a plain style object,
  // and Emotion hands that object back as a class name. That single helper is
  // all the glue required.
  const sx = (styles) => emotion(css(styles)(theme))

  const cards = [
    {
      title: 'Responsive',
      body: 'Array values map to theme breakpoints — fontSize: [1, 2, 3] grows at each step.',
    },
    {
      title: 'Theme-aware',
      body: 'Tokens resolve from the theme — color: "primary" becomes the theme palette value.',
    },
    {
      title: 'Variants',
      body: 'variant: "buttons.primary" pulls a whole named style object, hover and all.',
    },
  ]
</script>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(body) {
    margin: 0;
  }
</style>

<main class={sx({ fontFamily: 'body', color: 'text', bg: 'background', px: [3, 4], py: [4, 5] })}>
  <h1 class={sx({ fontFamily: 'heading', lineHeight: 'heading', fontSize: [5, 6, 7], m: 0, mb: 2 })}>
    styled-system &times; Svelte
  </h1>

  <p class={sx({ fontSize: [2, 3], color: 'muted', mt: 0, mb: 4, maxWidth: 640 })}>
    Theme-aware, responsive style props with no styled() wrapper — just a style
    object piped through Emotion. Resize the window to watch the values respond.
  </p>

  <div class={sx({ display: 'flex', flexWrap: 'wrap', mx: -2 })}>
    {#each cards as card}
      <div
        class={sx({
          flex: ['1 1 100%', '1 1 50%', '1 1 33%'],
          m: 2,
          p: 3,
          bg: 'white',
          borderRadius: 'default',
          boxShadow: 'card',
        })}
      >
        <h3 class={sx({ mt: 0, mb: 2, fontSize: 3, color: 'text' })}>{card.title}</h3>
        <p class={sx({ m: 0, fontSize: 1, lineHeight: 'body', color: 'muted' })}>{card.body}</p>
      </div>
    {/each}
  </div>

  <div class={sx({ display: 'flex', flexWrap: 'wrap', mt: 4 })}>
    <button
      class={sx({
        variant: 'buttons.primary',
        px: 4,
        py: 2,
        mr: 3,
        mb: 2,
        fontSize: 2,
        border: 0,
        cursor: 'pointer',
      })}
    >
      Primary
    </button>
    <button
      class={sx({
        variant: 'buttons.outline',
        px: 4,
        py: 2,
        mb: 2,
        fontSize: 2,
        cursor: 'pointer',
      })}
    >
      Outline
    </button>
  </div>
</main>
