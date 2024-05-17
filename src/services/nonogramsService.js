import axios from "axios";

const apiUrl = 'http://localhost:3000';

export async function postNonogram(cluesX, cluesY) {
    return await axios({ 
        method: 'POST', 
        url: `${apiUrl}/nonograms`, 
        data: { 
            cluesX: JSON.stringify(cluesX), 
            cluesY: JSON.stringify(cluesY) 
        } 
    });
}