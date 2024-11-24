<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
const emit = defineEmits(['delete', 'reject', 'accept'])
</script>

<template>
  <div class="form-actions">
    <BasicButton @click="emit('delete')" class="!bg-red-600/70">
      <Icon icon="fa-solid fa-trash"/>
    </BasicButton>
    <BasicButton @click="emit('reject')">
      <Icon icon="fa-solid fa-xmark"/>
    </BasicButton>
    <BasicButton @click="emit('accept')" class="!bg-teal-900">
      <Icon icon="fa-solid fa-check"/>
    </BasicButton>
  </div>
</template>