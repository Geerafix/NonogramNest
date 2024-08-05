<script setup>
import BasicInput from '@/components/ui/inputs/BasicInput.vue'
import BasicButton from '@/components/ui/inputs/BasicButton.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { postSignUp } from '@/services/userService.js';
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'; 

const router = useRouter();
const error = ref(false);
const form = reactive({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
});
const rules = {
  email: {
    type: 'email',
    required: true,
  },
  username: {
    min: 5, max: 20,
    required: true
  },
  password: {
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,;:=+<>]).{8,}$/,
    required: true,
  },
  confirmPassword: {
    validator: (rule, value) => value === form.password,
    required: true,
  }
}
const { pass } = useAsyncValidator(form, rules);

const onSubmit = () => {
    postSignUp(form.email, form.username, form.password)
        .then(() => { router.push('/logowanie'); })
        .catch(() => { error.value = true; });
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <BasicInput v-model="form.username" placeholder="Nazwa użytkownika" />
      <BasicInput v-model="form.email" placeholder="Email" />
      <BasicInput v-model="form.password" placeholder="Hasło" type="password" autocomplete="off" />
      <BasicInput v-model="form.confirmPassword" placeholder="Powtórz hasło" type="password" autocomplete="off" />
      <span v-if="error" class="error">Użytkownik już istnieje</span>
      <BasicButton buttonText="Zarejestruj" type="submit" :class="{'opacity-50': !pass}" :disabled="!pass" />
    </form>
    <span class="mx-auto text-lg">
      Przejdź do
      <a class="login-link"
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
.login-link {
  @apply 
  text-slate-300
  cursor-pointer 
  hover:underline; 
}
</style>