<script setup>
import TextArea from "@/components/shared/inputs/TextArea.vue";
import {ref} from "vue";
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
      <span class="w-full">Tytuł wiadomości</span>
      <BasicInput v-model="title" :style="{'width': '100%'}" placeholder="Tytuł..."/>
      <span class="w-full mt-2">Treść wiadomości</span>
      <TextArea v-model="message" class="!w-[30rem]" placeholder="Opisz swój problem..."/>
      <div class="profile-form-actions">
        <BasicButton @click="reject">
          <Icon icon="fa-solid fa-xmark"/>
        </BasicButton>
        <BasicButton class="!bg-teal-900" @click="accept">
          <Icon icon="fa-solid fa-check"/>
        </BasicButton>
      </div>
    </div>
  </div>
</template>