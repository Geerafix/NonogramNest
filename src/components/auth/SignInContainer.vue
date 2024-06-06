<script setup>
import BasicInput from '@/UIcomponents/inputs/BasicInput.vue'
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { postSignIn } from '@/services/userService.js'

const error = ref(false);
const router = useRouter();
const userData = reactive({
    username: '',
    password: ''
});

const onSubmit = async () => {
    await postSignIn(userData.username, userData.password)
        .then((res) => { router.go(); })
        .catch((err) => { error.value = true; });
};
</script>

<template>
    <form class="grid gap-4 justify-items-center w-fit mx-auto mt-20" @submit.prevent="onSubmit">
        <BasicInput v-model="userData.username" placeholder="Login lub Email" />
        <BasicInput v-model="userData.password" placeholder="Hasło" type="password" autocomplete="off" />
        <span v-if="error" class="text-red-500/70 text-xl">Nieprawidłowe dane logowania</span>
        <BasicButton btnText="Zaloguj" type="submit" />
    </form>
</template>