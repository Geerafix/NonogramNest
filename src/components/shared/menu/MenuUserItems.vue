<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const routes = [
  {name: 'Play', icon: 'fa-gamepad', text: 'Graj'},
  {name: 'Challenge', icon: 'fa-calendar-days', text: 'Wyzwanie'},
  {name: 'Creator', icon: 'fa-square-plus', text: 'Kreator'},
  {name: 'Community', icon: 'fa-user-group', text: 'Społeczność'},
  {name: 'Rating', icon: 'fa-chart-simple', text: 'Ranking'},
  {name: 'Achievements', icon: 'fa-star', text: 'Osiągnięcia'},
  {name: 'Profile', icon: 'fa-address-card', text: 'Profil'}
];

const colorByRoute = (index) => (route.name === routes[index].name ? 'rgb(31 41 55)' : '');
</script>

<template>
  <MenuButton v-for="(route, index) in routes"
              :buttonText="route.text" :style="{'background-color': colorByRoute(index)}"
              @click="router.push({ name: route.name })">
    <Icon :icon="['fa-solid', route.icon]" class="my-auto mx-auto"/>
  </MenuButton>
</template>
