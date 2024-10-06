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
  grid
  grid-cols-[repeat(auto-fit,minmax(0,1fr))]
  gap-2
  bg-gray-900/40
  p-2
  mb-2
  rounded-md
  text-center
  select-none;
}
</style>