<script setup>
defineProps([
    'clues'
]);
</script>

<template>
    <div class="xclues-container">
        <div v-for="ans in clues" class="yclues">
            <div class="single-clue">
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
    select-none;
}
.yclues {
    @apply content-end;
}
.single-clue {
    @apply
    flex 
    flex-col 
    w-10 
    rounded-sm 
    text-center;
}
</style>