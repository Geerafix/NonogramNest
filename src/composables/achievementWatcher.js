import {inject, onMounted, ref} from "vue";
import {getAchievementCount} from "@/services/userService.js";
import {set} from "@vueuse/core";

export const achievementWatcher = () => {
    const showNotification = inject('show');
    let achievementCount = ref();

    onMounted(async () => {
        await getAchievementCount().then((res) => set(achievementCount, res.data));
        console.log(achievementCount.value)
    });

    const watcher = async () => {
        await getAchievementCount().then((res) => {
            const count = parseInt(res.data);

            if (achievementCount.value !== count) {
                showNotification(true, 'Zdobyto nowe osiągnięcie.');
            }
        });
    };

    return {watcher}
}