<script setup>
import BasicInput from '@/UIcomponents/inputs/BasicInput.vue'
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { postSignUp } from '@/services/userService.js';

const error = ref(false);
const router = useRouter();
const userData = reactive({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
});

const onSubmit = () => {
    postSignUp(userData.email, userData.username, userData.password)
        .then((res) => { router.push('/logowanie'); })
        .catch((err) => { error.value = true; });
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <form class="grid gap-4 justify-items-center w-fit mx-auto mt-20" @submit.prevent="onSubmit">
      <BasicInput v-model="userData.username" placeholder="Login" />
      <BasicInput v-model="userData.email" placeholder="Email" />
      <BasicInput v-model="userData.password" placeholder="Hasło" type="password" autocomplete="off" />
      <BasicInput v-model="userData.confirmPassword" placeholder="Powtórz hasło" type="password" autocomplete="off" />
      <span v-if="error" class="text-red-500/70 text-xl">Użytkownik już istnieje</span>
      <BasicButton btnText="Zarejestruj" type="submit" />
    </form>
    <span class="mx-auto">Przejdź do
      <a class="cursor-pointer hover:underline"
         @click="router.push({ name: 'SignIn' })"><b>strony logowania</b>
      </a>
    </span>
  </div>
</template>