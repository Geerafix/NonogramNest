<script setup>
import BasicInput from '@/UIcomponents/inputs/BasicInput.vue'
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

let userData = reactive({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
});

const router = useRouter();

const register = (event) => {
    event.preventDefault();
    axios({ method: 'POST', url: 'http://localhost:3000/users', data: { email: userData.email, username: userData.username, password: userData.password }});
    router.push('/graj');
};
</script>

<template>
    <form class="grid gap-4 w-fit mx-auto mt-20 justify-items-center" v-on:submit="register($event)">
        <BasicInput placeholder="Login" v-model="userData.email"></BasicInput>
        <BasicInput placeholder="Email" v-model="userData.username"></BasicInput>
        <BasicInput placeholder="Hasło" type="password" v-model="userData.password"></BasicInput>
        <BasicInput placeholder="Powtórz hasło" type="password" v-model="userData.confirmPassword"></BasicInput>
        <BasicButton btnText="Zarejestruj" type="submit"></BasicButton>
    </form>
</template>