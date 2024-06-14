<script setup>
import BasicInput from '@/components/ui/inputs/BasicInput.vue'
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { postSignUp } from '@/services/userService.js';

const router = useRouter();
const userExists = ref(false);
const form = reactive({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
});

const onSubmit = () => {
    postSignUp(form.email, form.username, form.password)
        .then(() => { router.push('/logowanie'); })
        .catch(() => { userExists = true; });
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <BasicInput v-model="form.username" placeholder="Nazwa użytkownika" />
      <BasicInput v-model="form.email" placeholder="Email" />
      <BasicInput v-model="form.password" placeholder="Hasło" type="password" autocomplete="off" />
      <BasicInput v-model="form.confirmPassword" placeholder="Powtórz hasło" type="password" autocomplete="off" />
      <span v-if="userExists" class="error">Użytkownik już istnieje</span>
      <BasicButton btnText="Zarejestruj" type="submit" />
    </form>
    <span class="mx-auto text-lg">Przejdź do
      <a class="cursor-pointer hover:underline text-slate-300"
         @click="router.push({ name: 'SignIn' })"><b>strony logowania</b>
      </a>
    </span>
  </div>
</template>

<style scoped>
.form-container {
  @apply 
  flex 
  flex-col 
  gap-10;
}
form {
  @apply 
  grid 
  gap-4 
  justify-items-center 
  w-fit 
  mx-auto 
  mt-9;
}
.error {
  @apply 
  text-red-500/70 
  text-xl;
}
</style>