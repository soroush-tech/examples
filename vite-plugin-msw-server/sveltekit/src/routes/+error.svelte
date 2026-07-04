<script lang="ts">
  import { page } from '$app/state'
</script>

<!--
  SvelteKit renders this whenever a load function throws (here, when the API fetch fails
  because the plugin is disabled). It is the framework's built-in error state — the parallel
  to a React error boundary.
-->
<main>
  <h1>⚠️ Something went wrong</h1>
  <p role="alert">{page.error?.message}</p>
  <p><a href="/">← Back to the demo</a></p>
</main>
