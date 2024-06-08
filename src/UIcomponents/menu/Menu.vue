<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import { logout } from '@/services/userService';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps([ 'width' ]);

const route = useRoute();
const router = useRouter();
const expanded = ref(false);

const toggleNavbar = () => { expanded.value = !expanded.value; };

const computedWidth = computed(() => {
    return (expanded.value) ? props.width : 80;
});

const toggleLogout = async () => {
    await logout();
    router.push({ name: 'Home' });
};

const computedRole = computed(() => {
    if (route.meta.pageOwner === 'admin') return 'AdminSettings';
    else if (route.meta.pageOwner === 'user') return 'UserSettings';
    else return 'Home';
});
</script>

<template>
    <div class="menu" :style="{ width: computedWidth + 'px' }"  
        @mouseenter="toggleNavbar" @mouseleave="toggleNavbar">
        <slot></slot>
        <div class="flex flex-col gap-[10px] mt-auto">
            <MenuButton btnText="Ustawienia" @click="router.push({ name: computedRole });">
                <Icon icon="fa-solid fa-cog" class="my-auto mx-auto" />
            </MenuButton>
            <MenuButton btnText="Wyloguj" @click="toggleLogout">
                <Icon icon="fa-solid fa-door-open" class="my-auto mx-auto" />
            </MenuButton>
        </div>
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
</style>