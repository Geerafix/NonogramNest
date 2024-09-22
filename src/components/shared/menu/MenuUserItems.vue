<script setup>
import MenuButton from '../inputs/MenuButton.vue';
</script>

<template>
    <MenuButton buttonText="Graj" @click="$router.push({ name: 'Play' })">
        <Icon icon="fa-solid fa-gamepad" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton buttonText="Wyzwanie" @click="$router.push({ name: 'Challenge' })">
        <Icon icon="fa-solid fa-calendar-days" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton buttonText="Kreator" @click="$router.push({ name: 'Creator' })">
        <Icon icon="fa-solid fa-square-plus" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton buttonText="Ranking" @click="$router.push({ name: 'Rating' })">
        <Icon icon="fa-solid fa-chart-simple" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton buttonText="Osiągnięcia" @click="$router.push({ name: 'Achievements' })">
        <Icon icon="fa-solid fa-star" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton buttonText="Profil" @click="$router.push({ name: 'Profile' })">
        <Icon icon="fa-solid fa-user" class="my-auto mx-auto" />
    </MenuButton>
</template>
