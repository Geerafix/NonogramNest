<script setup>
import {set, useMousePressed} from '@vueuse/core';
import {computed, ref} from 'vue';

const {pressed} = useMousePressed();
const firstColor = ref();
const firstButton = ref();

const answers = ref([]);

const paintTile = (row, col) => {
  if (firstButton.value === 2) {
    answers.value[row][col] = (answers.value[row][col] - 1) % 2;
  } else {
    answers.value[row][col] = (answers.value[row][col] + 1) % 2;
  }
};

const paintHover = (col, row) => {
  if (pressed.value && answers.value[col][row] === firstColor.value) {
    paintTile(col, row);
  }
};

const paintClick = (col, row, event) => {
  set(firstColor, answers.value[col][row]);
  set(firstButton, event.button);
  paintTile(col, row);
};

const setBoard = (size) => {
  set(answers, Array.from({length: size}, () => Array(size).fill(0)));
};

const clearBoard = () => {
  set(answers, answers.value.map((row) => row.map(() => 0)));
};

const tileSize = computed(() => {
  const len = answers.value.length;
  return (1.2 + (15/len)) + 'rem';
});

const colorTile = (row, col) => (
    (answers.value[row-1] && answers.value[col-1][row-1] === -1) ? 'bg-white relative x' :
    ((answers.value[row-1] && answers.value[col-1][row-1] === 1) ? 'bg-gray-800' : 'bg-white')
);

defineExpose({setBoard, clearBoard, answers});
</script>

<template>
  <main :class="['board', {'opacity-0': answers.length === 0}]">
    <div class="rows" v-for="row in answers.length">
      <div v-for="col in answers.length"
           :class="['cols', colorTile(row, col)]"
           :style="{'width': tileSize, 'height': tileSize}"
           @mousedown.prevent="paintClick(col - 1, row - 1, $event)"
           @mouseover.prevent="paintHover(col - 1, row - 1)"
           @contextmenu.prevent=""/>
    </div>
  </main>
</template>

<style scoped>
.board {
  @apply
  absolute
  top-1/2
  -translate-y-1/2
  left-1/2
  -translate-x-1/2
  grid
  grid-flow-col
  p-1
  transition-opacity
  bg-gray-700
  rounded-sm;
}
.rows {
  @apply
  grid
  grid-flow-row;
}
.cols {
  @apply
  border-gray-700
  border-[1px]
  rounded-[3px]
  text-center
  duration-75
  transition-colors;
}
.x::after {
  @apply
  bg-gray-700
  content-[""]
  rounded-xl
  w-1 h-full
  rotate-45
  left-1/2 -translate-x-1/2
  top-1/2 -translate-y-1/2
  absolute;
}

.x::before {
  @apply
  bg-gray-700
  content-[""]
  rounded-xl
  w-1 h-full
  -rotate-45
  left-1/2 -translate-x-1/2
  top-1/2 -translate-y-1/2
  absolute;
}
</style>