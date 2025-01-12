<script setup>
import {computed, ref, watch} from 'vue';
import {useElementHover} from "@vueuse/core";

const emit = defineEmits(['onSwitch']);
const props = defineProps(['displayed'])

const switched = ref(false);

watch(switched, () => emit('onSwitch', switched.value));

const restyleSwitched = computed(() => (
    switched.value ? 'rounded-ss-2xl rounded-es-2xl border-r-4' : 'translate-x-full rounded-se-2xl rounded-ee-2xl border-l-4')
);

const element = ref();
const elementHover = useElementHover(element);
</script>

<template>
  <Transition mode="out-in" name="slide-left-hidden">
    <div v-show="elementHover" class="info">
      <span class="text-gray-300">Wyświetlanie:</span><br>
      {{ displayed }}
    </div>
  </Transition>
  <div ref="element" class="w-fit relative">
    <button class="switch" @click="switched = !switched">
      <div :class="['dot', restyleSwitched]"></div>
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
.switch {
  @apply
  grid
  grid-cols-2
  bg-gray-400
  border-gray-500
  border-b-4
  rounded-2xl
  w-24
  h-14
  transition-all
  hover:bg-gray-400/90
  text-gray-600;
}

.dot {
  @apply
  absolute
  w-1/2
  h-full
  bg-gray-600/85
  border-gray-500
  border-b-4
  transition-all
  drop-shadow-md
  ease-in-out
  duration-[75ms]
}

.info {
  @apply
  p-2
  absolute
  right-0
  bottom-[calc(100%+0.5rem)]
  transition-all
  text-xl
  shadow-md
  bg-slate-700
  rounded-xl
  border-b-4
  border-slate-800/60
}
</style>