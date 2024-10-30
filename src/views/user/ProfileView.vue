<script setup>
import UserProfile from '@/components/user/profile/UserProfile.vue';
import RollButton from "@/components/shared/inputs/InfoButton.vue";
import {useNotification} from "@/composables/useNotification.js";
import {computed, onBeforeMount, ref} from 'vue';
import {getUserProfile} from '@/services/userService';
import {set} from "@vueuse/core";
import {defineAsyncComponent} from "vue";
import {profileButtons} from "@/config.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";

const user = ref(null);
const component = ref('');

const {notify} = useNotification();

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
    <Transition name="fetch-fade" :class="['grid gap-2 mt-2', blurred]">
      <div v-if="user">
        <UserProfile :user="user" class="mb-2"></UserProfile>
        <div :class="['flex gap-3 mx-auto mt-2']">
          <RollButton v-for="button in profileButtons" :text="button.text" @click="changeForm(button.name)">
            <Icon :icon="['fa-solid', button.icon]"/>
          </RollButton>
        </div>
      </div>
    </Transition>
    <Transition name="slide-up">
      <component :is="selectedForm" @reject="onReject" @accept="onResolve" />
    </Transition>
  </main>
</template>
