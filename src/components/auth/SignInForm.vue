<script setup>
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {postSignIn} from '@/services/authService.js';
import {useAsyncValidator} from '@vueuse/integrations/useAsyncValidator';
import {useNotification} from "@/composables/useNotification.js";

const router = useRouter();
const form = reactive({
  login: '',
  password: ''
});
const rules = {
  login: {
    required: true,
    message: 'Login jest wymagany'
  },
  password: {
    required: true,
    message: 'Hasło jest wymagane'
  }
}
const {pass} = useAsyncValidator(form, rules);
const {notify} = useNotification();

const onSubmit = async () => {
  await postSignIn(form.login, form.password)
      .then(() => {
        router.push('/');
      })
      .catch(() => {
        notify(false, 'Nieprawidłowe dane logowania.');
      });
};
</script>

<template>
  <div class="signin-container">
    <form @submit.prevent="onSubmit">
      <BasicInput v-model="form.login" placeholder="Login lub Email"/>
      <BasicInput v-model="form.password" placeholder="Hasło" type="password" autocomplete="off"/>
      <BasicButton buttonText="Zaloguj" type="submit" :class="{'opacity-50': !pass}" :disabled="!pass">
        <Icon icon="fa-solid fa-right-to-bracket" class="my-auto ml-px"/>
      </BasicButton>
    </form>
    <span class="mx-auto text-xl">
      Nie masz konta?
      <a class="register-link"
         @click="router.push({ name: 'SignUp' })"><b>Zarejestruj się</b>
      </a>
    </span>
  </div>
</template>

<style scoped>
.signin-container {
  @apply
  grid
  pt-2
  gap-10;
}

form {
  @apply
  grid
  gap-4
  justify-items-center
  w-fit
  mx-auto;
}

.register-link {
  @apply
  text-slate-300
  cursor-pointer
  hover:underline;
}
</style>