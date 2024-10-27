<script setup>
defineProps(['messages']);
const emit = defineEmits(['onListItemClick']);

const onClick = (id) => {
  emit('onListItemClick', id)
};
</script>

<template>
  <div class="container">
    <li v-for="message in messages">
      <div class="item" @click="onClick(message.id)">
        <div class="grid grid-cols-[60%_1fr_1fr] gap-2 h-14 [&>*]:!content-center [&>*]:!text-nowrap">
          <div class="item-row text-left text-2xl !bg-gray-700">{{message.title}}</div>
          <div class="item-row !bg-gray-700/20">Od: {{message.username}}</div>
          <div class="item-row !bg-gray-700/20">Data: {{new Date(message.date).toLocaleDateString()}} r.</div>
        </div>
        <textarea class="item-row resize-none pointer-events-none">{{message.content}}</textarea>
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
  overflow-auto
  max-h-[calc(100vh-11rem)]
}
.item {
  @apply
  grid
  grid-rows-[min-content_1fr]
  p-2
  gap-2
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