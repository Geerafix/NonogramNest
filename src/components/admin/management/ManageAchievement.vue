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
            <BasicInput :placeholder="achievement.name || 'Nazwa...'" v-model="name" />
          </div>
          <div class="flex gap-4">
            <div class="item-row">
              <span>Kolumna</span>
              <BasicInput :placeholder="achievement.type || 'Kolumna...'" v-model="type" />
            </div>
            <div class="item-row">
              <span>Ilość</span>
              <BasicInput :placeholder="achievement.criteria || 'Ilość...'" v-model="criteria" type="number" />
            </div>
          </div>
        </div>
        <div class="item-row">
          <span>Opis</span>
          <TextArea :placeholder="achievement.description || 'Opis...'" v-model="description" />
        </div>
      </div>
      <Actions @delete="delAchievement" @reject="reject" @accept="accept" class="col-span-2"/>
    </div>
  </div>
</template>