<script setup>
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import { getUsers } from '@/services/adminService';
import { ref, watch, onMounted  } from 'vue';

const page = ref(1);
const users = ref([]);
const limit = ref(10);

const previousPage = () => { page.value > 1 ? page.value -= 1 : page.value }
const nextPage = () => { users.value.length < limit.value ? page.value : page.value += 1 }

watch(page, async (nextPage) => {
    await getUsers(nextPage, limit.value).then((res) => { users.value = res.data });
});

onMounted(async () => {
    await getUsers(page.value, limit.value).then((res) => { users.value = res.data }).then((err) => { });
});
</script>

<template>
    <div class="h-full text-white relative">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans h-16">Użytkownicy</div>
        <div class="grid grid-cols-[min-content_80px_min-content] gap-2 items-center absolute bottom-0 left-0 right-0 mx-auto w-fit">
            <BasicButton @click="previousPage"><Icon icon="fa-solid fa-arrow-left" class="my-auto mx-auto"/></BasicButton>
            <span class="text-2xl mx-auto">{{ page }}</span>
            <BasicButton @click="nextPage"><Icon icon="fa-solid fa-arrow-right" class="my-auto mx-auto"/></BasicButton>
        </div>
        <div v-for="user in users" class="my-2 p-3 bg-gray-900/40 rounded-lg">
            {{ user }}
        </div>
    </div>
</template>
