<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <div class="header">
        {{ route.meta.title }}
    </div>
</template>

<style scoped>
.header {
    @apply 
    h-14 
    mb-4 
    p-2
    w-full 
    mx-auto 
    bg-gray-700/40 
    border-gray-700 
    rounded-lg 
    rounded-ss-xl 
    rounded-ee-xl
    text-3xl 
    text-center
    font-thin 
    font-sans 
    select-none;
}
</style>