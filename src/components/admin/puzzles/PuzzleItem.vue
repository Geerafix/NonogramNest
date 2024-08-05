<script setup>
import { ref } from 'vue';
defineProps(['value']);
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
  w-full
  p-1
  bg-gray-700/40
  rounded-md
  text-center
  cursor-pointer
  transition
  ease-[1s]
}
</style>