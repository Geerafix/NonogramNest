<script setup>
import Header from '@/components/shared/Header.vue';
import MessagesList from "@/components/admin/other/MessagesList.vue";
import Pagination from "@/components/shared/Pagination.vue";
import {onMounted, ref} from "vue";
import {set} from "@vueuse/core";
import {deleteMessage, getMessages} from "@/services/adminService.js";
import {usePagination} from "@/composables/usePagination.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";
import ManageMessage from "@/components/admin/management/ManageMessage.vue";

const messages = ref([]);
const messageId = ref(null);

const {pageState} = usePagination(1, 10, messages);

const {blurred} = useBlurOnView(messageId, false);

const fetchMessages = async () => {
  await getMessages(pageState.value.page, pageState.value.limit)
      .then((res) => set(messages, res.data));
};

const saveId = (id) => {
  set(messageId, id);
};

const delMessage = async () => {
  await deleteMessage(messageId.value);
  set(messageId, null);
  fetchMessages();
};

onMounted(fetchMessages);
</script>

<template>
  <main>
    <Header></Header>
    <MessagesList :messages="messages" @onListItemClick="saveId" :class="[blurred]" />
    <ManageMessage v-if="messageId" @reject="messageId = null" @accept="delMessage" />
    <Pagination v-bind="pageState" @onPageChange="fetchMessages"></Pagination>
  </main>
</template>