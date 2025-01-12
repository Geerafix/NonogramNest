<script setup>
import TextArea from "@/components/shared/inputs/TextArea.vue";
import {ref} from "vue";
import {deleteAchievement, postAchievement, updateAchievement} from "@/services/adminService.js";
import Actions from "@/components/admin/management/Actions.vue";

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
    emit('accept', true, 'Zaktualizowano osiągnięcie.');
  } else {
    await postAchievement(achievement);
    emit('accept', true, 'Dodano nowe osiągnięcie.');
  }
};

const reject = () => {
  emit('reject');
};

const delAchievement = async () => {
  await deleteAchievement(props.achievement.achievement_id);
  emit('accept', false, 'Usunięto osiągnięcie.');
};
</script>

<template>
  <div>
    <div class="form-container">
      <div class="grid grid-cols-[1fr_auto] gap-4">
        <div class="grid gap-4">
          <div class="item-row [&>*]:!w-full">
            <span>Nazwa</span>
            <BasicInput v-model="name" :placeholder="achievement.name || 'Nazwa...'"/>
          </div>
          <div class="flex gap-4">
            <div class="item-row">
              <span>Kolumna</span>
              <BasicInput v-model="type" :placeholder="achievement.type || 'Kolumna...'"/>
            </div>
            <div class="item-row">
              <span>Ilość</span>
              <BasicInput v-model="criteria" :placeholder="achievement.criteria || 'Ilość...'" type="number"/>
            </div>
          </div>
        </div>
        <div class="item-row">
          <span>Opis</span>
          <TextArea v-model="description" :placeholder="achievement.description || 'Opis...'"/>
        </div>
      </div>
      <Actions :class="['col-span-2', {'hidden-x': !achievement.achievement_id}]" @accept="accept" @delete="delAchievement"
               @reject="reject"/>
    </div>
  </div>
</template>

<style scoped>
.hidden-x > :first-child {
  @apply
  hidden
  !w-0
}
</style>