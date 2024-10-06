<script setup>
import {ref} from 'vue';

defineProps(['value']);
const overItem = ref(false);
</script>

<template>
  <div :class="['item', {'filter brightness-[1.2]': overItem}]"
       @mouseover="overItem = true" @mouseleave="overItem = false">
    <span>{{ value }}</span>
  </div>
</template>

<style scoped>
.item {
  @apply
  p-1
  bg-gray-700/40
  rounded-md
  cursor-pointer
  transition
  ease-[1s]
}
</style>