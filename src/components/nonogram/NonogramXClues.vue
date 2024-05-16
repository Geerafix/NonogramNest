<script setup>
defineProps([
    'clues'
]);
</script>

<template>
    <div class="flex flex-col gap-[1.5px] p-1  bg-gray-600 border-gray-700 border-l-4 rounded-sm w-fit rounded-es-2xl">
        <div v-for="ans in clues" class="flex justify-end items-center mx-[3px]">
            <div class="flex items-center h-10 rounded-sm text-center text-white">
                <div v-for="single in ans" class="text-xl">
                    <p>&nbsp;{{ single }}&nbsp;</p>
                </div>
            </div>
        </div>
    </div>
</template>