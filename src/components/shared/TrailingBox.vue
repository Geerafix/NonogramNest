<script setup>
import {useMouse} from "@vueuse/core";
defineProps(['message', 'isHovered']);

const { x, y } = useMouse();
</script>

<template>
  <Transition name="fade">
    <div :style="{'top': (y-10)+'px', 'left': (x-100)+'px'}" v-if="isHovered" class="trailing-box">
      {{message}}
    </div>
  </Transition>
</template>

<style scoped>
.trailing-box {
  @apply
  w-fit
  h-14
  p-4
  bg-slate-700
  rounded-xl
  border-b-4
  border-slate-800/60
  shadow-md
  text-xl
    text-nowrap
  absolute
  transition-opacity
}
</style>