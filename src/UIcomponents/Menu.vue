<script setup>
import MenuButton from './MenuButton.vue';
import { ref } from 'vue';

let navbar = ref();
let navbarWidth = ref(80);
let vis = ref('hidden');
let op = ref(0);

function expand() { 
    navbarWidth.value = 160; 
    vis.value = 'visible';
    op.value = 1;
}
function collapse() { 
    navbarWidth.value = 80; 
    vis.value = 'hidden';
    op.value = 0;
}

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
        hover:border-r-4
        flex
        flex-col
        gap-2"
        :style="{ width: navbarWidth + 'px'}"
        @mouseenter="expand()"
        @mouseleave="collapse()">
        <MenuButton btnText="Test1" :vis="vis" :op="op"></MenuButton>
        <MenuButton btnText="Test2" :vis="vis" :op="op"></MenuButton>
        <MenuButton btnText="Test3" :vis="vis" :op="op"></MenuButton>
        <MenuButton btnText="Test4" :vis="vis" :op="op"></MenuButton>
        <MenuButton btnText="Test5" :vis="vis" :op="op"></MenuButton>
    </div>
</template>
