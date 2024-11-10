<script setup>
import UserProfile from '@/components/user/profile/UserProfile.vue';
import RollButton from "@/components/shared/inputs/InfoButton.vue";
import {useNotification} from "@/composables/useNotification.js";
import {computed, onBeforeMount, reactive, ref, watch, watchEffect} from 'vue';
import {getUserProfile, updatePfp} from '@/services/userService';
import {set, useFileDialog, watchDeep} from "@vueuse/core";
import {defineAsyncComponent} from "vue";
import {profileButtons} from "@/config.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";

const { files, open, reset, onCancel, onChange } = useFileDialog({
  accept: 'image/*'
})

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

onChange(async (files) => {
  if (files[0].size > 51200) {
    notify(false, 'Rozmiar zdjęcia przekracza dopuszczalny limit 50 kB.');
    return;
  }

  if (files[0]) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = async (res) => {
      await updatePfp(res.target.result.split(',')[1]);
      await fetchUserProfile();
      notify(true, 'Zmieniono zdjęcie profilowe.');
    };
  }
});

onBeforeMount(fetchUserProfile);
</script>

<template>
  <main>
    <Transition name="fetch-fade" :class="['grid gap-2 mt-2', blurred]">
      <div v-if="user">
        <UserProfile :user="user" class="mb-2"/>
        <div :class="['flex gap-3 mx-auto mt-2']">
          <RollButton text="Zmień profilowe" @click="open">
            <Icon icon="'fa-solid fa-image"/>
          </RollButton>
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
