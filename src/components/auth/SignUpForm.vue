<script setup>
import BasicInput from '@/components/shared/inputs/BasicInput.vue'
import BasicButton from '@/components/shared/inputs/BasicButton.vue';
import IconValid from "@/components/auth/IconValid.vue";
import IconInvalid from "@/components/auth/IconInvalid.vue";
import TrailingBox from "@/components/shared/TrailingBox.vue";
import {useRouter} from 'vue-router';
import {postSignUp} from '@/services/authService.js';
import {useTrailingBox} from "@/composables/useTrailingBox.js";
import {useAsyncValidator} from '@vueuse/integrations/useAsyncValidator';
import {reactive, ref} from 'vue';

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
    type: 'email', required: true,
    message: 'Niepoprawny format adresu e-mail.'
  },
  username: {
    min: 5, max: 20, required: true,
    message: 'Nazwa musi mieć od 5 do 20 znaków.'
  },
  password: {
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,;:=+<>]).{8,}$/, required: true,
    message: 'Hasło musi zawierać co najmniej 8 znaków, w tym wielkie i małe litery, cyfry oraz znaki specjalne.'
  },
  confirmPassword: {
    validator: (rule, value) => value === form.password, required: true,
    message: 'Hasła nie zgadzają się.'
  }
}
const {pass, errorFields} = useAsyncValidator(form, rules);
const {showBox, hideBox, message, isHovered} = useTrailingBox();

const onSubmit = () => {
  postSignUp(form.email, form.username, form.password)
    .then(() => {
      router.push('/logowanie');
    })
    .catch(() => {
      error.value = true;
    });
};
</script>

<template>
  <div class="signup-container">
    <form @submit.prevent="onSubmit">
      <div class="fields">
        <BasicInput v-model="form.username" placeholder="Nazwa użytkownika"/>
        <component :is="errorFields?.username ? IconInvalid : IconValid"
            @mouseover="showBox(rules.username.message)" @mouseleave="hideBox"/>

        <BasicInput v-model="form.email" placeholder="Email"/>
        <component :is="errorFields?.email ? IconInvalid : IconValid"
            @mouseover="showBox(rules.email.message)" @mouseleave="hideBox"/>

        <BasicInput v-model="form.password" placeholder="Hasło" type="password" autocomplete="off"/>
        <component :is="errorFields?.password ? IconInvalid : IconValid"
            @mouseover="showBox(rules.password.message)" @mouseleave="hideBox"/>

        <BasicInput v-model="form.confirmPassword" placeholder="Potwierdź hasło" type="password" autocomplete="off"/>
        <component v-if="(!errorFields?.password)" :is="(errorFields?.confirmPassword) ? IconInvalid : IconValid"
                   @mouseover="showBox(rules.confirmPassword.message)" @mouseleave="hideBox"/>
      </div>
      <span v-if="error" class="error">Użytkownik już istnieje</span>
      <BasicButton buttonText="Zarejestruj" type="submit" :class="{'opacity-50': !pass}" :disabled="!pass"/>
    </form>
    <span class="mx-auto text-lg">
      Przejdź do
      <a class="login-link" @click="router.push({ name: 'SignIn' })"><b>strony logowania</b></a>
    </span>
    <TrailingBox :message="message" :isHovered="isHovered"/>
  </div>
</template>

<style scoped>
.signup-container {
  @apply
  flex
  flex-col
  w-fit
  mx-auto
  p-2
  rounded-2xl
  gap-10;
}

form {
  @apply
  grid
  gap-4
  justify-items-center
  w-fit
  mx-auto
}

.fields {
  @apply
  grid
  grid-cols-[1fr_0]
  gap-4
  [&>*]:my-auto
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