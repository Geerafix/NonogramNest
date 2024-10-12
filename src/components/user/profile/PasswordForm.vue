<script setup>
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import {reactive, ref} from "vue";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {set} from "@vueuse/core";
import {updatePassword} from "@/services/userService.js";

const emit = defineEmits(['accept', 'reject']);

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const rules = {
  currentPassword: {
    required: false
  },
  newPassword: {
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,;:=+<>]).{8,}$/,
    required: true,
    message: 'Nieprawidłowe nowe hasło'
  },
  confirmPassword: {
    validator: (rule, value) => value === form.newPassword,
    required: true,
    message: 'Hasła nie zgadzają się'
  }
}
const {pass, errorFields} = useAsyncValidator(form, rules);
const wasChecked = ref(false);

const accept = async () => {
  if (pass.value) {
    await updatePassword(form.currentPassword, form.newPassword);
    emit('accept', true, 'Zmieniono hasło');
  } else {
    set(wasChecked, true)
  }
};

const reject = () => {
  emit('reject');
};
</script>

<template>
  <div>
    <div class="profile-form-container">
      <BasicInput placeholder="Aktualne hasło..." type="password" v-model="form.currentPassword"></BasicInput>
      <BasicInput placeholder="Nowe hasło..." type="password" v-model="form.newPassword"></BasicInput>
      <BasicInput placeholder="Potwierdź hasło..." type="password" v-model="form.confirmPassword"></BasicInput>
      <div class="profile-form-actions">
        <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
        <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="errorFields?.newPassword?.length > 0 && wasChecked">
          <span class="profile-form-message" v-if="!pass">{{errorFields?.newPassword[0].message}}</span>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="errorFields?.confirmPassword?.length > 0 && !errorFields?.newPassword && wasChecked">
        <span class="profile-form-message" v-if="!pass">{{errorFields?.confirmPassword[0].message}}</span>
      </div>
    </Transition>
  </div>
</template>