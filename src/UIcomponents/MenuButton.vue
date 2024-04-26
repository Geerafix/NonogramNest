<script setup>
defineProps([
    'btnText'
]);
</script>

<template>
    <button class="
    h-
    px-3 
    py-[10px] 
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
    select-none" 
    v-text="btnText">
    </button>
</template>