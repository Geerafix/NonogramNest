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
  <div>
    <div class="form-container">
      <span>{{ message }}</span>
      <div class="form-actions">
        <BasicButton @click="reject">
          <Icon icon="fa-solid fa-xmark"/>
        </BasicButton>
        <BasicButton class="!bg-teal-900" @click="accept">
          <Icon icon="fa-solid fa-check"/>
        </BasicButton>
      </div>
    </div>
    <div class="blurred-background"/>
  </div>
</template>

<style scoped>
.blurred-background {
  @apply
  fixed
  h-full
  w-full
  top-0
  left-0
  backdrop-blur-md
  backdrop-brightness-95
  z-0
}
</style>