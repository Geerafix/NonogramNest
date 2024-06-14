<script setup>
defineProps([
    'clues'
]);
</script>

<template>
    <div class="yclues-container">
        <div v-for="ans in clues" class="flex justify-end items-center mx-[3px]">
            <div class="flex items-center h-10 rounded-sm text-center text-white">
                <div v-for="single in ans" class="text-xl">
                    <p>&nbsp;{{ single }}&nbsp;</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.yclues-container {
    @apply 
    flex 
    flex-col 
    w-fit 
    gap-px 
    p-1 
    bg-gray-600 
    border-gray-700 
    border-l-4 
    rounded-sm 
    rounded-es-2xl
}
</style>