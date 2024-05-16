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
    return (width.value > height.value * 1.5) ? 1 : 0
});

</script>

<template>
    <button ref="btn" class="
    grid
    grid-cols-[56px_auto]
    w-full
    h-[56px]
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
    text-lg
    antialiased
    tracking-wide
    select-none
    text-left
    text-nowrap
    overflow-hidden">
        <slot></slot>
        <span class="transition-all my-auto -ml-2" :style="{ opacity: computedWidth }">
            {{ btnText }}
        </span>
    </button>
</template>