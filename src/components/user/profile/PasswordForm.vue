<script setup>
import IconValid from "@/components/auth/IconValid.vue";
import IconInvalid from "@/components/auth/IconInvalid.vue";
import TrailingBox from "@/components/shared/TrailingBox.vue";
import {set} from "@vueuse/core";
import {reactive, ref, watch} from "vue";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {updatePassword} from "@/services/userService.js";
import {useTrailingBox} from "@/composables/useTrailingBox.js";

const emit = defineEmits(['accept', 'reject']);

const form = reactive({currentPassword: '', newPassword: '', confirmPassword: ''});
const rules = {
  currentPassword: {
    required: true
  },
  newPassword: {
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,;:=+<>]).{8,}$/, required: true,
    message: 'Hasło musi zawierać co najmniej 8 znaków, w tym wielkie i małe litery, cyfry oraz znaki specjalne.'
  },
  confirmPassword: {
    validator: (rule, value) => value === form.newPassword, required: true,
    message: 'Hasła nie zgadzają się.'
  }
}
const {pass, errorFields} = useAsyncValidator(form, rules);
const wasChecked = ref(false);
const invalidPassword = 'Nieprawidłowe hasło.';

const {showBox, hideBox, message, isHovered} = useTrailingBox();

const accept = async () => {
  if (pass.value) {
    await updatePassword(form.currentPassword, form.newPassword)
        .then((_) => emit('accept', true, 'Zmieniono hasło'))
        .catch((_) => emit('accept', false, 'Aktualne hasło jest nieprawidłowe.'));
  }
};

watch(() => form.currentPassword, () => {
  if (wasChecked) set(wasChecked, false);
});

const reject = () => (emit('reject'));
</script>

<template>
  <div>
    <div class="profile-form-container">
      <div class="fields">
        <div class="field">
          <div>
            <span>Aktualne hasło</span>
            <IconInvalid v-if="wasChecked" @mouseleave="hideBox" @mouseover="showBox(invalidPassword)"/>
            <IconValid v-else-if="form.currentPassword.length > 0 && !wasChecked"/>
            <span v-else></span>
          </div>
          <BasicInput v-model="form.currentPassword" placeholder="Aktualne hasło..." type="password"/>
        </div>
        <div class="field">
          <div>
            <span>Nowe hasło</span>
            <component :is="errorFields?.newPassword ? IconInvalid : IconValid"
                       @mouseleave="hideBox" @mouseover="showBox(rules.newPassword.message)"/>
          </div>
          <BasicInput v-model="form.newPassword" placeholder="Nowe hasło..." type="password"/>
        </div>
        <div class="field">
          <div>
            <span>Potwierdź hasło</span>
            <component :is="errorFields?.confirmPassword ? IconInvalid : IconValid" v-if="!errorFields?.newPassword"
                       @mouseleave="hideBox" @mouseover="showBox(rules.confirmPassword.message)"/>
          </div>
          <BasicInput v-model="form.confirmPassword" placeholder="Potwierdź hasło..." type="password"/>
        </div>
      </div>
      <div class="profile-form-actions">
        <BasicButton @click="reject">
          <Icon icon="fa-solid fa-xmark"/>
        </BasicButton>
        <BasicButton :class="[{'opacity-50': !pass}, '!bg-teal-900']" :disabled="!pass" @click="accept">
          <Icon icon="fa-solid fa-check"/>
        </BasicButton>
      </div>
    </div>
    <TrailingBox :isHovered="isHovered" :message="message"/>
  </div>
</template>

<style scoped>
.fields {
  @apply
  grid
  gap-4
  [&_*]:my-auto
}

.field {
  @apply
  grid
  gap-2
  [&>div]:flex
  [&>div]:justify-between
}
</style>