const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('blank', 'images/blanksquare.png')
    this.load.image('cell', 'images/cell.png');
    this.load.image('1', 'images/bee.png');
    this.load.image('2', 'images/bee2.png');
    this.load.image('background', 'images/background.png'); // preload background image
}

function createCellTexture() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff);
    graphics.fillRect(0, 0, 100, 100);
    return graphics.generateTexture();
}

function create() {
    this.add.image(400, 300, 'background').setScale(0.5); // add background image
    this.add.image(195, 150, 'cell').setScale(1);
    this.add.images(0, 0, 'blank').setScale(1)

    const cellTexture = createCellTexture();

    // Add the 3x3 grid cells
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = this.add.sprite(100 * i + 50, 100 * j + 50, 'cell').setInteractive();
            cell.setOrigin(0.5);
            cell.setData('index', i + j * 3);
            cell.on('pointerdown', handleClick);
        }
    }
}

let currentPlayer = '1';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (gameBoard.every(cell => cell !== '')) {
        return 'tie';
    }

    return null;
}

function handleClick() {
    if (!gameEnded) {
        const cellIndex = this.getData('index');
        if (!gameBoard[cellIndex]) {
            gameBoard[cellIndex] = currentPlayer;
            this.setProperty(currentPlayer);
            const winner = checkWinner();
            if (winner) {
                if (winner === 'tie') {
                    alert('It\'s a tie!');
                } else {
                    alert(`Player ${winner} wins!`);
                }
                gameEnded = true;
            } else {
                currentPlayer = currentPlayer === '1' ? '2' : '1';
            }
        }
    }
}
