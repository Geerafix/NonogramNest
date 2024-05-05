<script setup>
import MenuButton from '../MenuButton.vue';
</script>

<template>
    <MenuButton btnText="Graj" @click="$router.push('/graj')">
        <Icon icon="fa-solid fa-gamepad" class="my-auto mx-auto"/>
    </MenuButton>
    <MenuButton btnText="Wyzwanie" @click="$router.push('/wyzwanie')">
        <Icon icon="fa-solid fa-calendar-days" class="my-auto mx-auto"/>
    </MenuButton>
    <MenuButton btnText="Kreator" @click="$router.push('/kreator')">
        <Icon icon="fa-solid fa-plus" class="my-auto mx-auto"/>
    </MenuButton>
    <MenuButton btnText="Ranking" @click="$router.push('/ranking')">
        <Icon icon="fa-solid fa-chart-simple" class="my-auto mx-auto"/>
    </MenuButton>
    <MenuButton btnText="Profil" @click="$router.push('/profil')">
        <Icon icon="fa-solid fa-user" class="my-auto mx-auto"/>
    </MenuButton>
</template>
