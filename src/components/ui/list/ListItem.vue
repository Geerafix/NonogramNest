<script setup>
import { ref } from 'vue';
const overItem = ref(false);
</script>

<template>
  <div :class="['list-item', {'filter brightness-[1.3]': overItem}]"
      @mouseover="overItem = true" @mouseleave="overItem = false">
    <slot></slot>
  </div>
</template>

<style scoped>
.list-item {
  @apply
  grid
  grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
  gap-2 
  p-2
  bg-gray-900/40 
  rounded-lg 
  text-center
  transition-all
  ease-in
  cursor-pointer;
}
</style>