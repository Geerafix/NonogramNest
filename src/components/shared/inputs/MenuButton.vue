<script setup>
import { ref, computed } from 'vue';
import { useElementSize } from '@vueuse/core'
defineProps(['buttonText']);

const button = ref(null);
const { width } = useElementSize(button);
const computedWidth = computed(() => width.value > 100 );
</script>

<template>
    <button ref="button" class="menu-button">
        <slot></slot>
        <span :class="[ 'mr-2', 'sm:opacity-0', { 'sm:opacity-100': computedWidth } ]">
            {{ buttonText }}
        </span>
    </button>
</template>

<style>
.menu-button {
    @apply
    grid
    grid-cols-[3.5rem_auto]
    w-full
    h-14
    min-w-14
    rounded-xl
    bg-gray-700
    text-slate-100/90  
    hover:bg-gray-800
    hover:text-white
    hover:shadow-gray-700/50
    hover:shadow-md
    hover:rounded-[1.25rem]
    transition-all
    select-none
    text-lg
    text-left
    text-nowrap
    tracking-wide
    overflow-hidden;
}
.menu-button span {
    @apply 
    -ml-2 
    mr-4
    my-auto 
    transition-all 
    duration-[270ms]
}
</style>