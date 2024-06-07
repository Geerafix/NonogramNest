<script setup>
import { ref } from 'vue';
const overUser = ref(false);
</script>

<template>
    <div class="grid grid-cols-[1fr_30%_30%_1fr] gap-2 items-center text-center cursor-pointer transition ease-[1s]"
    :style="{ filter: overUser ? 'brightness(1.3)' : 'brightness(1)' }" 
    @mouseover="overUser = true" @mouseleave="overUser = false">
        <slot></slot>
    </div>
</template>