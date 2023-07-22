let startTime;
let endTime;
let reactionTime;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('background', 'background.png');
    this.load.image('bee', 'bee.png');
  }

  create() {
    this.add.image(400, 300, 'background');
    const bee = this.add.image(400, 300, 'bee').setInteractive();
    bee.visible = false;
    bee.on('pointerdown', () => {
      endTime = new Date();
      reactionTime = (endTime - startTime) / 1000;
      this.scene.start('ResultScene', { reactionTime });
    });
    
    setTimeout(() => {
      bee.visible = true;
      startTime = new Date();
    }, Math.random() * 10000);
  }
}

class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultScene' });
  }

  init(data) {
    this.reactionTime = data.reactionTime;
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.text(400, 300, `Your reaction time is: ${this.reactionTime} seconds`, { color: '#000000' }).setOrigin(0.5);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainScene, ResultScene]
};

const game = new Phaser.Game(config);
