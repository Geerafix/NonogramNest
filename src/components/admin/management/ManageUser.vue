<script setup>
import {onMounted, reactive, ref, watchEffect} from "vue";
import {deleteUser, updateUser} from "@/services/adminService.js";
import {set} from "@vueuse/core";
import {useAsyncValidator} from "@vueuse/integrations/useAsyncValidator";
import {useTrailingBox} from "@/composables/useTrailingBox.js";
import IconInvalid from "@/components/auth/IconInvalid.vue";
import IconValid from "@/components/auth/IconValid.vue";
import TrailingBox from "@/components/shared/TrailingBox.vue";

const props = defineProps(['user']);
const emit = defineEmits(['accept', 'reject']);

const error = ref(false);
const form = reactive({
  username: props.user.username,
  email: props.user.email,
  role: props.user.role,
  password: ''
});
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

const accept = async () => {
  const updatedUser = {
    user_id: props.user.user_id,
    username: form.username,
    email: form.email,
    password: form.password.length > 0 ? form.password : props.user.password,
    role: form.role
  }
  await updateUser(updatedUser)
      .then((_) => set(error, false))
      .catch((_) => set(error, true));
  if (!error.value && pass.value) {
    emit('accept', true, 'Zaktualizowano dane użytkownika');
  }
};

const reject = () => {
  emit('reject');
};

const delUser = async () => {
  await deleteUser(props.user.user_id);
  emit('accept', false, 'Usunięto użytkownika');
};
</script>

<template>
  <div>
    <div class="form-container">
      <div class="grid grid-cols-2 gap-4">
        <div class="item-row">
          <div class="header-info">
            <span>Nazwa</span>
            <component :is="errorFields?.username ? IconInvalid : IconValid"
                       @mouseover="showBox(rules.username.message)" @mouseleave="hideBox"/>
          </div>
          <BasicInput :placeholder="form.username" v-model="form.username" />
        </div>
        <div class="item-row">
          <div class="header-info">
            <span>E-mail</span>
            <component :is="errorFields?.email ? IconInvalid : IconValid"
                       @mouseover="showBox(rules.email.message)" @mouseleave="hideBox"/>
          </div>
          <BasicInput :placeholder="form.email" v-model="form.email" />
        </div>
        <div class="item-row">
          <div class="header-info">
            <span>Rola</span>
            <component :is="errorFields?.role ? IconInvalid : IconValid"
                       @mouseover="showBox(rules.role.message)" @mouseleave="hideBox"/>
          </div>
          <BasicInput :placeholder="form.role" v-model="form.role" />
        </div>
        <div class="item-row">
          <div class="header-info">
            <span>Hasło</span>
            <component :is="errorFields?.password ? IconInvalid : IconValid"
                       @mouseover="showBox(rules.password.message)" @mouseleave="hideBox"/>
          </div>
          <BasicInput placeholder="Nowe hasło..." v-model="form.password" />
        </div>
      </div>
      <div class="form-actions">
        <BasicButton @click="delUser" class="!bg-red-600/70">
          <Icon icon="fa-solid fa-trash"/>
        </BasicButton>
        <BasicButton @click="reject">
          <Icon icon="fa-solid fa-xmark"/>
        </BasicButton>
        <BasicButton @click="accept" class="!bg-teal-900">
          <Icon icon="fa-solid fa-check"/>
        </BasicButton>
      </div>
      <Transition name="fade">
        <span v-if="error" class="error-message">Nazwa lub Email już istnieje</span>
      </Transition>
    </div>
    <TrailingBox :message="message" :isHovered="isHovered" />
  </div>
</template>