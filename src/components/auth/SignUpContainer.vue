<script setup>
import BasicInput from '@/UIcomponents/inputs/BasicInput.vue'
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
</script>

<template>
    <form class="grid gap-4 w-fit mx-auto mt-20 justify-items-center">
        <BasicInput placeholder="Login"></BasicInput>
        <BasicInput placeholder="Email"></BasicInput>
        <BasicInput placeholder="Hasło" type="password"></BasicInput>
        <BasicInput placeholder="Powtórz hasło" type="password"></BasicInput>
        <BasicButton btnText="Zarejestruj" @click="$router.push('/graj')"></BasicButton>
    </form>
</template>