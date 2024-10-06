<script setup>
import BasicInput from '@/components/shared/inputs/BasicInput.vue'
import BasicButton from '@/components/shared/inputs/BasicButton.vue';
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {postSignIn} from '@/services/userService.js';
import {useAsyncValidator} from '@vueuse/integrations/useAsyncValidator';

const router = useRouter();
const error = ref(false);
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

const onSubmit = async () => {
  await postSignIn(form.login, form.password)
      .then(() => {
        router.go('/');
      })
      .catch(() => {
        error.value = true;
      });
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <BasicInput v-model="form.login" placeholder="Login lub Email"/>
      <BasicInput v-model="form.password" placeholder="Hasło" type="password" autocomplete="off"/>
      <BasicButton buttonText="Zaloguj" type="submit" :class="{'opacity-50': !pass}" :disabled="!pass"/>
      <span v-if="error" class="error">Nieprawidłowe dane logowania</span>
    </form>
    <span class="mx-auto text-lg">
      Nie masz konta?
      <a class="register-link"
         @click="router.push({ name: 'SignUp' })"><b>Zarejestruj się</b>
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

.register-link {
  @apply
  text-slate-300
  cursor-pointer
  hover:underline;
}
</style>