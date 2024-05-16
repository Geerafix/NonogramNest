<script setup>
import MenuButton from '../inputs/MenuButton.vue';
</script>

<template>
    <MenuButton btnText="Użytkownicy" @click="$router.push({ name: 'Users' })">
        <Icon icon="fa-solid fa-users" class="my-auto mx-auto" />
    </MenuButton>
</template>
