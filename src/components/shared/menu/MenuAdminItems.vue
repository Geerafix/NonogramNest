<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const routes = [
  {name: 'ManageUsers', icon: 'fa-users', text: 'Użytkownicy'},
  {name: 'ManagePuzzles', icon: 'fa-gamepad', text: 'Gry'},
  {name: 'ManageAchievements', icon: 'fa-star', text: 'Osiągnięcia'},
  {name: 'AdminMessages', icon: 'fa-message', text: 'Wiadomości'},
];

const colorByRoute = (index) => (route.name === routes[index].name ? 'rgb(31 41 55)' : '');
</script>

<template>
    <MenuButton v-for="(route, index) in routes"
        :buttonText="route.text" :style="{'background-color': colorByRoute(index)}"
        @click="router.push({ name: route.name })">
        <Icon :icon="['fa-solid', route.icon]" class="my-auto mx-auto" />
    </MenuButton>
</template>
