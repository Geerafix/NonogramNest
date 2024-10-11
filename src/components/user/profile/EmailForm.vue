<script setup>
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {reactive, ref} from "vue";
import {set} from "@vueuse/core";

const emit = defineEmits(['accept', 'reject']);

const form = reactive({email: ''});
const rules = {
  email: {
    required: true,
    type: 'email',
    message: 'Niepoprawny Email'
  }
}
const {pass} = useAsyncValidator(form, rules);
const wasChecked = ref(false);

const accept = () => {
  if (pass.value) {
    emit('accept', true, 'Zmieniono email');
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
      <BasicInput placeholder="Nowy email..." v-model="form.email"></BasicInput>
      <div class="profile-form-actions">
        <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
        <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
      </div>
      <Transition name="fade">
        <span v-if="wasChecked" class="profile-form-message">{{rules.email.message}}</span>
      </Transition>
    </div>
  </div>
</template>