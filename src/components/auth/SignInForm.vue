<script setup>
import BasicInput from '@/components/ui/inputs/BasicInput.vue'
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { postSignIn } from '@/services/userService.js';

const router = useRouter();
const form = reactive({
  login: '',
  password: ''
});

const onSubmit = async () => {  
    await postSignIn(form.login, form.password)
      .then(() => { router.go(); })
      .catch(() => {  });
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <BasicInput v-model="form.login" placeholder="Login lub Email" />

      <BasicInput v-model="form.password" placeholder="Hasło" type="password" autocomplete="off" />

      <BasicButton btnText="Zaloguj" type="submit" />

    </form>
    <span class="mx-auto text-lg">Nie masz konta?
      <a class="cursor-pointer hover:underline text-slate-300"
         @click="router.push({ name: 'SignUp' })"><b>Zarejestruj się</b>
      </a>
    </span>
  </div>
</template>

<style scoped>
.form-container {
  @apply flex flex-col gap-10;
}
form {
  @apply grid gap-4 justify-items-center w-fit mx-auto mt-9;
}
.error {
  @apply text-red-500/70 text-xl;
}
</style>