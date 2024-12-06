<script setup>
import IconInvalid from "@/components/auth/IconInvalid.vue";
import IconValid from "@/components/auth/IconValid.vue";
import TrailingBox from "@/components/shared/TrailingBox.vue";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {reactive} from "vue";
import {updateUsername} from "@/services/userService.js";
import {useTrailingBox} from "@/composables/useTrailingBox.js";

const emit = defineEmits(['accept', 'reject']);

const form = reactive({username: ''});
const rules = {
  username: {
    required: true,
    min: 5, max: 20,
    message: 'Nazwa musi mieć od 5 do 20 znaków.'
  }
}
const {pass, errorFields} = useAsyncValidator(form, rules);

const {showBox, hideBox, message, isHovered} = useTrailingBox();

const accept = async () => {
  if (pass.value) {
    await updateUsername(form.username)
        .then(_ => emit('accept', true, 'Zmieniono nazwę użytkownika.'))
        .catch(_ => emit('accept', false, 'Podana nazwa juz istnieje.'));
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
        <span>Nowa nazwa</span>
        <component :is="errorFields?.username ? IconInvalid : IconValid"
                   @mouseover="showBox(rules.username.message)" @mouseleave="hideBox"/>
      </div>
      <BasicInput placeholder="Nazwa..." v-model="form.username" />
      <div class="profile-form-actions">
        <BasicButton @click="reject">
          <Icon icon="fa-solid fa-xmark"/>
        </BasicButton>
        <BasicButton @click="accept" :class="[{'opacity-50': !pass}, '!bg-teal-900']" :disabled="!pass">
          <Icon icon="fa-solid fa-check"/>
        </BasicButton>
      </div>
    </div>
    <TrailingBox :message="message" :isHovered="isHovered" />
  </div>
</template>