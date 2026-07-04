<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<main>
  <h1>Server-rendered status, mocked</h1>
  <p>
    Run <code>npm run dev</code> and refresh — <code>servedAt</code> changes each request
    because the load re-runs on the server and the plugin mocks it. A failed fetch throws and
    SvelteKit renders <code>+error.svelte</code>.
  </p>

  <dl>
    <dt>ok</dt>
    <dd>{String(data.status.ok)}</dd>
    <dt>region</dt>
    <dd>{data.status.region}</dd>
    <dt>servedAt</dt>
    <dd>{data.status.servedAt}</dd>
  </dl>

  <p><a href="/">← Back to the SSG demo</a></p>
</main>
