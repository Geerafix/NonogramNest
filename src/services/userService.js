import axios from 'axios';

const apiUrl = 'http://localhost:3000';
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

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

export function postLogOut() {
    return api.post('/logout');
}

export async function getUserProfile() {
    return api.get('/profile');
}

export async function getUserRole() {
    try {
        const res = await api.post('/role');
        return res.data.role;
    } catch (err) {
        console.log(err.message);
    }
}