<script setup>
defineProps([
    'btnText'
]);
</script>

<template>
    <button class="
    px-3 
    py-[10px] 
    border-b-4 
    rounded-xl
    bg-blue-500/90
    border-blue-900/60
    text-slate-200  
    hover:bg-blue-400/90
    hover:border-slate-800/60
    hover:text-white
    hover:shadow-blue-600/10
    hover:shadow-lg
    hover:rounded-[20px]
    transition-[background-color_border-radius]
    select-none
    text-2xl
    text-nowrap
    tracking-wide">
        {{ btnText }}
        <slot></slot>
    </button>
</template>