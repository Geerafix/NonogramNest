<script setup>
import { ref, computed } from 'vue';
import { useElementSize } from '@vueuse/core'

defineProps([
    'btnText',
    'op'
]);

const btn = ref(null);
const { width, height } = useElementSize(btn);

const computedWidth = computed(() => {
    return (width.value > height.value * 1.5) ? 1 : 0;
});

</script>

<template>
    <button ref="btn" class="menu-button">
        <slot></slot>
        <span class="mr-2" 
            :style="{ opacity: computedWidth }">
            {{ btnText }}
        </span>
    </button>
</template>

<style>
.menu-button {
    @apply
    grid
    grid-cols-[56px_auto]
    w-full
    min-w-14
    h-14
    rounded-xl
    bg-gray-700
    text-slate-200  
    hover:bg-gray-800
    hover:text-white
    hover:shadow-gray-700/50
    hover:shadow-md
    hover:rounded-[18px]
    transition-[background-color_border-radius]
    select-none
    font-thin
    font-sans
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
    transition-[opacity] 
    duration-[270ms]
}
</style>