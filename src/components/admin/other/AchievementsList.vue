<script setup>
defineProps(['achievements']);
const emit = defineEmits(['onListItemClick']);

const onClick = (achievement) => {
  emit('onListItemClick', achievement);
};
</script>

<template>
  <div class="container">
    <li v-for="achievement in achievements">
      <div class="item" @click="onClick(achievement)">
        <div class="grid gap-4">
          <div class="item-row !bg-gray-700 text-2xl">{{achievement.name}}</div>
          <div class="flex gap-4">
            <div class="item-row">{{achievement.type}}</div>
            <div class="item-row">{{achievement.criteria}}</div>
          </div>
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
  gap-4
  w-full
  list-none
  text-xl
  cursor-pointer
  transition-all
}
.item {
  @apply
  p-4
  grid
  gap-4
  grid-cols-2
  rounded-2xl
  bg-gray-900/40
}
.item-row {
  @apply
  bg-gray-700/40
  p-4
  rounded-xl
  w-full
  hover:brightness-[115%]
  transition-all
  text-wrap
}
</style>