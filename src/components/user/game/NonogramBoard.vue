<script setup>
defineProps([
  'answers',
  'size',
  'paint'
]);
</script>

<template>
    <main class="board">
        <div class="rows" v-for="row in size">
            <div v-for="col in size"
                 :class="['cols', (answers[row-1] && answers[col-1][row-1] === -1) ? 'bg-gray-200/80 pointer-events-none' :
                                 ((answers[row-1] && answers[col-1][row-1] === 1) ? 'bg-gray-800' : 'bg-white')]"
                 @mousedown.left="paint(col - 1, row - 1)"
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