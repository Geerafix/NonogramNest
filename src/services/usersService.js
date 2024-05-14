import axios from 'axios';

export async function postSignIn(username, password) {
    return await axios({ 
        method: 'POST', 
        url: 'http://localhost:3000/signin', 
        data: { username: username, password: password }
    });
}

export async function postSignUp(email, username, password) {
    return await axios({ 
        method: 'POST', 
        url: 'http://localhost:3000/signup', 
        data: { email: email, username: username, password: password }
    });
}