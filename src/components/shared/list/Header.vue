<script setup>
defineProps(['headerName']);
</script>

<template>
  <div class="header">
    <span>{{ headerName }}</span>
  </div>
</template>

<style scoped>
.header {
  @apply
  p-2
  bg-gradient-to-b
  from-gray-700
  to-gray-700/85
  rounded-md
  transition
  ease-[1s]
  text-2xl
}
</style>