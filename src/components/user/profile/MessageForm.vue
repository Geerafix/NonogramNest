<script setup>
import TextArea from "@/components/shared/inputs/TextArea.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import {ref} from "vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import {postMessage} from "@/services/userService.js";

const emit = defineEmits(['accept', 'reject']);
const title = ref('');
const message = ref('');

const accept = async () => {
  await postMessage(title.value, message.value);
  emit('accept', true, 'Wysłano wiadomość do administracji');
};

const reject = () => {
  emit('reject');
};
</script>

<template>
  <div>
    <div class="profile-form-container">
      <BasicInput placeholder="Tytuł..." v-model="title" :style="{'width': '100%'}" />
      <TextArea placeholder="Wiadomość do administracji..." v-model="message" />
      <div class="profile-form-actions">
        <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
        <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
      </div>
    </div>
  </div>
</template>