<script setup>
import {set} from '@vueuse/core';
import {ref} from 'vue';

const answers = ref([]);

const paintTileAnswer = (row, col) => {
  answers.value[row][col] = (answers.value[row][col] + 1) % 2;
};

const paintTileExclude = (row, col) => {
  answers.value[row][col] = (answers.value[row][col] - 1) % 2;
};

const setBoard = (size) => {
  set(answers, Array.from({length: size}, () => Array(size).fill(0)));
};

const clearBoard = () => {
  set(answers, answers.value.map((row) => row.map(() => 0)));
};

defineExpose({setBoard, clearBoard, answers});
</script>

<template>
  <main class="board">
    <div class="rows" v-for="row in answers.length">
      <div v-for="col in answers.length"
           :class="['cols', (answers[row-1] && answers[col-1][row-1] === -1) ? 'bg-gray-200/80' :
                                 ((answers[row-1] && answers[col-1][row-1] === 1) ? 'bg-gray-800' : 'bg-white')]"
           @mousedown.left="paintTileAnswer(col - 1, row - 1)"
           @contextmenu.prevent="paintTileExclude(col - 1, row - 1)">
      </div>
    </div>
  </main>
</template>

<style scoped>
.board {
  @apply
  grid
  grid-flow-col
  p-1
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
  w-10
  h-10
  border-gray-700
  border-[1px]
  rounded-[2px]
  text-center
  transition-all;
}
</style>