<script setup>
import {ref} from 'vue';

const overItem = ref(false);
</script>

<template>
  <div :class="['list-item', {'filter brightness-[1.15]': overItem}]"
       @mouseover="overItem = true" @mouseleave="overItem = false">
    <slot></slot>
  </div>
</template>

<style scoped>
.list-item {
  @apply
  relative
  grid
  grid-cols-[repeat(auto-fit,minmax(0,1fr))]
  gap-2
  p-2
  bg-gray-900/45
  rounded-xl
  text-center
  transition-all
  text-xl
  ease-in
  cursor-pointer
}
</style>