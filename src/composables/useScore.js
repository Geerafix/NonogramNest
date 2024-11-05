import {set, useInterval} from "@vueuse/core";
import {onMounted, ref, watch} from "vue";

export function useScore() {
    const {counter, pause, resume, reset} = useInterval(1000, {controls: true});

    const initialPoints = ref(null);
    const points = ref(null);
    
    const started = ref(false);
    const paused = ref(true);
    
    const setPoints = (value) => {
        set(points, value);
        if (initialPoints.value === null) {
            set(initialPoints, value);
        }
    }

    const setTime = (time) => {
        set(counter, time);
    };

    const startTime = () => {
        set(started, true);
        set(paused, false);
    };

    const pauseTime = () => {
        set(paused, !paused.value);
        pause();
    };

    const clearPoints = () => {
        set(started, false);
        set(points, null);
        set(initialPoints, null);
    };

    watch(paused, (newValue) => newValue ? pause() : resume());

    watch(started, (newValue) => {
        if (!newValue) {
            pause();
            reset();
        } else {
            resume();
        }
    }, {immediate: true});

    onMounted(pause);

    return {
        setPoints,
        clearPoints, 
        setTime,
        startTime,
        pauseTime,
        time: counter, 
        points, 
        paused,
        started
    };
}