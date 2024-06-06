<script setup>
import { ref } from 'vue';

defineProps([
    'attributeName',
    'attributeVal'
]);

const overUser = ref(false);
</script>

<template>
    <div class="grid gap-2 text-center cursor-pointer"
    :style="{ filter: overUser ? 'brightness(1.3)' : 'brightness(1)' }" @mouseover="overUser = true" @mouseleave="overUser = false">
        <span class="w-full bg-gray-700 p-1 rounded-md">{{ attributeName }}</span>
        <span class="w-full bg-gray-700/40 p-1 rounded-md">{{ attributeVal }}</span>
    </div>
</template>