<script setup>
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";
import TextArea from "@/components/shared/inputs/TextArea.vue";
import {ref} from "vue";
import {deleteAchievement, postAchievement, updateAchievement} from "@/services/adminService.js";

const props = defineProps(['achievement']);
const emit = defineEmits(['accept', 'reject']);

const name = ref(props.achievement.name);
const description = ref(props.achievement.description);
const type = ref(props.achievement.type);
const criteria = ref(props.achievement.criteria);

const accept = async () => {
    const achievement = {
      id: props.achievement.achievement_id,
      name: name.value,
      description: description.value,
      type: type.value,
      criteria: criteria.value
    }

    if (props.achievement.achievement_id) {
      await updateAchievement(achievement);
    } else {
      await postAchievement(achievement);
    }
    emit('accept');
};

const reject = () => {
    emit('reject');
};

const delAchievement = async () => {
    await deleteAchievement(props.achievement.achievement_id);
    emit('accept');
};
</script>

<template>
  <div>
    <div class="form-container">
      <div class="grid grid-cols-[1fr_auto] gap-4">
        <div class="grid gap-4">
          <div class="item-row [&>*]:!w-full">
            <span>Nazwa</span>
            <BasicInput :placeholder="achievement.name || 'Nazwa...'" v-model="name" />
          </div>
          <div class="flex gap-4">
            <div class="item-row">
              <span>Kolumna</span>
              <BasicInput :placeholder="achievement.type || 'Kolumna...'" v-model="type" />
            </div>
            <div class="item-row">
              <span>Ilość</span>
              <BasicInput :placeholder="achievement.criteria || 'Ilość...'" v-model="criteria" />
            </div>
          </div>
        </div>
        <div class="item-row">
          <span>Opis</span>
          <TextArea :placeholder="achievement.description || 'Opis...'" v-model="description" />
        </div>
      </div>
      <div class="form-actions">
        <BasicButton @click="delAchievement" class="!bg-red-600/70" v-if="achievement.achievement_id">
          <Icon icon="fa-solid fa-trash"/>
        </BasicButton>
        <BasicButton @click="reject">
          <Icon icon="fa-solid fa-xmark"/>
        </BasicButton>
        <BasicButton @click="accept" class="!bg-teal-900">
          <Icon icon="fa-solid fa-check"/>
        </BasicButton>
      </div>
    </div>
  </div>
</template>