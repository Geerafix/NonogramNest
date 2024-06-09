<script setup>
import BasicButton from "@/UIcomponents/inputs/BasicButton.vue";
defineProps([
    'pause',
    'check'
])
</script>

<template>
  <BasicButton btnText="Stop" class="grid grid-cols-[1fr_auto]" @click="pause">
    <Icon icon="fa-solid fa-stop" class="my-auto mx-auto" />
  </BasicButton>
  <BasicButton btnText="Sprawdź" class="grid grid-cols-[1fr_auto]" @click="check">
    <Icon icon="fa-solid fa-check" class="my-auto mx-auto" />
  </BasicButton>
</template>
