function LaunchMemory(){

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};

// Create a new Phaser game
const game = new Phaser.Game(config);

// Global variables
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let currentPlayer = 'Player 1'; // Track the current player's turn
let player1Score = 0;
let player2Score = 0;
let scoreTextPlayer1;
let scoreTextPlayer2;

// Card images (replace with your own images)
const cardImages = [
  'card1',
  'card2',
  'card3',
  'card4',
  'card5',
  'card6',
  'card7',
  'card8',
];

// Shuffle the card images
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function preload() {
  this.load.image('background', 'images/background.png');
  this.load.image('card-back', 'images/card-back.png');
  for (const cardImage of cardImages) {
    this.load.image(cardImage, `path_to_${cardImage}_image.png`);
  }
}

function create() {
  // Add the background image
  this.add.image(0, 0, 'background').setScale(1.1);

  // Shuffle the card images
  shuffleArray(cardImages);

  // Create the grid for the cards
  const gridSize = 4; // 4x4 grid
  const cardSize = 100;
  const spacing = 42;
  const xOffset = (config.width - gridSize * (cardSize + spacing)) / 2;
  const yOffset = (config.height - gridSize * (cardSize + spacing)) / 2;

  let cardx = 100;
  let cardy = 100;

  // Create cards and add click event
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

  // Create and display score text for Player 1
  scoreTextPlayer1 = this.add.text(config.width - 150, 50, 'Player 1 Score: 0', { font: '24px Arial', fill: '#ffffff' });

  // Create and display score text for Player 2
  scoreTextPlayer2 = this.add.text(config.width - 150, 100, 'Player 2 Score: 0', { font: '24px Arial', fill: '#ffffff' });

  // Set the scoreText variable to the Player 1 score text object
  updateScoreTextPlayer1('Player 1 Score: 0');
  updateScoreTextPlayer2('Player 2 Score: 0');
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

      // Switch turns between players
      currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    }, 1000);
  }
}

// Helper function to update score text on the screen for Player 1
function updateScoreTextPlayer1(text) {
  scoreTextPlayer1.setText(text);
}

// Helper function to update score text on the screen for Player 2
function updateScoreTextPlayer2(text) {
  scoreTextPlayer2.setText(text);
}
}
