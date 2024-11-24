<script setup>
import NonogramBoard from "@/components/user/game-creation/NonogramBoard.vue";
import {onMounted, ref} from "vue";
import {deletePuzzle, updatePuzzle} from "@/services/adminService.js";
import Actions from "@/components/admin/management/Actions.vue";

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
    <Actions @delete="delPuzzle" @reject="reject" @accept="accept"/>
  </div>
</template>