<script setup>
import {computed, onBeforeMount} from 'vue';
import {useTimeout} from '@vueuse/core'

const props = defineProps(['message', 'status', 'time']);

const {ready, start, stop} = useTimeout(props.time, {controls: true})

const notificationColor = computed(() => props.status ? 'bg-teal-900' : 'bg-[#7C2C3B]');

defineExpose({start});

onBeforeMount(stop);
</script>

<template>
  <Transition name="slide-left">
    <p v-if="!ready" :class="['notification', notificationColor]">
      {{ props.message }}
    </p>
  </Transition>
</template>

<style scoped>
.notification {
  @apply
  absolute
  top-0
  right-0
  min-h-14
  max-w-96
  px-4
  py-2
  border-b-4
  rounded-xl
  border-gray-800/60
  text-slate-200
  select-none
  font-thin
  font-sans
  text-2xl
  text-wrap
  tracking-wide
  z-10
  max-sm:w-full;
}
</style>