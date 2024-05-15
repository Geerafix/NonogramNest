<script setup>
import BasicInput from '@/UIcomponents/inputs/BasicInput.vue'
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { postSignIn } from '@/services/usersService.js'

const error = ref(false);
const router = useRouter();
const userData = reactive({
    username: '',
    password: ''
});

const onSubmit = () => {
    postSignIn(userData.username, userData.password)
    .then(res => { 
        router.push('/graj'); 
    })
    .catch(err => { error.value = true; });
};
</script>

<template>
    <form class="grid gap-4 w-fit mx-auto mt-20 justify-items-center" @submit.prevent="onSubmit">
        <BasicInput placeholder="Login lub Email" v-model="userData.username"></BasicInput>
        <BasicInput placeholder="Hasło" type="password" v-model="userData.password"></BasicInput>
        <span v-if="error" class="text-red-500/70 text-xl">Nieprawidłowe dane logowania</span>
        <BasicButton btnText="Zaloguj" type="submit"></BasicButton>
    </form>
</template>