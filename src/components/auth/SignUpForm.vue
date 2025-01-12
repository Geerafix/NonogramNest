<script setup>
import IconValid from "@/components/auth/IconValid.vue";
import IconInvalid from "@/components/auth/IconInvalid.vue";
import TrailingBox from "@/components/shared/TrailingBox.vue";
import {useRouter} from 'vue-router';
import {postSignUp} from '@/services/authService.js';
import {useTrailingBox} from "@/composables/useTrailingBox.js";
import {useAsyncValidator} from '@vueuse/integrations/useAsyncValidator';
import {reactive} from 'vue';
import {useNotification} from "@/composables/useNotification.js";

const router = useRouter();
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
const {notify} = useNotification()

const onSubmit = () => {
  postSignUp(form.email, form.username, form.password)
      .then(() => {
        router.push('/logowanie');
        notify(true, 'Zarejestrowano.', 4000);
      })
      .catch(() => {
        notify(false, 'Nazwa lub Email już istnieje.', 4000);
      });
};
</script>

<template>
  <div class="signup-container">
    <form @submit.prevent="onSubmit">
      <div class="fields">
        <BasicInput v-model="form.username" placeholder="Nazwa użytkownika"/>
        <component :is="errorFields?.username ? IconInvalid : IconValid"
                   @mouseleave="hideBox" @mouseover="showBox(rules.username.message)"/>

        <BasicInput v-model="form.email" placeholder="Email"/>
        <component :is="errorFields?.email ? IconInvalid : IconValid"
                   @mouseleave="hideBox" @mouseover="showBox(rules.email.message)"/>

        <BasicInput v-model="form.password" autocomplete="off" placeholder="Hasło" type="password"/>
        <component :is="errorFields?.password ? IconInvalid : IconValid"
                   @mouseleave="hideBox" @mouseover="showBox(rules.password.message)"/>

        <BasicInput v-model="form.confirmPassword" autocomplete="off" placeholder="Potwierdź hasło" type="password"/>
        <component :is="(errorFields?.confirmPassword) ? IconInvalid : IconValid" v-if="(!errorFields?.password)"
                   @mouseleave="hideBox" @mouseover="showBox(rules.confirmPassword.message)"/>
      </div>
      <BasicButton :class="{'opacity-50': !pass}" :disabled="!pass" buttonText="Zarejestruj" type="submit">
        <Icon class="my-auto ml-1" icon="fa-solid fa-user-plus"/>
      </BasicButton>
    </form>
    <span class="mx-auto text-xl">
      Przejdź do
      <a class="login-link" @click="router.push({ name: 'SignIn' })"><b>strony logowania</b></a>
    </span>
    <TrailingBox :isHovered="isHovered" :message="message"/>
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

.login-link {
  @apply
  text-slate-300
  cursor-pointer
  hover:underline;
}
</style>