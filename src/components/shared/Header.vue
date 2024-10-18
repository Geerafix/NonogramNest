<script setup>
import {useRoute} from 'vue-router';

const route = useRoute();
</script>

<template>
  <h1 class="header">
    {{ route.meta.title }}
  </h1>
</template>

<style scoped>
.header {
  @apply
  mb-4
  p-2
  w-full
  mx-auto
  bg-gray-700/50
  rounded-lg
  rounded-ss-2xl
  rounded-ee-2xl
  text-3xl
  text-center
  font-thin
  font-sans
  select-none;
}
</style>