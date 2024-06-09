<script setup>
import { ref } from 'vue';
const overItem = ref(false);
</script>

<template>
  <div class="puzzle-list-item" :style="{ filter: overItem ? 'brightness(1.3)' : 'brightness(1)' }"
       @mouseover="overItem = true" @mouseleave="overItem = false">
    <slot></slot>
  </div>
</template>

<style scoped>
.puzzle-list-item {
  @apply
  grid
  grid-cols-[1fr_30%_30%_1fr]
  gap-2 items-center
  text-center
  cursor-pointer
  transition ease-[1s]
}
</style>