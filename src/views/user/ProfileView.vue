<script setup>
import Header from '@/components/shared/Header.vue';
import UserProfile from '@/components/user/profile/UserProfile.vue';
import RollButton from "@/components/shared/inputs/InfoButton.vue";
import Notification from "@/components/shared/Notification.vue";
import {useNotification} from "@/composables/useNotification.js";
import {computed, onBeforeMount, ref} from 'vue';
import {getUserProfile} from '@/services/userService';
import {set} from "@vueuse/core";
import {defineAsyncComponent} from "vue";
import {profileButtons} from "@/config.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";

const user = ref({});
const component = ref('');

const notification = ref(null);
const {notify} = useNotification(notification);

const {blurred} = useBlurOnView(component, false);

const changeForm = (name) => set(component, name);

const onReject = () => set(component, '');
const onResolve = (status, message) => {
  set(component, '');
  fetchUserProfile();
  notify(status, message);
};

const selectedForm = computed(() => {
  if (component.value) {
    return defineAsyncComponent(() =>
        import(`@/components/user/profile/${component.value}.vue`)
    )
  }
});

const fetchUserProfile = async () => {
  await getUserProfile().then((res) => set(user, res.data));
};

onBeforeMount(fetchUserProfile);
</script>

<template>
  <main>
    <Header></Header>
    <div :class="['grid gap-2 m-auto w-fit', blurred]">
      <UserProfile :user="user" class="mb-2"></UserProfile>
      <div :class="['flex gap-4 mx-auto']">
        <RollButton v-for="button in profileButtons" :text="button.text" @click="changeForm(button.name)">
          <Icon :icon="['fa-solid', button.icon]"/>
        </RollButton>
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <component :is="selectedForm" @reject="onReject" @accept="onResolve" />
    </Transition>
    <Notification ref="notification" />
  </main>
</template>
