<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import { logout } from '@/services/userService';
import { ref, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import BasicButton from '../inputs/BasicButton.vue';
const props = defineProps([ 'width' ]);

const route = useRoute();
const router = useRouter();
const expanded = ref(false);
const visible = ref(true);
const { width } = useWindowSize();

const toggleNavbar = () => { expanded.value = !expanded.value; };

const computedWidth = computed(() => {
    return (expanded.value) ? props.width : 80;
});

const toggleLogout = async () => {
    await logout();
    await router.push({name: 'Home'});
};

const computedRole = computed(() => {
    if (route.meta.pageOwner === 'admin') return 'AdminSettings';
    else if (route.meta.pageOwner === 'user') return 'UserSettings';
    else return 'Home';
});

const computedScreenWidth = computed(() => {
    return visible.value && width.value <= 640;
});
</script>

<template>
    <div>
        <div v-if="!computedScreenWidth" class="menu responsive-menu" :style="{ width: computedWidth + 'px' }" 
            @mouseenter="toggleNavbar" @mouseleave="toggleNavbar">
            <slot></slot>
            <div class="flex flex-col gap-[10px] mt-auto">
                <MenuButton btnText="Ustawienia" @click="router.push({ name: computedRole });">
                    <Icon icon="fa-solid fa-gears" class="my-auto mx-auto" />
                </MenuButton>
                <MenuButton btnText="Wyloguj" @click="toggleLogout">
                    <Icon icon="fa-solid fa-right-from-bracket" class="my-auto mx-auto" />
                </MenuButton>
            </div>
        </div>
        <BasicButton class="absolute bottom-4 w-14 sm:hidden" @click="visible = !visible">
            <Icon icon="fa-solid fa-bars" class="my-auto mx-auto" />
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
    p-[10px]
    border-s-4
    rounded-2xl 
    rounded-ss-lg
    rounded-ee-md
    bg-gray-600 
    border-gray-700
    hover:rounded-2xl
    transition-all
    duration-[270ms]
    z-50;
}
.responsive-menu {
    @apply max-sm:absolute max-sm:h-min max-sm:min-w-[calc(100%-2rem)] max-sm:bottom-24;
}
</style>