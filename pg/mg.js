const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);


let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let currentPlayer = 'Player 1'; 
let player1Score = 0;
let player2Score = 0;
let scoreTextPlayer1;
let scoreTextPlayer2;
let winText; 

const cardImages = [
  'card1',
  'card1', 
  'card2',
  'card2', 
  'card3',
  'card3', 
  'card4',
  'card4', 
  'card5',
  'card5', 
  'card6',
  'card6', 
  'card7',
  'card7',
  'card8',
  'card8', 
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}f

function preload() {
  this.load.image('background', 'images/background.png');
  this.load.image('card-back', 'images/card-back.png');
  this.load.image('card1', 'images/bee.png');
  this.load.image('card2', 'images/pentagon.png');
  this.load.image('card3', 'images/beevil.png');
  this.load.image('card4', 'images/beeofalltradeslogo.png');
  this.load.image('card5', 'images/playerBee.png');
  this.load.image('card6', 'images/beefilmStudiosLogo.png');
  this.load.image('card7', 'images/beehive.png'); 
  this.load.image('card8', 'images/honeyBottle.png');

  for (const cardImage of cardImages) {
    this.load.image(cardImage, `images/${cardImage}.png`);
  }
}

function create() {
  this.add.image(0, 0, 'background').setScale(1.1);

  shuffleArray(cardImages);

  const gridSize = 4; 
  const cardSize = 100;
  const spacing = 42;
  const xOffset = (config.width - gridSize * (cardSize + spacing)) / 2;
  const yOffset = (config.height - gridSize * (cardSize + spacing)) / 2;

  let cardx = 100;
  let cardy = 100;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = cardx + j * (cardSize + spacing);
      let y = cardy + i * (cardSize + spacing);

      const card = this.add.image(x, y, 'card-back').setInteractive().setScale(0.25);
      card.setData('flipped', false);
      card.setData('imageKey', cardImages[i * gridSize + j]); 
      card.on('pointerup', function () {
        if ((currentPlayer === 'Player 1' && this !== card2) || (currentPlayer === 'Player 2' && this !== card1)) {
          flipCard(this);
        }
      });
    }
  }

  scoreTextPlayer1 = this.add.text(config.width - 200, 265, 'Player 1 Score: 0', { font: '24px Arial', fill: '#ffffff' });

  scoreTextPlayer2 = this.add.text(config.width - 200, 300, 'Player 2 Score: 0', { font: '24px Arial', fill: '#ffffff' });

  winText = this.add.text(config.width / 2, config.height / 2, '', { font: '48px Arial', fill: '#ffffff' }).setOrigin(0.5);
  winText.setVisible(false);
}

function flipCard(card) {
  if (card.getData('flipped') || cardsFlipped >= 2) {
    return;
  }

  card.setTexture(card.getData('imageKey'));
  card.setData('flipped', true);

  if (!card1) {
    card1 = card;
  } else {
    card2 = card;
    checkMatch();
  }
}

function checkMatch() {
  if (card1.getData('imageKey') === card2.getData('imageKey')) {
    cardsFlipped = 0;
    card1 = null;
    card2 = null;
    if (currentPlayer === 'Player 1') {
      player1Score++;
      updateScoreTextPlayer1('Player 1 Score: ' + player1Score);
    } else {
      player2Score++;
      updateScoreTextPlayer2('Player 2 Score: ' + player2Score);
    }
  } else {
    setTimeout(() => {
      card1.setTexture('card-back');
      card2.setTexture('card-back');
      card1.setData('flipped', false);
      card2.setData('flipped', false);
      cardsFlipped = 0;
      card1 = null;
      card2 = null;

      currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';

      checkWin.call(this);
    }, 1000);
  }
}

function updateScoreTextPlayer1(text) {
  scoreTextPlayer1.setText(text);
}

function updateScoreTextPlayer2(text) {
  scoreTextPlayer2.setText(text);
}

