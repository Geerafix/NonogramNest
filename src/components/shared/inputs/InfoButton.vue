<script setup>
import { useElementHover } from "@vueuse/core";
import { ref } from "vue";

defineProps(['text']);

const element = ref();
const elementHover = useElementHover(element);
</script>

<template>
  <div class="relative">
    <div class="container" ref="element">
      <slot></slot>
    </div>
    <div class="info" :class="{'opacity-0': !elementHover}">
      {{text}}
    </div>
  </div>
</template>

<style scoped>
.container {
  @apply
  flex
  items-center
  justify-center
  w-14
  h-14
  bg-teal-700
  rounded-xl
  border-b-4
  border-teal-950/60
  hover:bg-teal-600
  hover:border-teal-950/45
  transition-all
  duration-100
  ease-in
  text-2xl
  text-nowrap
  text-gray-300
  select-none
  drop-shadow
  cursor-pointer
  overflow-x-hidden
  hover:rounded-[30px]
}

.info {
  @apply
  absolute
  w-fit
  bg-teal-600
  h-14
  mt-2
  border-b-4
  border-teal-950/45
  rounded-full
  content-center
  transition-all
  text-white
  text-2xl
  text-nowrap
  px-4
  left-1/2
  -translate-x-1/2
}
</style>