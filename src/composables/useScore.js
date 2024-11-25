import {useInterval} from "@vueuse/core";
import {onMounted, ref, watch} from "vue";

export function useScore() {
    const {counter, pause, resume, reset} = useInterval(1000, {controls: true});
    const points = ref(null);
    const started = ref(null);
    const paused = ref(true);
    
    const setPoints = (value) => {
        points.value = value;
    }

    const setTime = (value) => {
        counter.value = value;
    };

    const startTime = () => {
        started.value = true;
        paused.value = false;
    };

    const pauseTime = () => {
        paused.value = !paused.value;
        pause();
    };

    const clearPoints = () => {
        started.value = false;
        points.value = null;
    };

    watch(paused, (newValue) => {
        if (newValue) {
            pause();
        } else {
            resume();
        }
    });

    onMounted(pauseTime);

    return {
        setPoints,
        clearPoints, 
        setTime,
        resetTime: reset,
        startTime,
        pauseTime,
        time: counter, 
        points, 
        paused,
        started
    };
}