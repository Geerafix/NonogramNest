<script setup>
defineProps(['messages']);
const emit = defineEmits(['onListItemClick']);

const onClick = (id) => {
  emit('onListItemClick', id)
};
</script>

<template>
  <Transition name="fade-slower" mode="out-in">
    <div class="container" :key="messages">
      <li v-for="message in messages">
        <div class="item" @click="onClick(message.message_id)">
          <div class="primary-info">
            <div class="item-row text-left text-2xl bg-gradient-to-r from-gray-700">{{message.title}}</div>
            <div class="item-row !bg-gray-700/20 bg-gradient-to-r">Od: {{message.username}}</div>
            <div class="item-row !bg-gray-700/20">Data: {{new Date(message.date).toLocaleDateString()}} r.</div>
          </div>
          <textarea class="content">{{message.content}}</textarea>
        </div>
      </li>
      <div v-if="messages.length === 0" class="no-info">
        Brak wiadomości
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.container {
  @apply
  grid
  grid-cols-2
  gap-4
  list-none
  text-xl
  cursor-pointer
  transition-all
  max-h-[calc(100vh-10.4rem)]
  max-w-full
  overflow-auto
}
li {
  @apply
  break-inside-avoid
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
.no-info {
  @apply
  absolute
  left-1/2
  -translate-x-1/2
  opacity-20
  italic
  text-2xl
  text-nowrap
}
.primary-info {
  @apply
  grid
  grid-cols-[1fr_auto_auto]
  gap-2
  h-14
  [&>*]:!content-center
  [&>*]:!text-nowrap
}
.content {
  @apply
  item-row
  resize-none
  cursor-pointer
  bg-gradient-to-r
  from-gray-800
  outline-0
}
</style>