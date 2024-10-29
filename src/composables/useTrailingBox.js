import {set} from "@vueuse/core";
import {computed, ref} from "vue";

export function useTrailingBox() {
    const message = ref(null);

    const showBox = (msg) => {
        set(message, msg);
    };

    const hideBox = () => {
        set(message, null);
    };

    const cMessage = computed(() => message.value);
    const cHovered = computed(() => message.value !== null);

    return {
        showBox,
        hideBox,
        message: cMessage,
        isHovered: cHovered,
    };
}