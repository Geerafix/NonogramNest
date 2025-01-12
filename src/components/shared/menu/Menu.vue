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
  await router.push({name: 'SignIn'});
};

const computedScreen = computed(() => {
  return visible.value && width.value <= 640;
});
</script>

<template>
  <div class="relative transition-all">
    <Transition mode="out-in" name="slide-right-smooth">
      <div v-if="!computedScreen" class="menu" @click="visible = !visible"
           @mouseover="toggleNavbar">
        <slot></slot>
        <div class="buttons-container">
          <MenuButton buttonText="Wyloguj" @click="toggleLogout">
            <Icon class="my-auto mx-auto" icon="fa-solid fa-right-from-bracket"/>
          </MenuButton>
        </div>
      </div>
    </Transition>
    <BasicButton class="expand-button" @click="visible = !visible">
      <div :class="{ '-rotate-180': visible }" class="transition-all ease-out flex">
        <Icon v-if="visible" class="my-auto mx-auto" icon="fa-solid fa-bars"/>
        <Icon v-else class="my-auto mx-auto" icon="fa-solid fa-reply"/>
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
  bg-gradient-to-b
  from-gray-600
  to-gray-600/90
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