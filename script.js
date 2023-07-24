let startTime;
let endTime;
let reactionTime;
let player1Score = 0;
let player2Score = 0;
let music;
let player1_temp_score = 0;

class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: 'TitleScene'});
    }

    preload() {
        this.load.image('background', 'images/background.png');
    }

    create() {
        this.add.image(400, 300, 'background').setScale(0.5);
        const FBStartButton = this.add.text(100,100,'Fast Bee').setInteractive();
        FBStartButton.on('pointerdown', () => this.scene.start('FBStartScene'));
    }
}

class FBStartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FBStartScene' });
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
            this.scene.start('FBPlayer1ReadyScene');
        });
        music = this.sound.add('music');
        music.play({ loop: true });
    }
}

class FBPlayer1ReadyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FBPlayer1ReadyScene' });
    }

    create() {
        this.add.image(400, 300, 'background').setScale(0.5);
        this.add.text(400, 300, 'Get ready Player 1', { color: '#000000' }).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.scene.start('FBMainScene');
        });
    }
}

class FBMainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FBMainScene' });
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
            this.scene.start('FBPlayer2ReadyScene', { player1ReactionTime: reactionTime });
        });

         setTimeout(() => {
             bee.x = Math.random() * this.game.config.width;
             bee.y = Math.random() * this.game.config.height;
             bee.visible = true;
             startTime = new Date();
         }, Math.random() * 10000);
    }
}

class FBPlayer2ReadyScene extends Phaser.Scene{
    constructor(){
        super({key:'FBPlayer2ReadyScene'});
    }

    init(data){
        this.player1ReactionTime=data.player1ReactionTime;
    }

    create(){
        this.add.image(400,300,'background').setScale(.5);
        this.add.text(400,300,'Get ready Player 2',{color:'#000000'}).setOrigin(.5);
        this.time.delayedCall(3000,()=>{
            this.scene.start('FBPlayer2Scene',{player1ReactionTime:this.player1ReactionTime});
        });
    }
}

class FBPlayer2Scene extends Phaser.Scene{
    constructor(){
        super({key:'FBPlayer2Scene'});
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
        this.add.text(400,50,'Player 2',{color:'#000000'}).setOrigin(.5);
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
            this.scene.start('TBReadyScene');
        });

         setTimeout(()=>{
             bee.x=Math.random()*this.game.config.width;
             bee.y=Math.random()*this.game.config.height;
             bee.visible=true;
             startTime=new Date();
         },Math.random()*10000)
    }
}

class TBReadyScene extends Phaser.Scene{
    constructor(){
        super({key:'TBReadyScene'});
    }

    create(){
        this.add.image(400,300,'background').setScale(.5);
        this.add.text(400,300,'Get ready Player 1',{color:'#000000'}).setOrigin(.5);
        this.time.delayedCall(3000,()=>{
            this.scene.start('TBMinigameScene');
        });
    }
}

class TBMinigameScene extends Phaser.Scene{
    constructor(){
        super({key:'TBMinigameScene'});
    }

    preload(){
        this.load.image('background','images/background.png');
        this.load.image('bee','images/bee.png');
    }

