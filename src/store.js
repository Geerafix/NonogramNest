import {saveNonogram, loadNonogram, saveCreatedNonogram, loadCreatedNonogram} from "@/services/puzzleService.js";

export const useNonogramStore = () => {
    const save = async (nonogram, time, points) => {
        const nonogramData = {
            nonogram: nonogram.value.nonogram,
            time: time.value,
            points: points.value
        };

        const encoded = await saveNonogram(nonogramData).then(res => res.data);
        sessionStorage.setItem('saved', encoded);
    }

    const load = async (nonogram, time, points, started, pauseTime) => {
        try {
            const data = sessionStorage.getItem('saved');
            const decoded = await loadNonogram(data).then(res => res.data);

            nonogram.value.nonogram.board = decoded.nonogram.board;
            nonogram.value.nonogram.answers = decoded.nonogram.answers;
            nonogram.value.nonogram.cluesX = decoded.nonogram.cluesX;
            nonogram.value.nonogram.cluesY = decoded.nonogram.cluesY;
            nonogram.value.nonogram.size = decoded.nonogram.size;
            time.value = decoded.time;
            points.value = decoded.points;
            started.value = true;
            pauseTime();
        } catch (err) {
            remove();
        }
    };

    const remove = () => {
        sessionStorage.removeItem('saved');
    };

    const isSaved = () => {
        return sessionStorage.getItem('saved') !== null;
    };

    return {save, load, remove, isSaved}
};

export const useCreatedStore = () => {
    const save = async (board) => {
        const encoded = await saveCreatedNonogram(board.value).then(res => res.data);
        sessionStorage.setItem('created', encoded);
    }

    const load = async (board) => {
        try {
            const data = sessionStorage.getItem('created');
            const decoded = await loadCreatedNonogram(data).then(res => res.data);

            board.value.answers = decoded.answers;
        } catch (err) {
            remove();
        }
    };

    const remove = () => {
        sessionStorage.removeItem('created');
    };

    const isSaved = () => {
        return sessionStorage.getItem('created') !== null;
    };

    return {save, load, remove, isSaved}
};