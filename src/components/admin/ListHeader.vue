<script setup>
defineProps(['headerName']);
</script>

<template>
    <div class="header-container">
        <span class="header-name">{{ headerName }}</span>
    </div>
</template>

<style scoped>
.header-container {
    @apply 
    grid 
    w-full 
    h-11
    bg-gray-600 
    rounded-md 
    text-center;
}
.header-name {
    @apply 
    self-center 
    text-xl 
    select-none;
}
</style>