<script setup>
import Header from '@/components/shared/Header.vue';
import MessagesList from "@/components/admin/other/MessagesList.vue";
import Pagination from "@/components/shared/Pagination.vue";
import {onMounted, ref} from "vue";
import {set} from "@vueuse/core";
import {getMessages} from "@/services/adminService.js";
import {usePagination} from "@/composables/usePagination.js";

const messages = ref([]);

const {pageState} = usePagination(1, 10, messages);

const fetchMessages = async () => {
  await getMessages(pageState.value.page, pageState.value.limit)
      .then((res) => set(messages, res.data));
};

onMounted(fetchMessages);
</script>

<template>
  <main>
    <Header></Header>
    <MessagesList :messages="messages" />
    <Pagination v-bind="pageState" @onPageChange="fetchMessages"></Pagination>
  </main>
</template>