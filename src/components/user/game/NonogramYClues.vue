<script setup>
import {computed} from "vue";

const props = defineProps(['clues']);

const tileSize = computed(() => {
  const len = props.clues.length;

  return ((15/len + (len/15)) - 0.1) + 'rem';
});
</script>

<template>
  <div class="xclues-container">
    <div v-for="ans in clues" class="content-end">
      <div class="single-clue" :style="{'width': tileSize}">
        <div v-for="single in ans" class="text-xl">
          <p>{{ single }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.xclues-container {
  @apply
  flex
  gap-px
  p-1
  bg-gray-600
  border-gray-700
  border-t-4
  rounded-sm
  rounded-se-2xl
  select-none;
}

.single-clue {
  @apply
  flex
  flex-col

  rounded-sm
  text-center;
}
</style>