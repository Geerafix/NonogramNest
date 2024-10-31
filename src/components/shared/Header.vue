<script setup>
import {useRoute} from 'vue-router';
import {computed} from "vue";

const route = useRoute();

const headers = ['/', '/logowanie', '/rejestracja'];
const style = '!text-left !text-5xl !p-5 !bg-gradient-to-r from-slate-700/80 italic';

const styleOnHome = computed(() => headers.includes(route.path) ? style : '')
</script>

<template>
  <h1 :class="['header', styleOnHome]">
    {{ route.meta.title }}
  </h1>
</template>

<style scoped>
.header {
  @apply
  mb-4
  p-2
  w-full
    h-min
  mx-auto
  bg-gray-700/50
  rounded-lg
  rounded-ss-2xl
  rounded-ee-2xl
  text-3xl
  text-center
  font-thin
  font-sans
  select-none;
}
</style>