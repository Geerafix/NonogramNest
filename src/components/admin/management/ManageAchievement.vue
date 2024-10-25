<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import {ref} from "vue";
import {updateUser} from "@/services/adminService.js";
import {set} from "@vueuse/core";
import TextArea from "@/components/shared/inputs/TextArea.vue";

const props = defineProps(['achievement']);
const emit = defineEmits(['accept', 'reject']);

const name = ref(props.achievement.name);
const type = ref(props.achievement.type);
const criteria = ref(props.achievement.criteria);
const description = ref(props.achievement.description);

const accept = async () => {
    emit('accept');
};

const reject = () => {
    emit('reject');
};
</script>

<template>
  <div>
    <div class="form-container">
      <div class="grid grid-cols-[1fr_auto] gap-4">
        <div class="grid gap-4">
          <div class="item-row [&>*]:!w-full">
            <span>Nazwa</span>
            <BasicInput :placeholder="achievement.name" v-model="name" />
          </div>
          <div class="flex gap-4">
            <div class="item-row">
              <span>Kolumna</span>
              <BasicInput :placeholder="achievement.type" v-model="type" />
            </div>
            <div class="item-row">
              <span>Ilość</span>
              <BasicInput :placeholder="achievement.criteria" v-model="criteria" />
            </div>
          </div>
        </div>
        <div class="item-row">
          <span>Opis</span>
          <TextArea :placeholder="achievement.description" v-model="description" />
        </div>
      </div>
      <div class="form-actions">
        <BasicButton @click="reject"><Icon icon="fa-solid fa-xmark"/></BasicButton>
        <BasicButton @click="accept"><Icon icon="fa-solid fa-check"/></BasicButton>
      </div>
    </div>
  </div>
</template>