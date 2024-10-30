import {inject} from "vue";

export function useNotification() {
    const show = inject('show');

    const notify = (status, message, time) => {
        show(status, message, time);
    };

    return {notify};
}