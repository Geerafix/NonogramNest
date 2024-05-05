<script setup>
defineProps([
    'clues'
]);
</script>

<template>
    <div class="bg-gray-600 p-1 rounded-sm flex gap-[1.5px] rounded-se-2xl border-t-4 border-gray-700">
        <div v-for="ans in clues" class="content-end">
            <div class="w-10 rounded-sm text-center text-white flex flex-col">
                <div v-for="single in ans" class="text-xl">
                    <p>{{ single }}</p>
                </div>
            </div>
        </div>
    </div>
</template>