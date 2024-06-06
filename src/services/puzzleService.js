import axios from "axios";

const apiUrl = 'http://localhost:3000';

export async function postPuzzle(cluesX, cluesY, size) {
    return await axios({ 
        method: 'POST', 
        url: `${apiUrl}/nonograms`, 
        withCredentials: true,
        data: { 
            cluesX: JSON.stringify(cluesX), 
            cluesY: JSON.stringify(cluesY),
            size: size
        } 
    });
}

export async function postSolvedPuzzle(puzzleId, time, points) {
    return await axios({ 
        method: 'POST', 
        url: `${apiUrl}/solved`, 
        withCredentials: true,
        data: { 
            puzzleId: puzzleId,
            time: time,
            points: points
        } 
    });
}