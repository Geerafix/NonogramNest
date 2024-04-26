<script setup>
defineProps([
    'size', 'paint'
]);
</script>

<template>
    <div class="bg-gray-700 rounded-sm p-1 grid grid-flow-col">
        <div v-for="row in size" class="grid grid-flow-row">
            <div class="w-full h-full border-gray-700 border-[1px] rounded-sm bg-white text-center transition"
                v-for="col in size" @mousedown.left="paint(col - 1, row - 1, $event.target)">
            </div>
        </div>
    </div>
</template>