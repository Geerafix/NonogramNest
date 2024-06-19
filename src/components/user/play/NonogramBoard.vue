<script setup>
import { watch, ref } from 'vue';
const props = defineProps([
    'answers',
    'size',
    'paint'
]);
const board = ref([]);
watch(() => props.answers, () => { board.value = props.answers; });
</script>

<template>
    <main class="board">
        <div v-for="row in props.size" class="rows">
            <div v-for="col in props.size" 
                :class="['cols', (board[row-1] && board[col-1][row-1] === 1) ? 'bg-black' : 'bg-white']" 
                @mousedown.left="props.paint(col - 1, row - 1)" @mousedown.right="">
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
    transition;
}
</style>