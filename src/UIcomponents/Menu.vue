<script setup>
import MenuButton from './MenuButton.vue';
import { ref } from 'vue';

let navbar = ref();
let navbarWidth = ref(80);
let vis = ref('hidden');
let op = ref(0);

function expand() { 
    navbarWidth.value = 180; 
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
        <MenuButton btnText="Graj" :vis="vis" :op="op" @click="$router.push('/')">
            <FAIcon icon="fa-solid fa-gamepad" class="my-auto mx-auto"/>
        </MenuButton>
        <MenuButton btnText="Wyzwanie" :vis="vis" :op="op" @click="$router.push('/wyzwanie')">
            <FAIcon icon="fa-solid fa-calendar-days" class="my-auto mx-auto"/>
        </MenuButton>
        <MenuButton btnText="Kreator" :vis="vis" :op="op" @click="$router.push('/kreator')">
            <FAIcon icon="fa-solid fa-plus" class="my-auto mx-auto"/>
        </MenuButton>
        <MenuButton btnText="Ranking" :vis="vis" :op="op" @click="$router.push('/ranking')">
            <FAIcon icon="fa-solid fa-chart-simple" class="my-auto mx-auto"/>
        </MenuButton>
        <MenuButton btnText="Profil" :vis="vis" :op="op" @click="$router.push('/profil')">
            <FAIcon icon="fa-solid fa-user" class="my-auto mx-auto"/>
        </MenuButton>
        <MenuButton btnText="Wyloguj" :vis="vis" :op="op" @click="" class="mt-auto">
            <FAIcon icon="fa-solid fa-door-open" class="my-auto mx-auto"/>
        </MenuButton>
    </div>
</template>