    create() {
      this.add.image(400, 300, 'background').setScale(0.5);
      this.add.text(400, 50, 'Player 1', { color: '#000000' }).setOrigin(0.5);

      // Add code here to create the next minigame
      const bee = this.add.image(400, 300, 'bee').setScale(0.4);
      bee.setDepth(1); // Set the depth of the bee to be greater than the depth of the rectangles
      this.input.on('pointermove', (pointer) => {
          bee.x = pointer.x;
          bee.y = pointer.y;
      });
  
      // Add four rectangles to the bottom half of the screen
      let rectWidth = this.game.config.width / 2 - 20;
      let rectHeight = (this.game.config.height / 2 - 30) / 2;
      let padding = 10;
      let leftX = this.game.config.width / 4;
      let rightX = this.game.config.width * 3 / 4;
      let bottomY1 = this.game.config.height - rectHeight * 1.5 - padding * 2;
      let bottomY2 = this.game.config.height - rectHeight / 2 - padding;
  
      let rect1 = this.add.rectangle(leftX, bottomY1, rectWidth, rectHeight, 0xfff21e);
      rect1.setStrokeStyle(4, 0x000000);
      this.add.text(leftX, bottomY1, 'incorrect1', { color: '#000000' }).setOrigin(0.5);
  
       // Add an interactive behavior to rectangle 1
       rect1.setInteractive();
       rect1.on('pointerdown', () => {
           console.log('incorrect');
           this.scene.start('TBReadyScene2');
       });
  
       let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
       rect2.setStrokeStyle(4, 0x000000);
       this.add.text(leftX, bottomY2,'incorrect2',{color:'#000000'}).setOrigin(.5);
  
        // Add an interactive behavior to rectangle 2
        rect2.setInteractive();
        rect2.on('pointerdown', () => {
            console.log('incorrect');
            this.scene.start('TBReadyScene2');
        });
  
        let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
        rect3.setStrokeStyle(4,0x000000);
        this.add.text(rightX,bottomY1,'correct',{color:'#000000'}).setOrigin(.5);
  
         // Add an interactive behavior to rectangle 3
         rect3.setInteractive();
         rect3.on('pointerdown', () => {
             console.log('correct');
             player1_temp_score++;
             // Transition to the TBMinigameScene2 when the correct rectangle is clicked
             this.scene.start('TBMinigameScene2');
         });
  
         let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
         rect4.setStrokeStyle(4,0x000000);
         this.add.text(rightX,bottomY2,'incorrect3',{color:'#000000'}).setOrigin(.5);
  
          // Add an interactive behavior to rectangle 4
          rect4.setInteractive();
          rect4.on('pointerdown', () => {
              console.log('incorrect');
              this.scene.start('TBReadyScene2');
          });
  
          // Add a new rectangle to the upper half of the screen
          let newRectWidth = this.game.config.width - padding * 2;
          let newRectHeight = this.game.config.height / 2 - padding * 2;
          let centerX = this.game.config.width / 2;
          let centerY = newRectHeight / 2 + padding;
  
          let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
          newRect.setStrokeStyle(4,0x000000);
  
           // Add text to the center of the top rectangle
           this.add.text(centerX,centerY,'question',{color:'#000000'}).setOrigin(.5);
  }
  
}

class TBMinigameScene2 extends Phaser.Scene{
  constructor(){
      super({key:'TBMinigameScene2'});
  }

  preload(){
      this.load.image('background','images/background.png');
      this.load.image('bee','images/bee.png');
  }

  create() {
    this.add.image(400, 300, 'background').setScale(0.5);
    this.add.text(400, 50, 'Player 1', { color: '#000000' }).setOrigin(0.5);

    // Add code here to create the next minigame
    const bee = this.add.image(400, 300, 'bee').setScale(0.4);
    bee.setDepth(1); // Set the depth of the bee to be greater than the depth of the rectangles
    this.input.on('pointermove', (pointer) => {
        bee.x = pointer.x;
        bee.y = pointer.y;
    });

    // Add four rectangles to the bottom half of the screen
    let rectWidth = this.game.config.width / 2 - 20;
    let rectHeight = (this.game.config.height / 2 - 30) / 2;
    let padding = 10;
    let leftX = this.game.config.width / 4;
    let rightX = this.game.config.width * 3 / 4;
    let bottomY1 = this.game.config.height - rectHeight * 1.5 - padding * 2;
    let bottomY2 = this.game.config.height - rectHeight / 2 - padding;

    let rect1 = this.add.rectangle(leftX, bottomY1, rectWidth, rectHeight, 0xfff21e);
    rect1.setStrokeStyle(4, 0x000000);
    this.add.text(leftX, bottomY1, 'incorrect1', { color: '#000000' }).setOrigin(0.5);

     // Add an interactive behavior to rectangle 1
     rect1.setInteractive();
     rect1.on('pointerdown', () => {
         console.log('incorrect');
         this.scene.start('TBReadyScene2');
     });

     let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
     rect2.setStrokeStyle(4, 0x000000);
     this.add.text(leftX, bottomY2,'correct',{color:'#000000'}).setOrigin(.5);

      // Add an interactive behavior to rectangle 2
      rect2.setInteractive();
      rect2.on('pointerdown', () => {
          console.log('correct');
          player1_temp_score++;
          // Transition to the TBMinigameScene3 when the correct rectangle is clicked
          this.scene.start('TBMinigameScene3');
      });

      let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
      rect3.setStrokeStyle(4,0x000000);
      this.add.text(rightX,bottomY1,'incorrect2',{color:'#000000'}).setOrigin(.5);

       // Add an interactive behavior to rectangle 3
       rect3.setInteractive();
       rect3.on('pointerdown', () => {
           console.log('incorrect');
           this.scene.start('TBReadyScene2');
       });

       let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
       rect4.setStrokeStyle(4,0x000000);
       this.add.text(rightX,bottomY2,'incorrect3',{color:'#000000'}).setOrigin(.5);

        // Add an interactive behavior to rectangle 4
        rect4.setInteractive();
        rect4.on('pointerdown', () => {
            console.log('incorrect');
            this.scene.start('TBReadyScene2');
        });

        // Add a new rectangle to the upper half of the screen
        let newRectWidth = this.game.config.width - padding * 2;
        let newRectHeight = this.game.config.height / 2 - padding * 2;
        let centerX = this.game.config.width / 2;
        let centerY = newRectHeight / 2 + padding;

        let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
        newRect.setStrokeStyle(4,0x000000);

         // Add text to the center of the top rectangle
         this.add.text(centerX,centerY,'question',{color:'#000000'}).setOrigin(.5);
}

}

