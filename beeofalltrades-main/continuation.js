// continuation.js
// This script is a continuation of script.js and retains all of the variable values from script.js

// Define global variables to retain their values from script.js
let player1Score_2 = window.player1Score;
let player2Score_2 = window.player2Score;

class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' });
  }

  create() {
    // Add your code here to create the content of the EndScene
  }
}

// Modify the Player2Scene class to start the EndScene after the first reaction time game has ended
class Player2Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Player2Scene' });
  }

   init(data) {
     this.player1ReactionTime = data.player1ReactionTime;
   }

   preload() {
     this.load.image('background', 'images/background.png');
     this.load.image('bee', 'images/bee.png');
   }

   create() {
     this.add.image(400, 300, 'background').setScale(0.5);
     this.add.text(400,50,'Player 2',{color:'#000000'}).setOrigin(.5);
     const bee =this.add.image(400,300,'bee').setInteractive().setScale(.8);
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
       // Start the EndScene after the first reaction time game has ended
       this.scene.start('EndScene');
     });

     setTimeout(()=>{
       bee.x=Math.random()*this.game.config.width;
       bee.y=Math.random()*this.game.config.height;
       bee.visible=true;
       startTime=new Date();
     },Math.random()*10000)
   }
}
