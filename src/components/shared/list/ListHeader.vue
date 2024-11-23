<script setup>

</script>

<template>
  <div class="headers">
    <slot></slot>
  </div>
</template>

<style scoped>
.headers {
  @apply
  sticky
  grid
  grid-cols-[repeat(auto-fit,minmax(0,1fr))]
  bg-gray-900/55
  gap-2
  p-2
  mb-2
  rounded-xl
  text-center
  select-none
}
</style>