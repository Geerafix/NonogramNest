export const useNonogramStore = () => {
    const save = (nonogram, time, points) => {
        localStorage.setItem('nonogram', JSON.stringify({
            nonogram: nonogram.value.nonogram,
            time: time.value,
            points: points.value
        }));
    }

    const load = (nonogram, time, points, started, pauseTime) => {
        try {
            const saved = JSON.parse(localStorage.getItem('nonogram'));

            nonogram.value.nonogram.board = saved.nonogram.board;
            nonogram.value.nonogram.answers = saved.nonogram.answers;
            nonogram.value.nonogram.cluesX = saved.nonogram.cluesX;
            nonogram.value.nonogram.cluesY = saved.nonogram.cluesY;
            nonogram.value.nonogram.size = saved.nonogram.size;

            time.value = saved.time;
            points.value = saved.points;
            started.value = true;

            pauseTime();
        } catch (err) {
            remove();
        }
    };

    const remove = () => {
        localStorage.removeItem('nonogram');
    };

    const isSaved = () => {
        return JSON.parse(localStorage.getItem('nonogram')) !== null;
    };

    return {save, load, remove, isSaved}
};