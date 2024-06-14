<script setup>
import { ref } from 'vue';
defineProps([
  'value'
]);
const overItem = ref(false);
</script>

<template>
  <div :class="['puzzle-item', {'filter brightness-[1.3]': overItem}]"
       @mouseover="overItem = true" @mouseleave="overItem = false">
    <span>{{ value }}</span>
  </div>
</template>

<style scoped>
.puzzle-item {
  @apply
  grid
  gap-2
  text-center
  cursor-pointer
  transition
  ease-[1s]
  w-full
  bg-gray-700/40
  p-1
  rounded-md
}
</style>