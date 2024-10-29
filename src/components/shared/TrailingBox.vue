<script setup>
import {useElementSize, useMouse} from "@vueuse/core";
import {ref} from "vue";
defineProps(['message', 'isHovered']);

const box = ref();
const {width} = useElementSize(box);

const { x, y } = useMouse();
</script>

<template>
  <Transition name="fade">
    <div v-if="isHovered" ref="box" class="trailing-box"
         :style="{'top': (y+2)+'px', 'left': ((x-width/2)-20)+'px'}">
      {{message}}
    </div>
  </Transition>
</template>

<style scoped>
.trailing-box {
  @apply
  w-fit
  h-min
  px-3
  py-2
  bg-slate-700
  rounded-xl
  border-b-4
  border-slate-800/60
  shadow-md
  text-xl
  max-w-96
  absolute
  transition-opacity
}
</style>