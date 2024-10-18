import {computed, watch} from "vue";
import {useMousePressed} from "@vueuse/core";

export function useBlurOnView(object, closeable) {
    const {pressed} = useMousePressed();

    watch(pressed, () => {
        if (object.value && pressed && closeable) {
            object.value = null;
        }
    });

    const blurred = computed(() =>
        object.value ? 'opacity-25 brightness-80 blur-sm pointer-events-none' : ''
    );

    return {blurred};
}