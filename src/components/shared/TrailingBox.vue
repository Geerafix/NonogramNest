<script setup>
import {useMouse} from "@vueuse/core";

defineProps(['message', 'isHovered']);

const {x, y} = useMouse();
</script>

<template>
  <Transition name="fade">
    <div v-if="isHovered" class="trailing-box" :style="{'top': (y+20)+'px', 'left': (x+4) + 'px'}">
      {{message}}
    </div>
  </Transition>
</template>

<style scoped>
.trailing-box {
  @apply
  fixed
  w-fit
  h-min
  px-3
  py-2
  max-w-96
  text-xl
  shadow-md
  bg-slate-700
  rounded-xl
  border-b-4
  border-slate-800/60
  -translate-x-1/2
  z-50
}
</style>