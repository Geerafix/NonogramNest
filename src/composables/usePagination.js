import {ref, computed, watch} from "vue";

export function usePagination(initialPage, initialItems) {
    const initialLimit = 10;
    const page = ref(initialPage);
    const items = ref(initialItems);
    const limit = ref(initialLimit + 1);
    const pass = ref(false);

    const pageState = computed(() => ({
        page: page.value,
        limit: limit.value,
        perpage: items.value.length + (pass.value ? 1 : 0),
        prev: () => page.value -= 1,
        next: pass.value ? () => page.value += 1 : () => {}
    }));

    const pageReset = () => (page.value = 1);

    watch(initialItems, () => {
        if (initialItems.value.length === limit.value) {
            initialItems.value.pop();
            pass.value = true;
        } else {
          pass.value = false;
        }

        if (initialItems.value.length === 0 && page.value > 1) {
            page.value -= 1;
        }
    });

    return {pageState, pageReset};
}