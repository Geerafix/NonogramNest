import {inject, onMounted, ref} from "vue";
import {getAchievementCount} from "@/services/userService.js";
import {set} from "@vueuse/core";

export const achievementWatcher = () => {
    const showNotification = inject('show');
    const achievementCount = ref();

    onMounted(async () => {
        await getAchievementCount().then((res) => set(achievementCount, res.data));
    });

    const watcher = async () => {
        await getAchievementCount().then((res) => {
            const count = parseInt(res.data);

            if (achievementCount.value !== count) {
                showNotification(true, 'Zdobyto nowe osiągnięcie.', 3000);
            }
        });
    };

    return {watcher}
}