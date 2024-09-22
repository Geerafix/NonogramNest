<script setup>
import MenuButton from '../inputs/MenuButton.vue';
</script>

<template>
    <MenuButton buttonText="Użytkownicy" @click="$router.push({ name: 'ManageUsers' })">
        <Icon icon="fa-solid fa-users" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton buttonText="Gry" @click="$router.push({ name: 'ManagePuzzles' })">
        <Icon icon="fa-solid fa-gamepad" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton buttonText="Osiągnięcia" @click="$router.push({ name: 'ManageAchievements' })">
        <Icon icon="fa-solid fa-star" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton buttonText="Wiadomości" @click="$router.push({ name: 'AdminMessages' })">
        <Icon icon="fa-solid fa-message" class="my-auto mx-auto" />
    </MenuButton> 
</template>
