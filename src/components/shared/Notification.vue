<script setup>
import {computed, reactive, onBeforeMount} from 'vue';
import {useTimeout} from '@vueuse/core'

const settings = reactive({status: false, message: '', time: 2500});
const {ready, start, stop} = useTimeout(settings.time, {controls: true});

const notificationColor = computed(() => settings.status ? 'bg-teal-900' : 'bg-[#7C2C3B]');

const show = (status, message, time) => {
  Object.assign(settings, {status: status, message: message, time: time || 2500});
  start();
};

defineExpose({show});

onBeforeMount(stop);
</script>

<template>
  <Transition name="slide-left" mode="out-in">
    <div v-if="!ready" :class="['notification', notificationColor]" :key="settings.message">
      {{ settings.message }}
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  @apply
  absolute
  top-[5.5rem]
  right-4
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
  z-50
  max-sm:w-full;
}
</style>