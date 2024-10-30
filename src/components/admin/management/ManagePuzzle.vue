<script setup>
import NonogramBoard from "@/components/user/game-creation/NonogramBoard.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import {onMounted, ref} from "vue";
import {deletePuzzle, updatePuzzle} from "@/services/adminService.js";

const props = defineProps(['id', 'puzzle']);
const emit = defineEmits(['accept', 'reject']);

const board = ref();

const accept = async () => {
  const bAnswers = board.value.answers.map((row) => row.map((cell) => cell === 1 ? 0 : cell));
  await updatePuzzle(props.id, bAnswers);
  emit('accept', true, 'Zatwierdzono planszę.');
};

const reject = () => {
  emit('reject');
};

const delPuzzle = async () => {
  await deletePuzzle(props.id);
  emit('accept', false, 'Usunięto planszę.');
};

onMounted(() => board.value.answers = props.puzzle);
</script>

<template>
  <div class="form-container">
    <NonogramBoard ref="board" class="!relative pointer-events-none"/>
    <div class="form-actions">
      <BasicButton @click="delPuzzle" class="!bg-red-600/70">
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
</template>