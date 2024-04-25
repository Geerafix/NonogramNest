<script setup>
import { ref } from 'vue'
import BasicButton from '../UIcomponents/BasicButton.vue';

let answers = ref([]);
let nonogram = ref([]);
let cluesX = ref([]);
let cluesY = ref([]);
const size = 6;

// funkcja sprawdzająca nasze rozwiązanie
function check() {
    let iX = 0, iY = 0;
    let checkX = [], checkY = [];
    let ansX = 0, ansY = 0;

    for (let row = 0; row < nonogram.value.length; row++) {
        checkX.push([]);
        checkY.push([]);
        for (let col = 0; col < nonogram.value.length; col++) {
            if (answers.value[row][col] === 1) {
                ansX += 1;
            }
            if (answers.value[row][col] === 0 && ansX !== 0) {
                checkX[row][iX++] = ansX;
                ansX = 0;
            }
            if (answers.value[col][row] === 1) {
                ansY += 1;
            }
            if (answers.value[col][row] === 0 && ansY !== 0) {
                checkY[row][iY++] = ansY;
                ansY = 0;
            }
        }
        if (ansX !== 0) {
            checkX[row][iX++] = ansX;
            ansX = 0;
        }
        if (ansY !== 0) {
            checkY[row][iY++] = ansY;
            ansY = 0;
        }
        iX = 0;
        iY = 0;
    }

    let isSolvedX = true, isSolvedY = true;
    cluesX.value.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => {
            if (element !== checkX[rowIndex][colIndex]) {
                isSolvedX = false;
            }
        });
    });
    cluesY.value.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => {
            if (element !== checkY[rowIndex][colIndex]) {
                isSolvedY = false;
            }
        });
    });

    if (isSolvedX === true && isSolvedY) {
        alert("Rozwiązano");
    } else {
        alert("Spróbuj jeszcze raz");
    }
}

// funkcja kolorująca pojedynczą kratkę
function paint(row, col, cell) {
    if (answers.value[row][col] === 0) {
        answers.value[row][col] = 1;
        cell.style.backgroundColor = 'black';
    } else {
        answers.value[row][col] = 0;
        cell.style.backgroundColor = 'white';
    }
    console.log(row + ", " + col);
}

// funkcja generująca nowy nonogram
function generateAndFindHints() {
    answers.value = [];
    nonogram.value = [];
    cluesX.value = [];
    cluesY.value = [];
    for (let row = 0; row < size; row++) {
        answers.value.push([]);
        nonogram.value.push([]);
        for (let col = 0; col < size; col++) {
            answers.value[row][col] = 0;
            nonogram.value[row].push(Math.floor(Math.random() * 2));
        }
    }
    let ansX = 0, ansY = 0;
    for (let row = 0; row < nonogram.value.length; row++) {
        cluesX.value.push([]);
        cluesY.value.push([]);
        for (let col = 0; col < nonogram.value.length; col++) {
            if (nonogram.value[row][col] === 1) {
                ansX += 1;
            }
            if (nonogram.value[row][col] === 0 && ansX !== 0) {
                cluesX.value[row].push(ansX);
                ansX = 0;
            }
            if (nonogram.value[col][row] === 1) {
                ansY += 1;
            }
            if (nonogram.value[col][row] === 0 && ansY !== 0) {
                cluesY.value[row].push(ansY);
                ansY = 0;
            }
        }
        if (ansX !== 0) {
            cluesX.value[row].push(ansX);
            ansX = 0;
        }
        if (ansY !== 0) {
            cluesY.value[row].push(ansY);
            ansY = 0;
        }
    }
}
</script>

<template>
    <main class="mt-6 font-thin font-sans">
        <div class="grid gap-0.5 grid-cols-[min-content_1fr] w-fit mx-auto">
            <div class="w-full h-full bg-gray-600 border-t-4 border-l-4 border-gray-700 rounded-sm rounded-ss-lg"></div>
            <div class="bg-gray-600 p-1 rounded-sm flex gap-[1.5px] rounded-se-md border-t-4 border-gray-700">
                <div v-for="ans in cluesY" class="content-end">
                    <div class="w-14 rounded-sm text-center text-white flex flex-col">
                        <div v-for="single in ans" class="text-xl">
                            <p>{{ single }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-600 p-1 rounded-sm w-fit flex flex-col gap-[1.5px] rounded-es-md border-l-4 border-gray-700">
                <div v-for="ans in cluesX" class="mx-[3px] flex justify-end items-center">
                    <div class="h-14 rounded-sm text-center text-white flex items-center">
                        <div v-for="single in ans" class="text-xl">
                            <p>&nbsp;{{ single }}&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-700 rounded-sm p-1 grid grid-flow-col gap-[1.5px]">
                <div v-for="row in nonogram.length" class="grid grid-flow-row gap-[1.5px]">
                    <div class="w-full h-full rounded-sm bg-white text-center cursor-pointer transition"
                        v-for="col in nonogram.length" @click="paint(col - 1, row - 1, $event.target)">
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center gap-1 my-2">
            <BasicButton btnText="Nowy nonogram" :btnAction="generateAndFindHints" class="absolute left-3 bottom-3"></BasicButton>
            <BasicButton btnText="Sprawdź" :btnAction="check" class="absolute right-3 bottom-3"></BasicButton>
        </div>
    </main>
</template>