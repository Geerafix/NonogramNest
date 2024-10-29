<script setup>
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {reactive, ref, watch} from "vue";
import {set} from "@vueuse/core";
import {updateUsername} from "@/services/userService.js";
import IconInvalid from "@/components/auth/IconInvalid.vue";
import IconValid from "@/components/auth/IconValid.vue";
import TrailingBox from "@/components/shared/TrailingBox.vue";
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
const wasChecked = ref(false);

const {showBox, hideBox, message, isHovered} = useTrailingBox();

const accept = async () => {
  if (pass.value) {
    await updateUsername(form.username);
    emit('accept', true, 'Zmieniono nazwę użytkownika');
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
        <BasicButton @click="accept" :class="{'opacity-50': !pass}" :disabled="!pass">
          <Icon icon="fa-solid fa-check"/>
        </BasicButton>
      </div>
      <Transition name="fade">
        <div v-if="wasChecked" class="profile-form-message">{{rules.username.message}}</div>
      </Transition>
    </div>
    <TrailingBox :message="message" :isHovered="isHovered" />
  </div>
</template>