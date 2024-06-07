<script setup>
import Pagination from '@/UIcomponents/Pagination.vue';
import UserItem from '@/components/admin/UserItem.vue';
import UserListItem from '@/components/admin/UserListItem.vue';
import UserListHeader from '@/components/admin/UserListHeader.vue';
import { getUsers } from '@/services/adminService';
import { ref, watch, onMounted  } from 'vue';

const page = ref(1);
const users = ref([]);
const limit = ref(10);

const fetchUsers = async () => {
    await getUsers(page.value, limit.value)
        .then((res) => { users.value = res.data })
        .then((err) => {  });
};

watch(page, fetchUsers);

onMounted(fetchUsers);
</script>

<template>
    <div class="h-full text-white relative">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans h-16">Użytkownicy</div>
        <Pagination :limit="limit" 
                    :page="page" 
                    :perpage="users.length" 
                    :prev="() => page -= 1"
                    :next="() => page += 1" />
        
        <div class="overflow-auto max-h-[calc(100%-9rem)] pr-2">
            <div class="mb-2 p-2 gap-2 bg-gray-900/40 grid grid-cols-[1fr_30%_30%_1fr] sticky top-0 rounded-lg z-10">
                <UserListHeader attributeName="Id" />
                <UserListHeader attributeName="Nazwa użytkownika" />
                <UserListHeader attributeName="Email" />
                <UserListHeader attributeName="Rola" />
            </div>
            <div v-for="(user, index) in users" class="p-2 bg-gray-900/40 rounded-lg mx-auto h-full"
                :class="{ 'mb-2': index < users.length - 1 }">
                <UserListItem>
                    <UserItem :attributeVal="user.user_id" />
                    <UserItem :attributeVal="user.username" />
                    <UserItem :attributeVal="user.email" />
                    <UserItem :attributeVal="user.role" />
                </UserListItem>
            </div>
        </div>
    </div>
</template>