<script setup>
import IconInvalid from "@/components/auth/IconInvalid.vue";
import IconValid from "@/components/auth/IconValid.vue";
import TrailingBox from "@/components/shared/TrailingBox.vue";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {reactive} from "vue";
import {updateEmail} from "@/services/userService.js";
import {useTrailingBox} from "@/composables/useTrailingBox.js";

const emit = defineEmits(['accept', 'reject']);

const form = reactive({email: ''});
const rules = {
  email: {
    required: true,
    type: 'email',
    message: 'Niepoprawny format adresu e-mail.'
  }
}
const {pass, errorFields} = useAsyncValidator(form, rules);

const {showBox, hideBox, message, isHovered} = useTrailingBox();

const accept = async () => {
  if (pass.value) {
    await updateEmail(form.email)
        .then(_ => emit('accept', true, 'Zmieniono email.'))
        .catch(_ => emit('accept', false, 'Podany email już istnieje.'));
  }
};

const reject = () => {
  emit('reject');
};
</script>

<template>
  <div>
    <div class="profile-form-container">
      <div class="header-info">
        <span>Nowy e-mail</span>
        <component :is="errorFields?.email ? IconInvalid : IconValid"
                   @mouseover="showBox(rules.email.message)" @mouseleave="hideBox"/>
      </div>
      <BasicInput placeholder="Nowy email..." v-model="form.email" />
      <div class="profile-form-actions">
        <BasicButton @click="reject">
          <Icon icon="fa-solid fa-xmark" />
        </BasicButton>
        <BasicButton @click="accept" :class="[{'opacity-50': !pass}, '!bg-teal-900']" :disabled="!pass">
          <Icon icon="fa-solid fa-check"/>
        </BasicButton>
      </div>
    </div>
    <TrailingBox :message="message" :isHovered="isHovered" />
  </div>
</template>