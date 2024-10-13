<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import {useRoute, useRouter} from "vue-router";
import {adminMenuButtons as routes} from "@/config.js";

const route = useRoute();
const router = useRouter();

const colorByRoute = (index) => (
    route.name === routes[index].name ? 'rgb(31 41 55)' : ''
);
</script>

<template>
  <MenuButton v-for="(route, index) in routes"
              :buttonText="route.text" :style="{'background-color': colorByRoute(index)}"
              @click="router.push({ name: route.name })">
    <Icon :icon="['fa-solid', route.icon]" class="my-auto mx-auto"/>
  </MenuButton>
</template>
