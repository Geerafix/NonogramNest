<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import {ref} from "vue";
import {updateUser} from "@/services/adminService.js";
import {set} from "@vueuse/core";

const emit = defineEmits(['accept', 'reject']);

const accept = async () => {
    emit('accept', false, 'Usunięto wiadomość');
};

const reject = () => {
    emit('reject');
};
</script>

<template>
  <div class="form-container">
    <span>Usunąć wiadomość?</span>
    <div class="form-actions">
      <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
      <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
    </div>
  </div>
</template>