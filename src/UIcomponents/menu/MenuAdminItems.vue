<script setup>
import MenuButton from '../inputs/MenuButton.vue';
</script>

<template>
    <MenuButton btnText="Użytkownicy" @click="">
        <Icon icon="fa-solid fa-users" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton btnText="Gry" @click="">
        <Icon icon="fa-solid fa-gamepad" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton btnText="Osiągnięcia" @click="">
        <Icon icon="fa-solid fa-star" class="my-auto mx-auto" />
    </MenuButton>
    <MenuButton btnText="Wiadomości" @click="">
        <Icon icon="fa-solid fa-message" class="my-auto mx-auto" />
    </MenuButton> 
</template>
