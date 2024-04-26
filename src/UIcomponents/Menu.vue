<script setup>
import MenuButton from './MenuButton.vue';
import { ref } from 'vue';
let navbar = ref();

function expand() { navbar.value.style.width = '160px'; }
function collapse() { navbar.value.style.width = '80px'; }

</script>

<template>
    <div ref="navbar"
        class="absolute 
        p-[9.5px]
        mt-4
        mb-4
        ml-4 
        w-20 
        h-[calc(100%-32px)]
        bg-gray-600 
        border-gray-700
        rounded-2xl 
        rounded-ss-lg
        rounded-ee-md
        border-s-4
        transition-all
        hover:rounded-2xl
        flex
        flex-col
        gap-2"
        @mouseenter="expand()"
        @mouseleave="collapse()">
        <MenuButton btnText="T1"></MenuButton>
        <MenuButton btnText="T2"></MenuButton>
        <MenuButton btnText="T3"></MenuButton>
        <MenuButton btnText="T4"></MenuButton>
        <MenuButton btnText="T5"></MenuButton>
    </div>
</template>
