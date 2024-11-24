<script setup>
const emit = defineEmits(['accept', 'reject']);
defineProps(['message'])

const accept = async () => {
    emit('accept', false, 'Usunięto wiadomość.');
};

const reject = () => {
    emit('reject');
};
</script>

<template>
  <div class="form-container">
    <span>{{message}}</span>
    <div class="form-actions">
      <BasicButton @click="reject">
        <Icon icon="fa-solid fa-xmark"/>
      </BasicButton>
      <BasicButton @click="accept" class="!bg-teal-900">
        <Icon icon="fa-solid fa-check"/>
      </BasicButton>
    </div>
  </div>
</template>