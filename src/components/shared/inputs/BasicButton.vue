<script setup>
defineProps(['buttonText']);
</script>

<template>
  <button class="basic-button">
    {{ buttonText }}
    <slot></slot>
  </button>
</template>

<style scoped>
.basic-button {
  @apply
  px-3
  py-[10px]
  min-h-14
  min-w-14
  rounded-xl
  items-center
  border-b-4
  bg-sky-800/90
  border-slate-800/60
  text-slate-200
  hover:bg-sky-600/70
  hover:text-white
  hover:shadow-gray-600/10
  hover:shadow-lg
  hover:rounded-[20px]
  transition-all
  select-none
  text-2xl
  text-nowrap
  tracking-wide;
}
</style>