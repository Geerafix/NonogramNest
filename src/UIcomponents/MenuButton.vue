<script setup>
defineProps([
    'btnText',
    'vis',
    'op'
]);
</script>

<template>
    <button class="
    grid
    grid-cols-[57px_auto]
    w-full
    h-[57px]
    bg-gray-700
    text-slate-200  
    rounded-xl
    transition-[background-color_border-radius]
    hover:bg-gray-800
    hover:text-white
    hover:shadow-lg
    hover:shadow-gray-600/10
    hover:rounded-[20px]
    font-thin
    font-sans
    text-xl
    antialiased
    tracking-wide
    select-none
    text-left
    text-nowrap
    overflow-hidden">
    <slot></slot>
    <span class="transition-all my-auto -ml-2" 
        :style="{ visibility: vis, opacity: op }"
        v-text="btnText">
    </span>
    </button>
</template>