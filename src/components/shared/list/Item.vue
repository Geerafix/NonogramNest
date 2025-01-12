<script setup>
import {ref} from 'vue';

defineProps(['value']);
const overItem = ref(false);
</script>

<template>
  <div :class="['item', {'filter brightness-[1.2]': overItem}]"
       @mouseleave="overItem = false" @mouseover="overItem = true">
    <span>{{ value }}</span>
  </div>
</template>

<style scoped>
.item {
  @apply
  p-1
  bg-gray-700/50
  rounded-lg
  cursor-pointer
  transition
  truncate
  ease-[1s]
}
</style>