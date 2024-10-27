import axios from 'axios';

const apiUrl = `http://${import.meta.env.VITE_SERVER_NETWORK}:${import.meta.env.VITE_SERVER_PORT}`;
const api = axios.create({baseURL: apiUrl, withCredentials: true});

export function postSignIn(username, password) {
    return api.post('/signin', {
        username: username,
        password: password
    });
}

export function postSignUp(email, username, password) {
    return api.post('/signup', {
        email: email,
        username: username,
        password: password
    });
}