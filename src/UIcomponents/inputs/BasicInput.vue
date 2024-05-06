<script setup>
import { ref } from 'vue';

defineProps([
    'placeholder',
    'type'
]);

let value = ref('');

</script>

<template>
    <input class="
    w-60
    h-12
    px-3 
    py-[10px] 
    text-2xl
    border-b-4
    border-gray-400
    bg-gray-100
    rounded-xl
    text-slate-900
    transition-all
    ring-gray-600
    focus:rounded-xl
    focus:outline-0
    focus:ring-4
    focus:border-0
    focus:ring-gray-500"
    v-model="value"
    :placeholder="placeholder"
    :type="type">
</template>