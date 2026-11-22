<script setup lang="ts">
import { useTheme } from './style'

// A computed ref of the real values of the nearest provider, for code that needs a value, not a style.
const theme = useTheme()
</script>

<template>
  <code data-testid="swatch">{{ theme.palette.primary }}</code>
</template>
