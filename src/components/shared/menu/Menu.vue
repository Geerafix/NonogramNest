<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import {postLogOut} from '@/services/userService.js';
import {computed, ref} from 'vue';
import {useWindowSize} from '@vueuse/core';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();
const expanded = ref(false);
const visible = ref(true);
const {width} = useWindowSize();

const toggleNavbar = () => {
  expanded.value = !expanded.value;
};

const toggleLogout = async () => {
  await postLogOut();
  router.push({name: 'SignIn'});
};

const computedRole = computed(() => {
  if (route.meta.pageOwner === 'admin') return 'AdminSettings';
  else if (route.meta.pageOwner === 'user') return 'UserSettings';
  else return 'Home';
});

const computedScreen = computed(() => {
  return visible.value && width.value <= 640;
});
</script>

<template>
  <div class="relative transition-all">
    <Transition name="slide-right-smooth" mode="out-in">
      <div v-if="!computedScreen" class="menu" @click="visible = !visible"
           @mouseover="toggleNavbar">
        <slot></slot>
        <div class="buttons-container">
<!--          <MenuButton buttonText="Ustawienia" @click="router.push({ name: computedRole });">-->
<!--            <Icon icon="fa-solid fa-gears" class="my-auto mx-auto"/>-->
<!--          </MenuButton>-->
          <MenuButton buttonText="Wyloguj" @click="toggleLogout">
            <Icon icon="fa-solid fa-right-from-bracket" class="my-auto mx-auto"/>
          </MenuButton>
        </div>
      </div>
    </Transition>
    <BasicButton class="expand-button" @click="visible = !visible">
      <div :class="{ '-rotate-180': visible }" class="transition-all ease-out flex">
        <Icon v-if="visible" icon="fa-solid fa-bars" class="my-auto mx-auto"/>
        <Icon v-else icon="fa-solid fa-reply" class="my-auto mx-auto"/>
      </div>
    </BasicButton>
  </div>
</template>

<style scoped>
.menu {
  @apply
  flex
  flex-col
  relative
  gap-[10px]
  h-full
  p-[10px]
  border-gray-700
  bg-gray-600
  shadow-black
  border-s-4
  rounded-2xl
  rounded-ss-lg
  rounded-ee-md
  hover:rounded-2xl
  transition-all
  duration-[270ms]
  z-50;
  @apply
  sm:w-20
  sm:hover:w-[11.75rem]
  max-sm:absolute
  max-sm:h-min
  max-sm:bottom-20
  max-sm:shadow-2xl
  max-sm:border-4
  max-sm:rounded-2xl;
}

.buttons-container {
  @apply
  flex
  flex-col
  gap-[10px]
  mt-auto;
}

.expand-button {
  @apply
  absolute
  bottom-0
  w-14
  z-10
  sm:hidden;
}
</style>