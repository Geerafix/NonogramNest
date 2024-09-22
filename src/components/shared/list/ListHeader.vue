<script setup>
defineProps(['headerName']);
</script>

<template>
    <div class="header">
        <span>{{ headerName }}</span>
    </div>
</template>

<style scoped>
.header {
    @apply 
    h-12
    bg-gray-600 
    rounded-md 
    content-center
    text-2xl 
    text-center
    select-none;
}
</style>