<script setup>
import {useRoute} from 'vue-router';
import {computed, onMounted, ref} from "vue";

const route = useRoute();

const headers = ['Home', 'SignIn', 'SignUp'];
const style = '!text-left !text-5xl !p-5';

const styleOnHome = computed(() => headers.includes(route.name) ? style : '');

const onMountAnimate = ref(false);

onMounted(() => {
  setTimeout(() => {onMountAnimate.value = true}, 20);
});
</script>

<template>
  <div :class="['header', styleOnHome]">
    <Transition name="slide-right-smooth" mode="out-in">
      <h1 v-show="onMountAnimate" class="flex gap-4">
        <div v-if="headers.includes(route.name)" @click="$router.push('/')">
          <img src="/favicon.png" class="logo-style"/>
        </div>{{ route.meta.title }}
      </h1>
    </Transition>
    <div
      class="opacity-10 absolute -translate-y-[34.7%] -right-20 scale-75 -skew-x-12">
      <img src="/header2.png">
    </div>
  </div>
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
  font-thin
  font-sans
  text-center
  relative
  overflow-hidden
  !bg-gradient-to-r
  from-gray-600/80
  italic
  pl-3
  z-50
  select-none;
}
.logo-style {
  @apply
  h-12
  rounded-full
  cursor-pointer
  transition-all;
}
.logo-style:hover {
  @apply
  shadow-lg
  shadow-gray-500
  brightness-110
}
</style>