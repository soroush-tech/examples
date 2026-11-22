<script setup lang="ts">
import { ref } from 'vue'
import SheetCard from './SheetCard.vue'
import Swatch from './Swatch.vue'
import { brandTheme, darkTheme, lightTheme } from './theme'
import { apply, base, Button, Card, Dot, Global, Grid, Input, note, Page, ThemeProvider, Title } from './style'

const isDark = ref(false)
</script>

<template>
  <!-- The outermost provider declares its theme on :root. A new theme rewrites that one rule. -->
  <ThemeProvider :theme="isDark ? darkTheme : lightTheme" :color-scheme="isDark ? 'dark' : 'light'">
    <Global :styles="base" />
    <Page>
      <Card>
        <Title>UmberStyle with Vue <Dot data-testid="dot" /></Title>
        <p v-bind="apply(note)">Primary colour from useTheme: <Swatch /></p>
        <div>
          <Button data-testid="theme-switch" @click="isDark = !isDark">
            {{ isDark ? 'Light theme' : 'Dark theme' }}
          </Button>
        </div>
      </Card>
      <Grid data-testid="grid">
        <Card>
          <Title>Variants and states</Title>
          <Button data-testid="solid">Solid</Button>
          <Button data-testid="outline" variant="outline">Outline</Button>
          <Input data-testid="input" placeholder="Focus me" aria-label="Focus me" />
        </Card>
        <SheetCard />
        <ThemeProvider :theme="brandTheme">
          <Card data-testid="brand-card">
            <Title>Nested theme</Title>
            <p v-bind="apply(note)">Primary here: <Swatch /></p>
            <Button data-testid="brand-button">Brand</Button>
          </Card>
        </ThemeProvider>
      </Grid>
    </Page>
  </ThemeProvider>
</template>
