import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export async function postSignIn(username, password) {
    return await axios({ 
        method: 'POST', 
        url: `${apiUrl}/signin`, 
        withCredentials: true,
        data: { username: username, password: password }
    });
}

export async function postSignUp(email, username, password) {
    return await axios({ 
        method: 'POST', 
        url: `${apiUrl}/signup`, 
        withCredentials: true,
        data: { email: email, username: username, password: password }
    });
}

export async function logout() {
    return await axios({ 
        method: 'POST', 
        url: `${apiUrl}/logout`, 
        withCredentials: true
    });
}

export async function getRole() {
    return await axios({ 
        method: 'POST', 
        url: 'http://localhost:3000/role', 
        withCredentials: true
    });
}