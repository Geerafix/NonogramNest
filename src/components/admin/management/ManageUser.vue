<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import {ref} from "vue";
import {updateUser} from "@/services/adminService.js";
import {set} from "@vueuse/core";

const props = defineProps(['managedUser']);
const emit = defineEmits(['accept', 'reject']);

const email = ref(props.managedUser.email);
const username = ref(props.managedUser.username);
const role = ref(props.managedUser.role);
const password = ref('');

const error = ref(false);

const accept = async () => {
  const updatedUser = {
    user_id: props.managedUser.user_id,
    username: username.value,
    email: email.value,
    password: password.value.length > 0 ? password.value : props.managedUser.password,
    role: role.value
  }
  await updateUser(updatedUser)
      .then(res => set(error, false))
      .catch(err => set(error, true));
  if (!error.value) {
    emit('accept');
  }
};

const reject = () => {
  emit('reject');
};
</script>

<template>
  <div>
    <div class="user-form-container">
      <div class="grid grid-cols-2 gap-4">
        <div class="item-row">
          <span>Nazwa</span>
          <BasicInput :placeholder="managedUser.username" v-model="username" />
        </div>
        <div class="item-row">
          <span>Email</span>
          <BasicInput :placeholder="managedUser.email" v-model="email" />
        </div>
        <div class="item-row">
          <span>Rola</span>
          <BasicInput :placeholder="managedUser.role" v-model="role" />
        </div>
        <div class="item-row">
          <span>Hasło</span>
          <BasicInput placeholder="Nowe hasło..." v-model="password" />
        </div>
      </div>
      <div class="user-form-actions">
        <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
        <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
      </div>
      <Transition name="fade">
        <span v-if="error" class="error-message">Nazwa lub Email już istnieje</span>
      </Transition>
    </div>
  </div>
</template>