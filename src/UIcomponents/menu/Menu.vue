<script setup>
import MenuButton from '../inputs/MenuButton.vue';
import { logout } from '@/services/usersService';
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
    router.push('/');
};
</script>

<template>
    <div class="
        z-50 
        h-full
        p-[10px]
        bg-gray-600 
        border-gray-700
        rounded-2xl 
        rounded-ss-lg
        rounded-ee-md
        border-s-4
        transition-all
        hover:rounded-2xl
        hover:border-r-4
        flex
        flex-col
        gap-[10px]"
        :style="{ width: computedWidth + 'px'}"
        @mouseenter="toggleNavbar"
        @mouseleave="toggleNavbar">
        <slot></slot>
        <MenuButton btnText="Wyloguj" @click="toggleLogout" class="mt-auto">
            <Icon icon="fa-solid fa-door-open" class="my-auto mx-auto"/>
        </MenuButton>
    </div>
</template>
