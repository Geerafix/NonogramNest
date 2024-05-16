<script setup>
import { ref } from 'vue'
defineProps([
    'msg',
    'status'
]);

</script>

<template>
    <div class="
        absolute
        top-3
        right-3
        px-4 
        py-[8px] 
        border-b-4 
        rounded-xl
        bg-green-700/85
        border-green-950/50
        text-slate-200   
        select-none
        transition-all
        opacity-0
        font-thin
        font-sans
        text-2xl
        tracking-wide"
        :style="{ backgroundColor: status ? 'green' : 'red' }">
        {{ msg }}
    </div>
</template>