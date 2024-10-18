<script setup>
import {computed} from "vue";

const props = defineProps(['clues']);

const tileSize = computed(() => {
  const len = props.clues.length;
  return (0.8 + (15/len)) + 'rem';
});
</script>

<template>
  <div class="yclues-container">
    <div v-for="ans in clues">
      <div class="single-clue" :style="{'height': tileSize}">
        <div v-for="single in ans" class="text-xl">
          <p>&nbsp;{{ single }}&nbsp;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.yclues-container {
  @apply
  flex
  flex-col
  w-fit
  min-w-12
  gap-px
  p-1
  bg-gray-600
  border-gray-700
  border-l-4
  rounded-sm
  rounded-es-2xl
  select-none;
}

.single-clue {
  @apply
  flex
  justify-end
  items-center
  rounded-sm
  text-center;
}
</style>