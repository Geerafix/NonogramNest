<script setup>
defineProps([
    'size', 
    'paint'
]);
</script>

<template>
    <main class="board">
        <div v-for="row in size" class="rows">
            <div class="cols" v-for="col in size" 
                @mousedown.left="paint(col - 1, row - 1, $event.target)" @mousedown.right="">
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
    bg-white 
    border-gray-700 
    border-[1px] 
    rounded-[2px] 
    text-center 
    transition;
}
</style>