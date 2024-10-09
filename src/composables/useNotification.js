export function useNotification(notification) {
    const notify = (status, message) => {
        notification.value.show(status, message);
    };

    return {notify};
}