import {computed, isRef} from "vue";

export function useList(headers, items, excluded) {
    const listState = computed(() => ({
        headers: isRef(headers) ? headers.value : headers,
        items: items.value,
        excluded: excluded
    }));

    return listState;
}