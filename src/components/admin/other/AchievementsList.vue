<script setup>
defineProps(['achievements']);
const emit = defineEmits(['onListItemClick']);

const onClick = (achievement) => {
  emit('onListItemClick', achievement);
};
</script>

<template>
  <Transition name="fade-slower" mode="out-in">
    <div class="container" :key="achievements">
      <li v-for="achievement in achievements">
        <div class="item" @click="onClick(achievement)">
          <div class="grid grid-cols-[1fr_30%_15%] gap-2 [&>*]:content-center">
            <div class="item-row !bg-gradient-to-r from-gray-700 to-transparent text-2xl !p-3.5">{{achievement.name}}</div>
            <div class="item-row text-center">{{achievement.type}}</div>
            <div class="item-row text-center">{{achievement.criteria}}</div>
          </div>
          <div class="item-row !bg-gray-700/60">{{achievement.description}}</div>
        </div>
      </li>
    </div>
  </Transition>
</template>

<style scoped>
.container {
  @apply
  grid
  grid-cols-2
  gap-4
  w-full
  list-none
  text-xl
  cursor-pointer
  transition-all
  max-h-[calc(100vh-10.4rem)]
  overflow-auto
}
.item {
  @apply
  p-2
  grid
  gap-2
  rounded-xl
  bg-gray-900/40
}
.item-row {
  @apply
  bg-gray-700/40
  p-2.5
  rounded-lg
  hover:brightness-[115%]
  transition-all
  text-wrap
}
</style>