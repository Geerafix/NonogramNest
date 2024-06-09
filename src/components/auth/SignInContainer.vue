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
  <div class="flex flex-col gap-6">
    <form class="grid gap-4 justify-items-center w-fit mx-auto mt-20" @submit.prevent="onSubmit">
      <BasicInput v-model="userData.username" placeholder="Login lub Email" />
      <BasicInput v-model="userData.password" placeholder="Hasło" type="password" autocomplete="off" />
      <span v-if="error" class="text-red-500/70 text-xl">Nieprawidłowe dane logowania</span>
      <BasicButton btnText="Zaloguj" type="submit" />
    </form>
    <span class="mx-auto">Nie masz konta?
      <a class="cursor-pointer hover:underline"
         @click="router.push({ name: 'SignUp' })"><b>Zarejestruj się</b>
      </a>
    </span>
  </div>
</template>