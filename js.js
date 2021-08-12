// DOM 
const gameContainer = document.querySelector('#game-container');
const gameSquares = document.querySelectorAll('.field');
const resetBtn = document.querySelector('#reset-btn');
const displayMessage = document.querySelector('#display-msg')

//Gameboard Module, functions that create the game container.
const gameBoard = (function() {

const board = ['','','','','','','','',''];


    return {
        board
    }
})();

//Player function Factory
const Player = (playerSign) => {
    const getSign = () => playerSign;
    const selectedSquares = [];

    return {
        getSign,
        selectedSquares,
    }
};


//Game controller module, functions that controll the game
const displayController = (function() {
let round = 1;
let isOver = false;
const updateBoard = () => {
    for (let i = 0; i < gameSquares.length; i++) {
        gameSquares[i].textContent = gameBoard.board[i]
    };
    displayController.winnerCheck();
    displayController.gameOver();
};
const getCurrentSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
}
const displayMsg = (msg) => {
    displayMessage.textContent = msg;
}
const gameOver = () => {
    if (round === 9 && isOver === false) {
        displayMsg('Draw')
    };
}
const resetGame = () => {
    gameBoard.board = ['','','','','','','','','']
    round = 1
    isOver = false;
    playerO.selectedSquares = [];
    playerX.selectedSquares = [];
    displayMessage.textContent = `Player X's turn`;
    displayController.update()
}
const winnerCheck = () => {
for (let i = 0; i < displayController.winConditions.length; i++) {
    if (displayController.winConditions[i].every(x => playerX.selectedSquares.includes(x))) {
        displayMsg('Player X Winner!')
        isOver = true;
    } else if (displayController.winConditions[i].every(x => playerO.selectedSquares.includes(x))) {
        displayMsg('Player O Winner!')
        isOver = true;

}
};
};

const winConditions = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
   ];

gameSquares.forEach(div => { div.addEventListener('click', (e) => {
    if (gameBoard.board[e.target.id] === '') {
        gameBoard.board[e.target.id] = displayController.currentSign()
    if (round % 2 === 1) {
        playerX.selectedSquares.push(e.target.id)
        displayMsg(`Player O's turn`)
    } else {
        playerO.selectedSquares.push(e.target.id)
        displayMsg(`Player X's turn`)
    };
        displayController.update();
        round++
    }; 
});
});

resetBtn.addEventListener('click', () => resetGame()
);
    return {
      update: updateBoard,
      currentSign: getCurrentSign,
      gameOver: gameOver,
      winnerCheck: winnerCheck,
      winConditions: winConditions,
    }
})();

const playerX = Player('X');
const playerO = Player('O');
