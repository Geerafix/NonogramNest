<script setup>
defineProps([
  'placeholder',
  'type'
]);

const value = defineModel();
</script>

<template>
  <input v-model="value" :placeholder="placeholder" :type="type" class="basic-input">
</template>

<style scoped>
.basic-input {
  @apply
  w-60
  h-14
  px-3
  border-b-4
  rounded-xl
  bg-gray-200
  border-gray-500/90
  text-slate-900
  ring-gray-600
  focus:ring-gray-500
  focus:rounded-xl
  focus:outline-0
  focus:border-0
  focus:ring-4
  text-2xl
  text-left
  transition-all;
}
</style>