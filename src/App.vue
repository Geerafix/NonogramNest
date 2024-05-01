<script setup>
import { RouterView } from 'vue-router'
import Menu from '../src/UIcomponents/Menu.vue';
</script>

<template>
  <div class="flex">
    <Menu class="z-50 min-h-[calc(100%-32px)] my-4 ml-4"></Menu>
    <main class="z-100 h-[calc(100vh-32px)] w-[calc(100%-128px)] my-4 ml-[112px] mr-4">
      <RouterView/>
    </main>
  </div>
</template>