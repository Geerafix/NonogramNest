import {ref, computed} from "vue";

export function usePagination(initialPage, initialLimit, initialItems) {
    const page = ref(initialPage);
    const limit = ref(initialLimit);
    const items = ref(initialItems);

    const pageState = computed(() => ({
        page: page.value,
        limit: limit.value,
        perpage: items.value.length,
        prev: () => page.value -= 1,
        next: () => page.value += 1
    }));

    const pageReset = () => (page.value = 1);

    return {pageState, pageReset};
}