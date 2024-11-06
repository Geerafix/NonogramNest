import { computed } from "vue";

export function useNonogram(nonogram) {
    const setBoardSize = (size) => {
        nonogram.value.nonogram.size = size;
    };

    const setNewBoard = () => {
        nonogram.value.newBoard();
    };

    const resetBoard = () => {
        nonogram.value.resetBoard();
    };

    const checkSolution = () => {
        const solution = nonogram.value.checkSolution();
        return {isSolved: solution.isSolved, lostPoints: solution.lostPoints}
    };

    const paintAnswer = (x, y) => {
        nonogram.value.paintAnswer(y, x);
    };

    const cluesX = computed(() => nonogram.value?.nonogram?.cluesX);
    const cluesY = computed(() => nonogram.value?.nonogram?.cluesY);
    const answers = computed(() => nonogram.value?.nonogram?.answers);
    const boardSize = computed(() => nonogram.value?.nonogram?.size);

    return {
        cluesX,
        cluesY, 
        answers,
        boardSize,
        setBoardSize, 
        setNewBoard, 
        checkSolution,
        resetBoard,
        paintAnswer
    };
}