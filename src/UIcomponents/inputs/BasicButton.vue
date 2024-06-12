<script setup>
defineProps([ 'btnText' ]);
</script>

<template>
    <button class="basic-button">
        {{ btnText }}
        <slot></slot>
    </button>
</template>

<style scoped>
.basic-button {
    @apply
    px-3 
    py-[10px] 
    min-w-14
    border-b-4 
    rounded-xl
    bg-blue-500/90
    border-slate-800/60
    text-slate-200  
    hover:bg-blue-400/90
    hover:text-white
    hover:shadow-gray-600/10
    hover:shadow-lg
    hover:rounded-[20px]
    transition-[background-color_border-radius]
    select-none
    text-2xl
    text-nowrap
    tracking-wide;
}
</style>