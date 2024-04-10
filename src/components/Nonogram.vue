<script setup>
import { ref } from 'vue'
    
let clues = ref([]);
const answer = [{i: 1, j: 1},
                {i: 2, j: 2},
                {i: 3, j: 3},
                {i: 4, j: 4},
                {i: 5, j: 5},
                {i: 1, j: 5},
                {i: 5, j: 1} ];
const dataY = [
    [1, 1],
    [1],
    [1],
    [1],
    [1, 1]
];

const dataX = [
    [1, 1],
    [1],
    [1],
    [1],
    [1, 1]
];

const size = 5;

// funkcja sprawdzająca nasze rozwiązanie
function check() {
    let isSolved = true;
    if (clues.value.length === answer.length) {
        if (clues.value.forEach(item => {
            if (!answer.some(clue => clue.i === item.i && clue.j === item.j)) {
                isSolved = false;
            }
        }));
    } else {
        isSolved = false;
        alert('Spróbuj jeszcze raz');
        return;
    }

    if (isSolved) {
        alert('Nonogram ukończony'); 
    } else {
        alert('Spróbuj jeszcze raz');
    }
}

// funkcja kolorująca pojedynczą kratkę
function paint(i, j, cell) {
    const clue = {i: i, j: j};
    if (!clues.value.some(item => item.i === clue.i && item.j === clue.j)) {
        clues.value.push(clue);
        cell.style.backgroundColor = 'black';
    } else {
        clues.value.splice(clues.value.indexOf(clues.value.find(item => item.i === clue.i && item.j === clue.j)), 1);
        cell.style.backgroundColor = 'white';
    }
    console.log(clue);
}
</script>

<template>
    <main class="mx-auto mt-14 w-fit">
        <div class="grid gap-1 grid-cols-[min-content_1fr]">
            <div class="w-fit"></div>
            <div class="bg-gray-600 p-1 rounded-sm grid grid-flow-col gap-1">
                <div v-for="d in dataX">
                    <div class="w-14 rounded-sm text-center text-white flex flex-col">
                        <div v-for="c in d">
                            <p>{{ c }}</p>
                        </div>
                    </div>
                </div>           
            </div>
            <div class="bg-gray-600 p-1 rounded-sm w-fit flex flex-col gap-1">
                <div v-for="d in dataY" :key="index" class="mx-1 flex justify-end items-center">
                    <div class="h-14 rounded-sm text-center text-white flex items-center">
                        <div v-for="r in d">
                            <p>&nbsp;{{ r }}&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-600 rounded-sm p-1 grid grid-flow-col gap-1">
                <div v-for="i in size" class="grid grid-flow-row gap-1">
                    <div class="w-14 h-14 rounded-sm bg-white text-center cursor-pointer transition" 
                        v-for="j in size" 
                        @click="paint(i, j, $event.target)">  
                    </div>
                </div>
            </div>
        </div>
        <button 
            class="bg-gray-600 p-2 mt-2 rounded-sm text-white m-auto flex hover:bg-gray-500 transition" 
            @click="check()">Sprawdź
        </button>
    </main>
</template>

<style scoped>

</style>
