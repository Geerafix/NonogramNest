<script setup>
import TextArea from "@/components/shared/inputs/TextArea.vue";
import {ref} from "vue";
import {updateBio} from "@/services/userService";

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
      <span class="w-full">Nowy opis</span>
      <TextArea placeholder="Opis..." v-model="bio" />
      <div class="profile-form-actions">
        <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
        <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
      </div>
    </div>
  </div>
</template>