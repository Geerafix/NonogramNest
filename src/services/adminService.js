import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export async function getUsers(page, limit) {
    return await axios({
        method: 'POST',
        url: `${apiUrl}/users`,
        data: {
            page: page,
            limit: limit
        }
    });
}