<script setup>
import MessagesList from "@/components/admin/other/MessagesList.vue";
import Pagination from "@/components/shared/Pagination.vue";
import ManagePopup from "@/components/admin/management/ManagePopup.vue";
import {onMounted, ref} from "vue";
import {set} from "@vueuse/core";
import {deleteMessage, getMessages} from "@/services/adminService.js";
import {usePagination} from "@/composables/usePagination.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";
import {useNotification} from "@/composables/useNotification.js";

const messages = ref([]);
const messageId = ref(null);

const {pageState} = usePagination(1, messages);

const {blurred} = useBlurOnView(messageId, false);

const {notify} = useNotification();

const fetchMessages = async () => {
  await getMessages(pageState.value.page, pageState.value.limit)
      .then((res) => set(messages, res.data));
};

const saveId = (id) => {
  set(messageId, id);
};

const delMessage = async (status, message) => {
  await deleteMessage(messageId.value);
  set(messageId, null);
  await fetchMessages();
  notify(status, message)
};

onMounted(fetchMessages);
</script>

<template>
  <main>
    <MessagesList :messages="messages" @onListItemClick="saveId" :class="[blurred]" />
    <Transition name="fade">
      <ManagePopup v-if="messageId" message="Usunąć wiadomość?" @reject="messageId = null" @accept="delMessage" />
    </Transition>
    <Transition name="fade" mode="out-in">
      <Pagination v-if="!messageId" v-bind="pageState" @onPageChange="fetchMessages"/>
    </Transition>
  </main>
</template>