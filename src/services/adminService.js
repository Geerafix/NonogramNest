import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({baseURL: apiUrl, withCredentials: true});

export function getUsers(search, option, page, limit) {
    return api.get('/users', {
        params: {
            search: search,
            option: option,
            page: page, 
            limit: limit
        }
    });
}

export function getAdmins(search, option, page, limit) {
    return api.get('/admins', {
        params: {
            search: search,
            option: option,
            page: page,
            limit: limit
        }
    });
}

export function getUser(user_id) {
    return api.get('/user', {
        params: {
            user_id: user_id
        }
    });
}

export function updateUser(user) {
    return api.put('/user', {
        user: user
    });
}

export function getPuzzles(page, limit) {
    return api.get('/puzzles', {
        params: {
            page: page,
            limit: limit
        }
    });
}

export function getAchievements(page, limit) {
    return api.get('/admin/achievements');
}

export function getMessages(page, limit) {
    return api.get('/messages', {
        params: {
            page: page,
            limit: limit
        }
    });
}