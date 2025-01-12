<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";

const emit = defineEmits(['delete', 'reject', 'accept'])
</script>

<template>
  <div class="form-actions">
    <BasicButton class="!bg-red-600/70" @click="emit('delete')">
      <Icon icon="fa-solid fa-trash"/>
    </BasicButton>
    <BasicButton @click="emit('reject')">
      <Icon icon="fa-solid fa-xmark"/>
    </BasicButton>
    <BasicButton class="!bg-teal-900" @click="emit('accept')">
      <Icon icon="fa-solid fa-check"/>
    </BasicButton>
  </div>
</template>