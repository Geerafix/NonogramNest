import {computed} from "vue";

export function useList(headers, items, excluded) {
    const listState = computed(() => ({
        headers: headers,
        items: items.value,
        excluded: excluded
    }));

    return listState;
}