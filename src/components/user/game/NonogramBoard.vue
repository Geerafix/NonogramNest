<script setup>
import {set, useMousePressed} from "@vueuse/core";
import {ref} from "vue";

const emit = defineEmits(['highlight']);
const props = defineProps([
  'answers',
  'size',
  'paintAnswer',
  'paintExclude'
]);

const {pressed} = useMousePressed();
const firstColor = ref();
const firstButton = ref();

const paintTile = (row, col) => {
  if (firstButton.value === 2) {
    props.paintExclude(row, col);
  } else {
    props.paintAnswer(row, col);
  }
};

const paintHover = (col, row) => {
  emit('highlight', col, row);
  if (pressed.value && props.answers[col][row] === firstColor.value) {
    paintTile(col, row);
  }
};

const paintClick = (col, row, event) => {
  set(firstColor, props.answers[col][row]);
  set(firstButton, event.button);
  paintTile(col, row);
};

const colorTile = (row, col) => (
    (props?.answers[row-1] && props?.answers[col-1][row-1] === -1) ? 'bg-white relative x' :
    ((props?.answers[row-1] && props?.answers[col-1][row-1] === 1) ? 'bg-gray-800' : 'bg-white')
);
</script>

<template>
  <main class="board">
    <div class="rows" v-for="row in props.size">
      <div v-for="col in props.size"
           :class="['cols', colorTile(row, col)]"
           @mousedown.prevent="paintClick(col - 1, row - 1, $event)"
           @mouseover.prevent="paintHover(col - 1, row - 1)"
           @mouseleave.prevent="emit('highlight', null, null)"
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
  rounded-[2.5px]
  text-center
  duration-75
  transition-all;
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