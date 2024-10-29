<script setup>
import TextArea from "@/components/shared/inputs/TextArea.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import {ref} from "vue";
import {updateBio} from "@/services/userService";
import IconInvalid from "@/components/auth/IconInvalid.vue";

const emit = defineEmits(['accept', 'reject']);

const bio = ref('');

const accept = async () => {
  await updateBio(bio.value);
  emit('accept', true, 'Zmieniono opis.');
};

const reject = () => {
  emit('reject');
};
</script>

<template>
  <div>
    <div class="profile-form-container">
      <span class="w-full">Opis</span>
      <TextArea placeholder="Opis..." v-model="bio" />
      <div class="profile-form-actions">
        <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
        <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
      </div>
    </div>
  </div>
</template>