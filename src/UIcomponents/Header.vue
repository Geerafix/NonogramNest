<script setup>

</script>

<template>
    <div class="header-container">
        <div class="header-name">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.header-container {
    @apply text-white bg-gray-700/40 p-2 border-gray-700 rounded-lg rounded-ss-xl rounded-ee-xl;
}
.header-name {
    @apply w-fit relative mx-auto text-3xl font-thin font-sans select-none;
}
</style>