class TBMinigameScene3 extends Phaser.Scene{
  constructor(){
      super({key:'TBMinigameScene3'});
  }

  preload(){
      this.load.image('background','images/background.png');
      this.load.image('bee','images/bee.png');
  }

  create() {
      this.add.image(400, 300, 'background').setScale(0.5);
      this.add.text(400, 50, 'Player 1', { color: '#000000' }).setOrigin(0.5);

      // Add code here to create the next minigame
      const bee = this.add.image(400, 300, 'bee').setScale(0.4);
      bee.setDepth(1); // Set the depth of the bee to be greater than the depth of the rectangles
      this.input.on('pointermove', (pointer) => {
          bee.x = pointer.x;
          bee.y = pointer.y;
      });

      // Add four rectangles to the bottom half of the screen
      let rectWidth = this.game.config.width / 2 - 20;
      let rectHeight = (this.game.config.height / 2 - 30) / 2;
      let padding = 10;
      let leftX = this.game.config.width / 4;
      let rightX = this.game.config.width * 3 / 4;
      let bottomY1 = this.game.config.height - rectHeight * 1.5 - padding * 2;
      let bottomY2 = this.game.config.height - rectHeight / 2 - padding;

      let rect1 = this.add.rectangle(leftX, bottomY1, rectWidth, rectHeight, 0xfff21e);
      rect1.setStrokeStyle(4, 0x000000);
      this.add.text(leftX, bottomY1, 'incorrect1', { color: '#000000' }).setOrigin(0.5);

       // Add an interactive behavior to rectangle 1
       rect1.setInteractive();
       rect1.on('pointerdown', () => {
           console.log('incorrect');
           this.scene.start('TBReadyScene2');
       });

       let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
       rect2.setStrokeStyle(4, 0x000000);
       this.add.text(leftX, bottomY2,'incorrect2',{color:'#000000'}).setOrigin(.5);

        // Add an interactive behavior to rectangle 2
        rect2.setInteractive();
        rect2.on('pointerdown', () => {
            console.log('incorrect');
            this.scene.start('TBReadyScene2');
        });

        let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
        rect3.setStrokeStyle(4,0x000000);
        this.add.text(rightX,bottomY1,'incorrect3',{color:'#000000'}).setOrigin(.5);

         // Add an interactive behavior to rectangle 3
         rect3.setInteractive();
         rect3.on('pointerdown', () => {
             console.log('incorrect');
             this.scene.start('TBReadyScene2');
         });

         let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
         rect4.setStrokeStyle(4,0x000000);
         this.add.text(rightX,bottomY2,'correct',{color:'#000000'}).setOrigin(.5);

          // Add an interactive behavior to rectangle 4
          rect4.setInteractive();
          rect4.on('pointerdown', () => {
              console.log('correct');
              player1_temp_score++;
              this.scene.start('TBReadyScene2');
          });

          // Add a new rectangle to the upper half of the screen
          let newRectWidth = this.game.config.width - padding * 2;
          let newRectHeight = this.game.config.height / 2 - padding * 2;
          let centerX = this.game.config.width / 2;
          let centerY = newRectHeight / 2 + padding;

          let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
          newRect.setStrokeStyle(4,0x000000);

           // Add text to the center of the top rectangle
           this.add.text(centerX,centerY,'question',{color:'#000000'}).setOrigin(.5);
  }
}

class TBReadyScene2 extends Phaser.Scene {
  constructor() {
      super({ key: 'TBReadyScene2' });
  }

  create() {
      this.add.image(400, 300, 'background').setScale(0.5);
      this.add.text(400, 300, 'Get ready Player 2', { color: '#000000' }).setOrigin(0.5);
      this.time.delayedCall(3000, () => {
          //put stuff here
      });
  }
}


const config={
  type:Phaser.AUTO,
  width:800,
  height:600,
  scene:[TitleScene,FBStartScene,FBPlayer1ReadyScene,FBMainScene,FBPlayer2ReadyScene,FBPlayer2Scene,TBReadyScene,
  TBMinigameScene,TBMinigameScene2,TBMinigameScene3, TBReadyScene2]
};
  
const game=new Phaser.Game(config);
  
