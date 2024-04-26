<script setup>
defineProps([
    'clues'
]);
</script>

<template>
    <div class="bg-gray-600 p-1 rounded-sm w-fit flex flex-col gap-[1.5px] rounded-es-2xl border-l-4 border-gray-700">
        <div v-for="ans in clues" class="mx-[3px] flex justify-end items-center">
            <div class="h-10 rounded-sm text-center text-white flex items-center">
                <div v-for="single in ans" class="text-xl">
                    <p>&nbsp;{{ single }}&nbsp;</p>
                </div>
            </div>
        </div>
    </div>
</template>