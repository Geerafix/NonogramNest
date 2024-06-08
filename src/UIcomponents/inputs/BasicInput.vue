<script setup>
import { ref } from 'vue';

defineProps([
    'placeholder',
    'type'
]);

const value = ref('');
</script>

<template>
    <input class="basic-input" v-model="value" :placeholder="placeholder" :type="type">
</template>

<style scoped>
.basic-input {
    @apply
    w-60
    h-12
    px-3 
    py-[10px] 
    border-b-4
    rounded-xl
    bg-gray-100
    border-gray-400
    text-slate-900
    ring-gray-600
    focus:ring-gray-500
    focus:rounded-xl
    focus:outline-0
    focus:border-0
    focus:ring-4
    transition-all
    text-2xl
    text-center;
}
</style>