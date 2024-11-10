import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({baseURL: apiUrl, withCredentials: true});

export function postLogOut() {
    return api.post('/logout');
}

export async function getUserProfile() {
    return api.get('/profile');
}

export async function updateUsername(username) {
    return api.put('/profile/username', {
        username: username
    });
}

export async function updateBio(bio) {
    return api.put('/profile/bio', {
        bio: bio
    });
}

export async function updatePassword(currentPassword, newPassword) {
    return api.put('/profile/password', {
        currentPassword: currentPassword,
        newPassword: newPassword
    });
}

export async function updatePfp(pfp) {
    return api.put('/profile/pfp', {
        pfp: pfp
    });
}

export async function updateEmail(email) {
    return api.put('/profile/email', {
        email: email
    });
}

export async function postMessage(title, content) {
    return api.post('/profile/message', {
        title: title,
        content: content
    });
}

export function getUserAchievements(page, limit) {
    return api.get('/user/achievements', {
        params: {
            page: page, 
            limit: limit
        }
    });
}

export function getAchievementCount() {
    return api.get('/user/achievements/count');
}

export async function getUserRole() {
    const res = await api.post('/role');
    return res.data.role;
}