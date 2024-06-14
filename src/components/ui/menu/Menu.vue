<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import { logout } from '@/services/userService.js';
import { ref, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import BasicButton from '../inputs/BasicButton.vue';

const route = useRoute();
const router = useRouter();
const expanded = ref(false);
const visible = ref(true);
const { width } = useWindowSize();

const toggleNavbar = () => { expanded.value = !expanded.value; };

const toggleLogout = async () => {
    await logout();
    router.push({name: 'Home'});
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
    <div class="relative">
        <TransitionGroup name="slide-right">
            <div v-if="!computedScreen" key="1" class="menu" @click="visible = !visible" 
                @mouseenter="toggleNavbar" @mouseleave="toggleNavbar">
                <slot></slot>
                <div class="buttons-container">
                    <MenuButton btnText="Ustawienia" @click="router.push({ name: computedRole });">
                        <Icon icon="fa-solid fa-gears" class="my-auto mx-auto" />
                    </MenuButton>
                    <MenuButton btnText="Wyloguj" @click="toggleLogout">
                        <Icon icon="fa-solid fa-right-from-bracket" class="my-auto mx-auto" />
                    </MenuButton>
                </div>
            </div>
        </TransitionGroup>
        <BasicButton key="2" class="expand-button" @click="visible = !visible">
            <div :class="{ '-rotate-180': visible }" class="transition-all ease-out flex">
                <Icon v-if="visible" icon="fa-solid fa-bars" class="my-auto mx-auto" />
                <Icon v-else icon="fa-solid fa-arrow-left" class="my-auto mx-auto" />
            </div>
        </BasicButton>
    </div>
</template>

<style scoped>
.menu {
    @apply  
    flex
    flex-col
    gap-[10px]
    h-full
    sm:w-20
    p-[10px]
    border-s-4
    rounded-2xl 
    rounded-ss-lg
    rounded-ee-md
    bg-gray-600 
    border-gray-700
    hover:rounded-2xl
    sm:hover:w-[11.75rem]
    transition-all
    duration-[270ms]
    z-50;
    @apply 
    max-sm:absolute 
    max-sm:h-min 
    max-sm:bottom-24
    max-sm:shadow-2xl
    max-sm:border-4
    max-sm:rounded-2xl
    shadow-black;
}
.buttons-container {
    @apply flex flex-col gap-[10px] mt-auto;
}
.expand-button {
    @apply absolute bottom-0 w-14 sm:hidden;
}
</style>