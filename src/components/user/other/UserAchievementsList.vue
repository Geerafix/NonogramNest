<script setup>
defineProps(['achievements']);
</script>

<template>
  <div class="container">
    <li v-for="achievement in achievements">
      <div class="item">
        <div class="grid gap-2">
          <div class="item-row !bg-gray-700 text-2xl !p-3.5">{{achievement.name}}</div>
          <div class="item-row !bg-gray-700 text-2xl !p-3.5">{{achievement.date_achieved}}</div>
        </div>
        <div class="item-row">{{achievement.description}}</div>
      </div>
    </li>
  </div>
</template>

<style scoped>
.container {
  @apply
  grid
  gap-2
  w-full
  list-none
  text-xl
  cursor-pointer
  transition-all
}
.item {
  @apply
  p-2
  grid
  gap-2
  grid-cols-2
  rounded-xl
  bg-gray-900/40
}
.item-row {
  @apply
  bg-gray-700/40
  p-2.5
  rounded-lg
  w-full
  hover:brightness-[115%]
  transition-all
  text-wrap
}
</style>