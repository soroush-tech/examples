<script setup lang="ts">
import { ref } from 'vue'
import { apply, Button, Card, note, sheet, Title, useStyle } from './style'

const styles = useStyle(sheet)
const isSelected = ref(false)
</script>

<template>
  <Card data-testid="sheet-card" :style="[styles.roomy, isSelected && styles.selected]">
    <Title>StyleSheet</Title>
    <p v-bind="apply(note)">Two sheet entries in the style attribute of a styled component.</p>
    <Button variant="outline" :aria-pressed="isSelected" @click="isSelected = !isSelected">
      {{ isSelected ? 'Unselect' : 'Select' }}
    </Button>
  </Card>
</template>
