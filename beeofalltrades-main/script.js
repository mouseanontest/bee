let startTime;
let endTime;
let reactionTime;
let player1Score = 0;
let player2Score = 0;
let music;

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('pentagon', 'images/pentagon.png');
    this.load.audio('music', 'audio/music.mp3');
  }

  create() {
    this.add.image(400, 300, 'background').setScale(0.5);
    const pentagon = this.add.image(400, 300, 'pentagon').setInteractive().setScale(0.23);
    this.add.text(400, 300, 'Bee of all trades', { color: '#000000' }).setOrigin(0.5).setScale(0.8);
    pentagon.on('pointerdown', () => {
      this.scene.start('Player1ReadyScene');
    });
    music = this.sound.add('music');
    music.play({ loop: true });
  }
}

class Player1ReadyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Player1ReadyScene' });
  }

  create() {
    this.add.image(400, 300, 'background').setScale(0.5);
    this.add.text(400, 300, 'Get ready Player 1', { color: '#000000' }).setOrigin(0.5);
    this.time.delayedCall(3000, () => {
      this.scene.start('MainScene');
    });
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('bee', 'images/bee.png');
  }

  create() {
    this.add.image(400, 300, 'background').setScale(0.5);
    this.add.text(400, 50, 'Player 1', { color: '#000000' }).setOrigin(0.5);
    const bee = this.add.image(400, 300, 'bee').setInteractive().setScale(0.8);
    bee.visible = false;
    bee.on('pointerdown', () => {
      endTime = new Date();
      reactionTime = (endTime - startTime) /1000;
      this.scene.start('Player2ReadyScene', { player1ReactionTime: reactionTime });
    });

     setTimeout(() => {
       bee.x = Math.random() * this.game.config.width;
       bee.y = Math.random() * this.game.config.height;
       bee.visible = true;
       startTime = new Date();
     }, Math.random() * 10000);
  }
}

class Player2ReadyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Player2ReadyScene' });
  }

init(data) {
    this.player1ReactionTime = data.player1ReactionTime;
  }

create() {
this.add.image(400,300,'background').setScale(.5);
this.add.text(400,300,'Get ready Player2',{color:'#000000'}).setOrigin(.5);
this.time.delayedCall(3000,()=>{
this.scene.start('Player2Scene',{player1ReactionTime:this.player1ReactionTime});
});
}
}

class Player2Scene extends Phaser.Scene{
constructor(){
super({key:'Player2Scene'});
}

init(data){
this.player1ReactionTime=data.player1ReactionTime;
}

preload(){
this.load.image('background','images/background.png');
this.load.image('bee','images/bee.png');
}

create(){
this.add.image(400,300,'background').setScale(.5);
this.add.text(400,50,'Player2',{color:'#000000'}).setOrigin(.5);
const bee=this.add.image(400,300,'bee').setInteractive().setScale(.8);
bee.visible=false;
bee.on('pointerdown',()=>{
endTime=new Date();
reactionTime=(endTime-startTime)/1000;
if(reactionTime<this.player1ReactionTime){
player2Score++;
console.log('Player2 won!');
}else{
player1Score++;
console.log('Player1 won!');
}
// Add code here to handle the end of the game
// Transition to the next minigame
this.scene.start('NextMinigameReadyScene');
});

setTimeout(()=>{
bee.x=Math.random()*this.game.config.width;
bee.y=Math.random()*this.game.config.height;
bee.visible=true;
startTime=new Date();
},Math.random()*10000)
}
}

class NextMinigameReadyScene extends Phaser.Scene{
constructor(){
super({key:'NextMinigameReadyScene'});
}

create(){
this.add.image(400,300,'background').setScale(.5);
this.add.text(400,300,'Get ready Player 1',{color:'#000000'}).setOrigin(.5);
this.time.delayedCall(3000,()=>{
this.scene.start('NextMinigameScene');
});
}
}

class NextMinigameScene extends Phaser.Scene{
constructor(){
super({key:'NextMinigameScene'});
}

preload(){
this.load.image('background','images/background.png');
this.load.image('bee','images/bee.png');
}

create(){
this.add.image(400,300,'background').setScale(.5);
// Add code here to create the next minigame
const bee=this.add.image(400,300,'bee').setScale(.4);
this.input.on('pointermove',(pointer)=>{
bee.x=pointer.x;
bee.y=pointer.y;
});
}
}

const config={
type:Phaser.AUTO,
width:800,
height:600,
scene:[StartScene,Player1ReadyScene,MainScene,Player2ReadyScene,Player2Scene,NextMinigameReadyScene,NextMinigameScene]
};

const game=new Phaser.Game(config);
