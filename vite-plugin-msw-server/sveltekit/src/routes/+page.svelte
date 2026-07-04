<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<main>
  <h1>Server-rendered products, mocked</h1>
  <p>
    The list below is fetched on the server in <code>+page.server.ts</code> during
    <code>vite dev</code> and resolved against msw mocks — no live API in sight. If the fetch
    fails, the load throws and SvelteKit renders <code>+error.svelte</code> instead.
  </p>

  <ul>
    {#each data.products as product (product.id)}
      <li>{product.name} — ${product.price}</li>
    {/each}
  </ul>

  <p><a href="/status">See the dev-time SSR demo →</a></p>
</main>
