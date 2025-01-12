<script setup>
import Pagination from "@/components/shared/Pagination.vue";
import AchievementsList from "@/components/admin/other/AchievementsList.vue";
import ManageAchievement from "@/components/admin/management/ManageAchievement.vue";
import {set} from "@vueuse/core";
import {onMounted, ref} from "vue";
import {getAchievements} from "@/services/adminService.js";
import {usePagination} from "@/composables/usePagination.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";
import {useNotification} from "@/composables/useNotification.js";

const achievements = ref([]);

const manageAchievement = ref(null);
const {blurred} = useBlurOnView(manageAchievement, false);

const {pageState} = usePagination(1, achievements);

const {notify} = useNotification();

const fetchAchievements = async () => {
  await getAchievements(pageState.value.page, pageState.value.limit)
      .then(res => set(achievements, res.data))
};

const getAchievement = async (achievement) => {
  set(manageAchievement, achievement);
};

const onAccept = (status, message) => {
  fetchAchievements();
  set(manageAchievement, null);
  notify(status, message);
}

const onReject = () => set(manageAchievement, null);

const newAchievement = () => {
  set(manageAchievement, {});
};

onMounted(fetchAchievements);
</script>

<template>
  <main>
    <AchievementsList :achievements="achievements" :class="blurred" @onListItemClick="getAchievement"/>
    <Transition name="fade">
      <ManageAchievement v-if="manageAchievement" :achievement="manageAchievement" @accept="onAccept"
                         @reject="onReject"/>
    </Transition>
    <Transition mode="out-in" name="fade">
      <div v-if="!manageAchievement">
        <BasicButton class="absolute right-0 bottom-0" @click="newAchievement">
          Nowe
          <Icon class="icon-fix" icon="fa-solid fa-plus"/>
        </BasicButton>
        <Pagination v-bind="pageState" @onPageChange="fetchAchievements"/>
      </div>
    </Transition>
  </main>
</template>