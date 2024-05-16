<script setup>
defineProps([
    'btnText'
]);
</script>

<template>
    <button class="
    px-3 
    py-[10px] 
    bg-blue-500/90
    border-blue-900/60
    text-slate-200  
    rounded-xl
    border-b-4 
    transition-[background-color_border-radius]
    hover:bg-blue-400/90
    hover:border-slate-800/60
    hover:text-white
    hover:shadow-lg
    hover:shadow-blue-600/10
    hover:rounded-[20px]
    text-2xl
    antialiased
    tracking-wide
    select-none
    max-w-min
    text-nowrap">
        {{ btnText }}
    </button>
</template>