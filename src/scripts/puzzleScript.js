export function generateAndFindHints(nonogram, size) {
    Object.assign(nonogram, { answers: [], board: [], cluesX: [], cluesY: [], paused: false });
    
    nonogram.answers = Array.from(Array(size), () => Array(size).fill(0));
    nonogram.board = Array.from(Array(size), () => Array(size).fill().map(() => Math.floor(Math.random() * 2)));
    
    nonogram.board.forEach((row, rowIdx) => {
        nonogram.cluesX[rowIdx] = []; nonogram.cluesY[rowIdx] = [];
        let ansX = 0, ansY = 0;
        row.forEach((col, colIdx) => {
            ansX += col;
            ansY += nonogram.board[colIdx][rowIdx];
            if (col === 0 && ansX) {
                nonogram.cluesX[rowIdx].push(ansX);
                ansX = 0;
            }
            if (nonogram.board[colIdx][rowIdx] === 0 && ansY) {
                nonogram.cluesY[rowIdx].push(ansY);
                ansY = 0;
            }
        });
        if (ansX) {
            nonogram.cluesX[rowIdx].push(ansX);
        }
        if (ansY) {
            nonogram.cluesY[rowIdx].push(ansY);
        }
    });
}

export function check(nonogram) {
    let x = 0, y = 0, checkX = [], checkY = [], ansX = 0, ansY = 0;

    nonogram.board.forEach((row, rowIdx) => {
        checkX.push([]); checkY.push([]);
        row.forEach((col, colIdx) => {
            if (nonogram.answers[rowIdx][colIdx] === 1) {
                ansX += 1;
            }
            if (nonogram.answers[rowIdx][colIdx] === 0 && ansX !== 0) { 
                checkX[rowIdx].push(ansX);
                ansX = 0;
                x += 1; 
            }
            if (nonogram.answers[colIdx][rowIdx] === 1) {
                ansY += 1;
            }
            if (nonogram.answers[colIdx][rowIdx] === 0 && ansY !== 0) { 
                checkY[rowIdx].push(ansY); 
                ansY = 0; 
                y += 1;
            }
        });
        if (ansX !== 0) { 
            checkX[rowIdx].push(ansX);
            ansX = 0; 
        }
        if (ansY !== 0) { 
            checkY[rowIdx].push(ansY); 
            ansY = 0; 
        }
        x = 0;
        y = 0;
    });

    let counter = 0;
    let X = nonogram.cluesX.every((row, rowIdx) => row.every((el, colIdx) => el === checkX[rowIdx][colIdx]));
    let Y = nonogram.cluesY.every((row, rowIdx) => row.every((el, colIdx) => el === checkY[rowIdx][colIdx]));

    nonogram.cluesX.forEach((row, rowIdx) => {
        row.forEach((el, colIdx) => {
            if (el !== checkX[rowIdx][colIdx]) counter += 1;
        });
    });

    nonogram.cluesY.forEach((row, rowIdx) => {
        row.forEach((el, colIdx) => {
            if (el !== checkY[rowIdx][colIdx]) counter += 1;
        });
    });
    return { X, Y, counter };
}