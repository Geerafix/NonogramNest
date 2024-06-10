<script setup>
defineProps([
    'counter',
    'points'
]);
</script>

<template>
  <div class="flex justify-between w-fit mt-4 mx-auto gap-12">
    <div class=" text-white font-thin font-sans text-2xl">Czas: {{ counter }}s</div>
    <div class=" text-white font-thin font-sans text-2xl">Punkty: {{ points }}</div>
  </div>
</template>
