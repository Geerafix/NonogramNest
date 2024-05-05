<script setup>
import { ref } from 'vue'
defineProps([
    'msg',
    'status'
]);

</script>

<template>
    <div class="
        px-4 
        py-[8px] 
        bg-green-700/85
        border-green-950/50
        text-slate-200   
        rounded-xl
        border-b-4 
        transition-all
        font-thin
        font-sans
        text-2xl
        tracking-wide
        select-none
        absolute
        opacity-0
        top-3
        right-3"
        :style="{ backgroundColor: status ? 'green' : 'red' }">
        {{ msg }}
    </div>
</template>