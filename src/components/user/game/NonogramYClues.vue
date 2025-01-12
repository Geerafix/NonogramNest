<script setup>
import {computed} from "vue";

const props = defineProps(['clues', 'highlightedIdx']);

const tileSize = computed(() => {
  const len = props.clues.length;
  return (0.8 + (15 / len)) + 'rem';
});

const highlightedStyle = computed(() =>
    'bg-gray-700 rounded-sm rounded-tr-lg shadow-inner'
);
</script>

<template>
  <div class="xclues-container">
    <div v-for="(ans, idx) in clues" :class="[highlightedIdx === idx ? highlightedStyle : '']"
         class="content-end">
      <div :style="{'width': tileSize}" class="single-clue">
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