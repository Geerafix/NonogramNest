<script setup>
import MenuButton from '../MenuButton.vue';
</script>

<template>
    <MenuButton btnText="Użytkownicy" @click="$router.push('/uzytkownicy')">
        <Icon icon="fa-solid fa-users" class="my-auto mx-auto"/>
    </MenuButton>
</template>
