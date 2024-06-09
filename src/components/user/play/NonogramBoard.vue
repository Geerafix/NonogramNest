<script setup>
defineProps([
    'size', 
    'paint'
]);
</script>

<template>
    <main class="grid grid-flow-col p-1 bg-gray-700 rounded-sm">
        <div v-for="row in size" class="grid grid-flow-row">
            <div class="w-full h-full bg-white border-gray-700 border-[1px] rounded-[2.5px] text-center transition"
                v-for="col in size" @mousedown.left="paint(col - 1, row - 1, $event.target)" @mousedown.right="">
            </div>
        </div>
    </main>
</template>