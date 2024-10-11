<script setup>
import TextArea from "@/components/shared/inputs/TextArea.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import {ref} from "vue";

const emit = defineEmits(['accept', 'reject']);
const message = ref('');

const accept = () => {
  emit('accept', true, 'Wysłano wiadomość do administracji');
};

const reject = () => {
  emit('reject');
};
</script>

<template>
  <div>
    <div class="profile-form-container">
      <TextArea placeholder="Wiadomość do administracji..." v-model="message"></TextArea>
      <div class="profile-form-actions">
        <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
        <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
      </div>
    </div>
  </div>
</template>