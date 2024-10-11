<script setup>
import {set, useMousePressed} from "@vueuse/core";
import {ref} from "vue";

const props = defineProps([
  'answers',
  'size',
  'paint'
]);

const {pressed} = useMousePressed();
const firstColour = ref();

const paintHover = (col, row) => {
  if (pressed.value && props.answers[col][row] === firstColour.value) {
    props.paint(col, row);
  }
};

const paintClick = (col, row) => {
  set(firstColour, props.answers[col][row]);
  props.paint(col, row);
};

</script>

<template>
  <main class="board">
    <div class="rows" v-for="row in props.size">
      <div v-for="col in props.size"
           :class="['cols', (props.answers[row-1] && props.answers[col-1][row-1] === -1) ? 'bg-gray-200/80 pointer-events-none' :
                                 ((props.answers[row-1] && props.answers[col-1][row-1] === 1) ? 'bg-gray-800' : 'bg-white')]"
           @mousedown.prevent="paintClick(col - 1, row - 1)"
           @mouseover.prevent="paintHover(col - 1, row - 1)"
           @contextmenu.prevent="">
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
  w-full
  h-full
  border-gray-700
  border-[1px]
  rounded-[2px]
  text-center
  transition-all;
}
</style>