import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export function getUsers(page, limit) {
    return axios({
        method: 'GET',
        url: `${apiUrl}/users`,
        withCredentials: true,
        params: {
            page: page,
            limit: limit
        }
    });
}