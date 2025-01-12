<script setup>
import List from "@/components/shared/list/List.vue";
import UserProfile from "@/components/user/profile/UserProfile.vue";
import Pagination from "@/components/shared/Pagination.vue";
import ManageUser from "@/components/admin/management/ManageUser.vue";
import ManagePopup from "@/components/admin/management/ManagePopup.vue";
import {computed, ref} from "vue";
import {set} from "@vueuse/core";
import {useList} from "@/composables/useList.js";
import {getRatingUser} from "@/services/ratingService.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";
import {usePagination} from "@/composables/usePagination.js";
import {
  deleteUserChallengeScore,
  deleteUserClassicScore,
  deleteUserCreatedPuzzle,
  getUserChallengeScores,
  getUserClassicScores,
  getUserCreatedPuzzles
} from "@/services/adminService.js";
import {useNotification} from "@/composables/useNotification.js";

const props = defineProps(['managedUser']);
const emit = defineEmits(['accept', 'reject'])

const userProfile = ref(null);
const scoresList = ref([]);
const option = ref(null);
const content = ref(null);

const headers = ref([]);
const listState = useList(headers, scoresList);
const {pageState} = usePagination(1, scoresList);
const {notify} = useNotification();

useBlurOnView(userProfile, true);

const fetchUserContent = async (opt) => {
  if (opt) set(option, opt);
  const uid = props.managedUser.user_id;
  const {page, limit} = pageState.value;
  switch (option.value) {
    case 'classic':
      headers.value = ['ID', 'Punkty', 'Czas (w sekundach)']
      await getUserClassicScores(uid, page, limit).then(res => set(scoresList, res.data));
      break;
    case 'challenge':
      headers.value = ['ID', 'Punkty', 'Czas (w sekundach)', 'Data']
      await getUserChallengeScores(uid, page, limit).then(res => set(scoresList, res.data));
      break;
    case 'created':
      headers.value = ['ID', 'Nazwa', 'Rozmiar', 'Twórca', 'Data utworzenia']
      await getUserCreatedPuzzles(uid, page, limit).then(res => set(scoresList, res.data));
      break;
    case 'profile':
      await getRatingUser(uid).then((res) => set(userProfile, res.data));
      break;
  }

  if (scoresList.value.length === 0 && option.value !== 'profile') {
    notify(false, 'Nie znaleziono wyników/plansz.');
  }
};

const selectContent = (selected) => {
  set(content, selected)
};

const deleteContent = async () => {
  const uid = props.managedUser.user_id;
  const cid = content.value[Object.keys(content.value)[0]];
  switch (option.value) {
    case 'classic':
      await deleteUserClassicScore(uid, cid).then(_ => notify(false, 'Usunięto wynik.'));
      break;
    case 'challenge':
      await deleteUserChallengeScore(uid, cid).then(_ => notify(false, 'Usunięto wynik.'));
      break;
    case 'created':
      await deleteUserCreatedPuzzle(uid, cid).then(_ => notify(false, 'Usunięto mapę.'));
      break;
  }

  set(content, null);
  await fetchUserContent();
};

const confirm = (status, message) => emit('accept', status, message);
const cancel = () => emit('reject');

const isScoresEmpty = computed(() => scoresList.value.length === 0);
</script>

<template>
  <TransitionGroup mode="out-in" name="fade" tag="div">
    <ManageUser v-if="!userProfile && isScoresEmpty" key="0" :user="managedUser" @accept="confirm"
                @reject="cancel" @view="fetchUserContent"/>
    <Pagination v-if="!isScoresEmpty" key="1" v-bind="pageState" @onPageChange="fetchUserContent"/>
    <List v-if="!isScoresEmpty" key="2" class="!absolute top-0" v-bind="listState" @onListItemClick="selectContent"/>
    <UserProfile v-if="userProfile" key="3" :user="userProfile"
                 class="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto"/>
    <BasicButton v-if="!isScoresEmpty" key="4" class="absolute bottom-0 right-0" @click="scoresList = []">
      <Icon class="icon-fix" icon="fa-solid fa-xmark"/>
    </BasicButton>
    <ManagePopup v-if="content" key="5" message="Usunąć tą zawartość?" @accept="deleteContent"
                 @reject="content = null"/>
  </TransitionGroup>
</template>