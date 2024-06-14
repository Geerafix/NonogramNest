<script setup>
defineProps([
    'clues'
]);
</script>

<template>
    <div class="xclues-container">
        <div v-for="ans in clues" class="content-end">
            <div class="flex flex-col w-10 rounded-sm text-center text-white">
                <div v-for="single in ans" class="text-xl">
                    <p>{{ single }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.xclues-container {
    @apply 
    flex 
    gap-px 
    p-1 
    bg-gray-600 
    border-gray-700 
    border-t-4 
    rounded-sm 
    rounded-se-2xl
}
</style>