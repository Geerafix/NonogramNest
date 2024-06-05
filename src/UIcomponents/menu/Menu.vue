<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import { logout } from '@/services/userService';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps([
    'width'
]);

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
</script>

<template>
    <div class="
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
    z-50" 
    :style="{ width: computedWidth + 'px' }" 
    @mouseenter="toggleNavbar" 
    @mouseleave="toggleNavbar">
        <slot></slot>
        <MenuButton btnText="Wyloguj" @click="toggleLogout" class="mt-auto">
            <Icon icon="fa-solid fa-door-open" class="my-auto mx-auto" />
        </MenuButton>
    </div>
</template>
