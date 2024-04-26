<script setup>
import { RouterView } from 'vue-router'
import Menu from '../src/UIcomponents/Menu.vue';
</script>

<template>
  <Menu class="z-50"></Menu>
  <main class="z-100 h-[calc(100%-32px)] mt-4 absolute left-28 right-4">
    <RouterView/>
  </main>
</template>