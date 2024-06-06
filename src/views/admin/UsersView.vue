<script setup>
import Pagination from '@/UIcomponents/Pagination.vue';
import UserItem from '@/components/admin/UserItem.vue';
import { getUsers } from '@/services/adminService';
import { ref, watch, onMounted  } from 'vue';

const page = ref(1);
const users = ref([]);
const limit = ref(7);

const fetchUsers = async () => {
    await getUsers(page.value, limit.value)
        .then((res) => { users.value = res.data })
        .then((err) => { });
};

watch(page, fetchUsers);

onMounted(fetchUsers);
</script>

<template>
    <div class="h-full text-white relative">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans h-16">Użytkownicy</div>
        <Pagination :limit="limit" :page="page" :items="users" />
        
        <div v-for="user in users" class="my-2 p-2 bg-gray-900/40 rounded-lg grid grid-cols-[1fr_30%_30%_1fr] gap-2 items-center mx-auto">
            <UserItem attributeName="Id" :attributeVal="user.user_id" />
            <UserItem attributeName="Nazwa użytkownika" :attributeVal="user.username" />
            <UserItem attributeName="Email" :attributeVal="user.email" />
            <UserItem attributeName="Rola" :attributeVal="user.role" />
        </div>
    </div>
</template>
