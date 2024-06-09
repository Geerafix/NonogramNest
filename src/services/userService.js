import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export function postSignIn(username, password) {
    return axios({
        method: 'POST',
        url: `${apiUrl}/signin`,
        withCredentials: true,
        data: {
            username: username,
            password: password
        }
    });
}

export function postSignUp(email, username, password) {
    return axios({
        method: 'POST',
        url: `${apiUrl}/signup`,
        withCredentials: true,
        data: {
            email: email,
            username: username,
            password: password
        }
    });
}

export function logout() {
    return axios({
        method: 'POST',
        url: `${apiUrl}/logout`,
        withCredentials: true
    });
}

export function getRole() {
    return axios({
        method: 'POST',
        url: `${apiUrl}/role`,
        withCredentials: true
    })
    .then((res) => {
        return res.data.role
    })
    .catch((err) => {
        console.log(err.message);
    });
}