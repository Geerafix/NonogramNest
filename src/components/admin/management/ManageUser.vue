<script setup>
import {reactive} from "vue";
import {deleteUser, updateUser} from "@/services/adminService.js";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {useTrailingBox} from "@/composables/useTrailingBox.js";
import IconInvalid from "@/components/auth/IconInvalid.vue";
import IconValid from "@/components/auth/IconValid.vue";
import TrailingBox from "@/components/shared/TrailingBox.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import Actions from "@/components/admin/management/Actions.vue";

const props = defineProps(['user']);
const emit = defineEmits(['accept', 'reject', 'view']);

const form = reactive({
  username: props.user.username,
  email: props.user.email,
  role: props.user.role,
  password: ''
});
const fieldsHeaders = ['Nazwa', 'E-mail', 'Rola', 'Hasło'];
const rules = {
  username: {
    min: 5, max: 20, required: true,
    message: 'Nazwa musi mieć od 5 do 20 znaków.'
  },
  email: {
    type: 'email', required: true,
    message: 'Niepoprawny format adresu e-mail.'
  },
  role: {
    validator: (rule, value) => ['user', 'admin'].includes(value), required: true,
    message: "Tylko 'admin' lub 'user'."
  },
  password: {
    validator: (rule, value) => {
      if (value.length === 0) return true;
      return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,;:=+<>]).{8,}$/.test(value);
    },
    message: 'Hasło musi zawierać co najmniej 8 znaków, w tym wielkie i małe litery, cyfry oraz znaki specjalne.'
  }
}
const {pass, errorFields} = useAsyncValidator(form, rules);
const {showBox, hideBox, message, isHovered} = useTrailingBox();
const content = [
  {name: 'Tryb klasyczny', view: 'classic', icon: 'chess-board'},
  {name: 'Tryb wyzwania', view: 'challenge', icon: 'trophy'},
  {name: 'Plansze', view: 'created', icon: 'pen-to-square'},
  {name: 'Profil', view: 'profile', icon: 'address-card'},
];

const accept = async () => {
  const updatedUser = {
    user_id: props.user.user_id,
    username: form.username,
    email: form.email,
    password: form.password.length > 0 ? form.password : props.user.password,
    role: form.role
  }
  await updateUser(updatedUser)
      .then((_) => emit('accept', true, 'Zaktualizowano dane użytkownika'))
      .catch((_) => emit('accept', false, 'Nazwa lub Email już istnieje.'));
};

const reject = () => emit('reject');

const delUser = async () => {
  await deleteUser(props.user.user_id);
  emit('accept', false, 'Usunięto użytkownika');
};
</script>

<template>
  <div>
    <div class="form-container grid-cols-[auto_auto] gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="item-row" v-for="(field, key, idx) of form">
          <div class="header-info">
            <span>{{fieldsHeaders[idx]}}</span>
            <component :is="errorFields?.[key] ? IconInvalid : IconValid" @mouseover="showBox(rules[key].message)" @mouseleave="hideBox"/>
          </div>
          <BasicInput :placeholder="fieldsHeaders[idx].concat('...')" v-model="form[key]"/>
        </div>
      </div>
      <div class="item-row !gap-2" v-if="props.user.role === 'user'">
        <span class="text-center">Zawartość</span>
        <BasicButton class="button-restyle" v-for="el in content" :buttonText="el.name" @click="emit('view', el.view)">
          <Icon :icon="['fa-solid', `fa-${el.icon}`]" class="order-first mx-auto"/>
        </BasicButton>
      </div>
      <Actions @delete="delUser" @reject="reject" @accept="accept" class="col-span-2"/>
    </div>
    <TrailingBox :message="message" :isHovered="isHovered" />
  </div>
</template>