function LaunchTriviaGame(){


let startTime;
let endTime;
let reactionTime;
let player1Score = 0;
let player2Score = 0;

let player1_temp_score = 0;
let player2_temp_score = 0;

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('pentagon', 'images/circle.png');
        
    }

    create() {
        this.add.image(400, 300, 'background').setScale(0.8*3);
        const pentagon = this.add.image(400, 300, 'pentagon').setInteractive().setScale(0.23);
        this.add.text(400, 293, 'Bee of all trades', { color: '#000000' }).setOrigin(0.5).setScale(0.8);
        pentagon.on('pointerdown', () => {
            this.scene.start('NextMinigameReadyScene');
        });
        
    }
}

class Player1ReadyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Player1ReadyScene' });
    }

    create() {
        this.add.image(400, 300, 'background').setScale(0.8*3);
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
        this.load.image('bee','images/bee.png');
    }

    create() {
        this.add.image(400, 300, 'background').setScale(0.8*3);
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
         }, Math.random() * 1000);
    }
}

class Player2ReadyScene extends Phaser.Scene{
    constructor(){
        super({key:'Player2ReadyScene'});
    }

    init(data){
        this.player1ReactionTime=data.player1ReactionTime;
    }

    create(){
        this.add.image(400,300,'background').setScale(.8*3);
        this.add.text(400,300,'Get ready Player 2',{color:'#000000'}).setOrigin(.5);
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
        this.add.image(400,300,'background').setScale(.8*3);
        this.add.text(400,50,'Player 2',{color:'#000000'}).setOrigin(.5);
        const bee=this.add.image(400,300,'bee').setInteractive().setScale(.8);
        
        bee.visible=false;
        bee.on('pointerdown',()=>{
            endTime=new Date();
            reactionTime=(endTime-startTime)/1000;
            if(reactionTime<this.player1ReactionTime){
                player2Score++;
                console.log('Player2 won!');
                console.log(player1Score);
           console.log(player2Score);
            }else{
                player1Score++;
                console.log('Player1 won!');
                console.log(player1Score);
           console.log(player2Score);
            }
            
            this.scene.start('NextMinigameReadyScene');
        });

         setTimeout(()=>{
             bee.x=Math.random()*this.game.config.width;
             bee.y=Math.random()*this.game.config.height;
             bee.visible=true;
             startTime=new Date();
         },Math.random()*1000)
    }
}

class NextMinigameReadyScene extends Phaser.Scene{
    constructor(){
        super({key:'NextMinigameReadyScene'});
    }

    create(){
        this.add.image(400,300,'background').setScale(.8*3);
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

    create() {
      this.add.image(400, 300, 'background').setScale(0.8*3);
      this.add.text(400, 50, 'Player 1', { color: '#000000' }).setOrigin(0.5);

      
      const bee = this.add.image(400, 300, 'bee').setScale(0.4);
      bee.setDepth(1); 
      this.input.on('pointermove', (pointer) => {
          
          
      });
  
      
      let rectWidth = this.game.config.width / 2 - 20;
      let rectHeight = (this.game.config.height / 2 - 30) / 2;
      let padding = 10;
      let leftX = this.game.config.width / 4;
      let rightX = this.game.config.width * 3 / 4;
      let bottomY1 = this.game.config.height - rectHeight * 1.5 - padding * 2;
      let bottomY2 = this.game.config.height - rectHeight / 2 - padding;
  
      let rect1 = this.add.rectangle(leftX, bottomY1, rectWidth, rectHeight, 0xfff21e);
      rect1.setStrokeStyle(4, 0x000000);
      this.add.text(leftX, bottomY1, '84.6 and a half', { color: '#000000' }).setOrigin(0.5);
  
       
       rect1.setInteractive();
       rect1.on('pointerdown', () => {
           console.log('incorrect');
           this.scene.start('NextMinigame2Scene');
       });
  
       let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
       rect2.setStrokeStyle(4, 0x000000);
       this.add.text(leftX, bottomY2,'infinity',{color:'#000000'}).setOrigin(.5);
  
        
        rect2.setInteractive();
        rect2.on('pointerdown', () => {
            console.log('incorrect');
            this.scene.start('NextMinigame2Scene');
        });
  
        let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
        rect3.setStrokeStyle(4,0x000000);
        this.add.text(rightX,bottomY1,'5.9825 trillion',{color:'#000000'}).setOrigin(.5);
  
         
         rect3.setInteractive();
         rect3.on('pointerdown', () => {
             console.log('correct');

             player1_temp_score++;
             
             this.scene.start('NextMinigame2Scene');
         });
  
         let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
         rect4.setStrokeStyle(4,0x000000);
         this.add.text(rightX,bottomY2,'8',{color:'#000000'}).setOrigin(.5);
  
          
          rect4.setInteractive();
          rect4.on('pointerdown', () => {
              console.log('incorrect');
              this.scene.start('NextMinigame2Scene');
          });
  
          
          let newRectWidth = this.game.config.width - padding * 2;
          let newRectHeight = this.game.config.height / 2 - padding * 2;
          let centerX = this.game.config.width / 2;
          let centerY = newRectHeight / 2 + padding;
  
          let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
          newRect.setStrokeStyle(4,0x000000);
  
           
           this.add.text(centerX, centerY, 'If 87 bees are in a bee colony, and a prince bee is trying to assasinate a king bee, how far is the distance from Earth to the sun in inches?', {
            color: '#000000',
            wordWrap: { width: newRectWidth }
        }).setOrigin(.5);
        

  }
  
}

class NextMinigame2Scene extends Phaser.Scene{
  constructor(){
      super({key:'NextMinigame2Scene'});
  }

  preload(){
      this.load.image('background','images/background.png');
      this.load.image('bee','images/bee.png');
  }

  create() {
    this.add.image(400, 300, 'background').setScale(0.8*3);
    this.add.text(400, 50, 'Player 1', { color: '#000000' }).setOrigin(0.5);

    
    const bee = this.add.image(400, 300, 'bee').setScale(0.4);
    bee.setDepth(1); 
    this.input.on('pointermove', (pointer) => {
        
        
    });

    
    let rectWidth = this.game.config.width / 2 - 20;
    let rectHeight = (this.game.config.height / 2 - 30) / 2;
    let padding = 10;
    let leftX = this.game.config.width / 4;
    let rightX = this.game.config.width * 3 / 4;
    let bottomY1 = this.game.config.height - rectHeight * 1.5 - padding * 2;
    let bottomY2 = this.game.config.height - rectHeight / 2 - padding;

    let rect1 = this.add.rectangle(leftX, bottomY1, rectWidth, rectHeight, 0xfff21e);
    rect1.setStrokeStyle(4, 0x000000);
    this.add.text(leftX, bottomY1, '55', { color: '#000000' }).setOrigin(0.5);

     
     rect1.setInteractive();
     rect1.on('pointerdown', () => {
         console.log('incorrect');
         this.scene.start('NextMinigame3Scene');
     });

     let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
     rect2.setStrokeStyle(4, 0x000000);
     this.add.text(leftX, bottomY2,'5',{color:'#000000'}).setOrigin(.5);

      
      rect2.setInteractive();
      rect2.on('pointerdown', () => {
          console.log('correct');
          player1_temp_score++;
          
          this.scene.start('NextMinigame3Scene');
      });

      let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
      rect3.setStrokeStyle(4,0x000000);
      this.add.text(rightX,bottomY1,'5 + 10',{color:'#000000'}).setOrigin(.5);

       
       rect3.setInteractive();
       rect3.on('pointerdown', () => {
           console.log('incorrect');
           this.scene.start('NextMinigame3Scene');
       });

       let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
       rect4.setStrokeStyle(4,0x000000);
       this.add.text(rightX,bottomY2,'5 but actually 8',{color:'#000000'}).setOrigin(.5);

       
        rect4.setInteractive();
        rect4.on('pointerdown', () => {
            console.log('incorrect');
            this.scene.start('NextMinigame3Scene');
        });

         
        let newRectWidth = this.game.config.width - padding * 2;
        let newRectHeight = this.game.config.height / 2 - padding * 2;
        let centerX = this.game.config.width / 2;
        let centerY = newRectHeight / 2 + padding;

        let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
        newRect.setStrokeStyle(4,0x000000);

         
         this.add.text(centerX, centerY, 'A bee has 16 black stripes and 89 polka dots. What is 2+3', {
          color: '#000000',
          wordWrap: { width: newRectWidth }
      }).setOrigin(.5);
}

}

class NextMinigame3Scene extends Phaser.Scene{
  constructor(){
      super({key:'NextMinigame3Scene'});
  }

  preload(){
      this.load.image('background','images/background.png');
      this.load.image('bee','images/bee.png');
  }

  create() {
      this.add.image(400, 300, 'background').setScale(0.8*3);
      this.add.text(400, 50, 'Player 1', { color: '#000000' }).setOrigin(0.5);

      
      const bee = this.add.image(400, 300, 'bee').setScale(0.4);
      bee.setDepth(1); 
      this.input.on('pointermove', (pointer) => {
          
          
      });

      
      let rectWidth = this.game.config.width / 2 - 20;
      let rectHeight = (this.game.config.height / 2 - 30) / 2;
      let padding = 10;
      let leftX = this.game.config.width / 4;
      let rightX = this.game.config.width * 3 / 4;
      let bottomY1 = this.game.config.height - rectHeight * 1.5 - padding * 2;
      let bottomY2 = this.game.config.height - rectHeight / 2 - padding;

      let rect1 = this.add.rectangle(leftX, bottomY1, rectWidth, rectHeight, 0xfff21e);
      rect1.setStrokeStyle(4, 0x000000);
      this.add.text(leftX, bottomY1, 'd', { color: '#000000' }).setOrigin(0.5);

       
       rect1.setInteractive();
       rect1.on('pointerdown', () => {
           console.log('incorrect');
           this.scene.start('Player2ReadySceneCopy');
       });

       let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
       rect2.setStrokeStyle(4, 0x000000);
       this.add.text(leftX, bottomY2,'c',{color:'#000000'}).setOrigin(.5);

        
        rect2.setInteractive();
        rect2.on('pointerdown', () => {
            console.log('incorrect');
            this.scene.start('Player2ReadySceneCopy');
        });

        let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
        rect3.setStrokeStyle(4,0x000000);
        this.add.text(rightX,bottomY1,'a',{color:'#000000'}).setOrigin(.5);

         
         rect3.setInteractive();
         rect3.on('pointerdown', () => {
             console.log('incorrect');
             this.scene.start('Player2ReadySceneCopy');
         });

         let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
         rect4.setStrokeStyle(4,0x000000);
         this.add.text(rightX,bottomY2,'b',{color:'#000000'}).setOrigin(.5);

          
          rect4.setInteractive();
          rect4.on('pointerdown', () => {
              console.log('correct');
              player1_temp_score++;
              this.scene.start('Player2ReadySceneCopy');
          });

          
          let newRectWidth = this.game.config.width - padding * 2;
          let newRectHeight = this.game.config.height / 2 - padding * 2;
          let centerX = this.game.config.width / 2;
          let centerY = newRectHeight / 2 + padding;

          let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
          newRect.setStrokeStyle(4,0x000000);

           
           this.add.text(centerX, centerY, 'Best letter of the alphabet?', {
            color: '#000000',
            wordWrap: { width: newRectWidth }
        }).setOrigin(.5);
  }
}

class Player2ReadySceneCopy extends Phaser.Scene {
  constructor() {
      super({ key: 'Player2ReadySceneCopy' });
  }

  create() {
      this.add.image(400, 300, 'background').setScale(0.8*3);
      this.add.text(400, 300, 'Get ready Player 2', { color: '#000000' }).setOrigin(0.5);
      this.time.delayedCall(3000, () => {
        this.scene.start('NextMinigamePlayer2Scene1');
      });
  }
}
class NextMinigamePlayer2Scene1 extends Phaser.Scene {
  constructor() {
      super({ key: 'NextMinigamePlayer2Scene1' });
  }

    preload(){
        this.load.image('background','images/background.png');
        this.load.image('bee','images/bee.png');
    }

    create() {
      this.add.image(400, 300, 'background').setScale(0.8*3);
      this.add.text(400, 50, 'Player 2', { color: '#000000' }).setOrigin(0.5);

      
      const bee = this.add.image(400, 300, 'bee').setScale(0.4);
      bee.setDepth(1); 
      this.input.on('pointermove', (pointer) => {
          
          
      });
  
      
      let rectWidth = this.game.config.width / 2 - 20;
      let rectHeight = (this.game.config.height / 2 - 30) / 2;
      let padding = 10;
      let leftX = this.game.config.width / 4;
      let rightX = this.game.config.width * 3 / 4;
      let bottomY1 = this.game.config.height - rectHeight * 1.5 - padding * 2;
      let bottomY2 = this.game.config.height - rectHeight / 2 - padding;
  
      let rect1 = this.add.rectangle(leftX, bottomY1, rectWidth, rectHeight, 0xfff21e);
      rect1.setStrokeStyle(4, 0x000000);
      this.add.text(leftX, bottomY1, 'Bees rely on a combination of environmental cues, such as visual landmarks, polarization patterns of sunlight, and odors, to navigate and communicate with other members of their colony effectively. Quantum phenomena at the macroscopic level in the bees neural and sensory systems are not relevant to their behavior and are not observed in their biology.', {
        color: '#000000',
        wordWrap: { width: (this.game.config.width - padding * 2)/2.1 }
        ,fontSize: '10px',
        
    }).setOrigin(.5);
  
       
       rect1.setInteractive();
       rect1.on('pointerdown', () => {
           console.log('correct');
             player2_temp_score++;
             this.scene.start('NextMinigamePlayer2Scene2');
             
       });
  
       let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
       rect2.setStrokeStyle(4, 0x000000);
       this.add.text(leftX, bottomY2, 'The bees navigation and communication system relies on the principles of quantum teleportation. When a bee discovers a promising food source, it entangles its quantum state with the scent molecules emanating from the food. It then teleports this entangled quantum state back to the hive, where other bees can extract the information and recreate the foods location. This quantum teleportation process remains robust against decoherence and thermalization challenges due to the bees naturally occurring quantum error-correcting mechanisms.', {
        color: '#000000',
        wordWrap: { width: (this.game.config.width - padding * 2)/2.1 }
        ,fontSize: '8px',
    }).setOrigin(.5);
  
  
        rect2.setInteractive();
        rect2.on('pointerdown', () => {
            console.log('incorrect');

            
            this.scene.start('NextMinigamePlayer2Scene2');
        });
  
        let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
        rect3.setStrokeStyle(4,0x000000);
        this.add.text(rightX, bottomY1, 'The bees navigation and communication system utilize quantum tunneling to achieve exceptional spatial-temporal resolution. As the bee navigates through the environment, it can tunnel through barriers, such as walls or dense foliage, utilizing its quantum-entangled state to appear on the other side instantaneously. This tunneling behavior is influenced by the bees neural quantum coherence, allowing it to explore vast territories quickly without experiencing thermalization effects due to its unique quantum neural network.', {
          color: '#000000',
          wordWrap: { width: (this.game.config.width - padding * 2)/2.1 }
          ,fontSize: '8px',
      }).setOrigin(.5);
  
         
         rect3.setInteractive();
         rect3.on('pointerdown', () => {
             
             console.log('incorrect');
             
           this.scene.start('NextMinigamePlayer2Scene2');
         });
  
         let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
         rect4.setStrokeStyle(4,0x000000)
         this.add.text(rightX, bottomY2, 'The bees navigation and communication system exploit quantum coherence and entanglement through a process called quantum buzz dance. When a bee finds a food source, it entangles its position and the food sources position, creating a quantum entangled state between the two locations. Other bees in the hive can then access this entangled state and instantly know the location of the food source without needing to physically explore. This process is not affected by decoherence or thermalization due to the bees specialized quantum sensing organs.', {
          color: '#000000',
          wordWrap: { width: (this.game.config.width - padding * 2)/2.1 }
          ,fontSize: '8px',
      }).setOrigin(.5);
          
          rect4.setInteractive();
          rect4.on('pointerdown', () => {
              console.log('incorrect');
              
              this.scene.start('NextMinigamePlayer2Scene2');
          });
  
          
          let newRectWidth = this.game.config.width - padding * 2;
          let newRectHeight = this.game.config.height / 2 - padding * 2;
          let centerX = this.game.config.width / 2;
          let centerY = newRectHeight / 2 + padding;
  
          let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
          newRect.setStrokeStyle(4,0x000000);
  
           
           this.add.text(centerX, centerY, 'Within the framework of quantum mechanics and entanglement, how does the bees navigation and communication system exploit quantum coherence and quantum entanglement effects to achieve exceptional spatial-temporal resolution, superposition-based decision-making processes, and non-local communication abilities in the context of its foraging behavior, and how do these quantum phenomena manifest at the macroscopic level in the bees neural and sensory systems despite the apparent decoherence and thermalization challenges present in the warm and noisy biological environment?', {
            color: '#000000',
            wordWrap: { width: newRectWidth }
        }).setOrigin(.5);
  }
  
}



class NextMinigamePlayer2Scene2 extends Phaser.Scene {
  constructor() {
      super({ key: 'NextMinigamePlayer2Scene2' });
  }

    preload(){
        this.load.image('background','images/background.png');
        this.load.image('bee','images/bee.png');
    }

    create() {
      this.add.image(400, 300, 'background').setScale(0.8*3);
      this.add.text(400, 50, 'Player 2', { color: '#000000' }).setOrigin(0.5);

      
      const bee = this.add.image(400, 300, 'bee').setScale(0.4);
      bee.setDepth(1); 
      this.input.on('pointermove', (pointer) => {
          
          
      });
  
      
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
  
       
       rect1.setInteractive();
       rect1.on('pointerdown', () => {
           
        console.log('incorrect');
        
        this.scene.start('NextMinigamePlayer2Scene3');
       });
  
       let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
       rect2.setStrokeStyle(4, 0x000000);
       this.add.text(leftX, bottomY2,'correct',{color:'#000000'}).setOrigin(.5);
  
        
        rect2.setInteractive();
        rect2.on('pointerdown', () => {
          console.log('correct');
          player2_temp_score++;
          this.scene.start('NextMinigamePlayer2Scene3');
          
        });
  
        let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
        rect3.setStrokeStyle(4,0x000000);
        this.add.text(rightX,bottomY1,'incorrect4',{color:'#000000'}).setOrigin(.5);
  
         
         rect3.setInteractive();
         rect3.on('pointerdown', () => {
             
             console.log('incorrect');
             
           this.scene.start('NextMinigamePlayer2Scene3');
         });
  
         let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
         rect4.setStrokeStyle(4,0x000000);
         this.add.text(rightX,bottomY2,'incorrect3',{color:'#000000'}).setOrigin(.5);
  
          
          rect4.setInteractive();
          rect4.on('pointerdown', () => {
              console.log('incorrect');
              
              this.scene.start('NextMinigamePlayer2Scene3');
          });
  
          
          let newRectWidth = this.game.config.width - padding * 2;
          let newRectHeight = this.game.config.height / 2 - padding * 2;
          let centerX = this.game.config.width / 2;
          let centerY = newRectHeight / 2 + padding;
  
          let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
          newRect.setStrokeStyle(4,0x000000);
  
           
           this.add.text(centerX,centerY,'question',{color:'#000000'}).setOrigin(.5);
  }
  
}







class NextMinigamePlayer2Scene3 extends Phaser.Scene {
  constructor() {
      super({ key: 'NextMinigamePlayer2Scene3' });
  }

    preload(){
        this.load.image('background','images/background.png');
        this.load.image('bee','images/bee.png');
    }

    create() {
      this.add.image(400, 300, 'background').setScale(0.8*3);
      this.add.text(400, 50, 'Player 2', { color: '#000000' }).setOrigin(0.5);

      
      const bee = this.add.image(400, 300, 'bee').setScale(0.4);
      bee.setDepth(1); 
      this.input.on('pointermove', (pointer) => {
          
          
      });
  
      
      let rectWidth = this.game.config.width / 2 - 20;
      let rectHeight = (this.game.config.height / 2 - 30) / 2;
      let padding = 10;
      let leftX = this.game.config.width / 4;
      let rightX = this.game.config.width * 3 / 4;
      let bottomY1 = this.game.config.height - rectHeight * 1.5 - padding * 2;
      let bottomY2 = this.game.config.height - rectHeight / 2 - padding;
  
      let rect1 = this.add.rectangle(leftX, bottomY1, rectWidth, rectHeight, 0xfff21e);
      rect1.setStrokeStyle(4, 0x000000);
      this.add.text(leftX, bottomY1, 'be', { color: '#000000' }).setOrigin(0.5);
  
       
       rect1.setInteractive();
       rect1.on('pointerdown', () => {
           
        console.log('incorrect');
        if (player1_temp_score > player2_temp_score) {
          player1Score++;
      } else if (player2_temp_score > player1_temp_score) {
          player2Score++;
      } else {
          
          if (Math.random() < 0.5) {
              player1Score++;
          } else {
              player2Score++;
          }
      }
      console.log(player1Score);
           console.log(player2Score);
      this.scene.start('EndScene');
        
       });
  
       let rect2 = this.add.rectangle(leftX, bottomY2, rectWidth, rectHeight, 0xffc51a);
       rect2.setStrokeStyle(4, 0x000000);
       this.add.text(leftX, bottomY2,'beee',{color:'#000000'}).setOrigin(.5);
  
        
        rect2.setInteractive();
        rect2.on('pointerdown', () => {
          console.log('incorrect');
          if (player1_temp_score > player2_temp_score) {
            player1Score++;
        } else if (player2_temp_score > player1_temp_score) {
            player2Score++;
        } else {
           
            if (Math.random() < 0.5) {
                player1Score++;
            } else {
                player2Score++;
            }
        }
        console.log(player1Score);
           console.log(player2Score);
        this.scene.start('EndScene');
              //get ready player 1 scene
        });
  
        let rect3 = this.add.rectangle(rightX,bottomY1,rectWidth,rectHeight,0xffc51a);
        rect3.setStrokeStyle(4,0x000000);
        this.add.text(rightX,bottomY1,'beie',{color:'#000000'}).setOrigin(.5);
  
        
         rect3.setInteractive();
         rect3.on('pointerdown', () => {
             
             console.log('incorrect');
             if (player1_temp_score > player2_temp_score) {
              player1Score++;
          } else if (player2_temp_score > player1_temp_score) {
              player2Score++;
          } else {
              
              if (Math.random() < 0.5) {
                  player1Score++;
              } else {
                  player2Score++;
              }
          }
          console.log(player1Score);
           console.log(player2Score);
          this.scene.start('EndScene');
           //get ready player 1 scene
         });
  
         let rect4 = this.add.rectangle(rightX,bottomY2,rectWidth,rectHeight,0xfff21e);
         rect4.setStrokeStyle(4,0x000000);
         this.add.text(rightX,bottomY2,'bee',{color:'#000000'}).setOrigin(.5);
  
          
          rect4.setInteractive();
          rect4.on('pointerdown', () => {



            console.log('correct');
            player2_temp_score++;
            if (player1_temp_score > player2_temp_score) {
              player1Score++;
          } else if (player2_temp_score > player1_temp_score) {
              player2Score++;
          } else {
             
              if (Math.random() < 0.5) {
                  player1Score++;
              } else {
                  player2Score++;
              }
          }
          console.log(player1Score);
           console.log(player2Score);
          
          
          this.scene.start('EndScene');
          
          //next question scene
              
          });
  
          
          let newRectWidth = this.game.config.width - padding * 2;
          let newRectHeight = this.game.config.height / 2 - padding * 2;
          let centerX = this.game.config.width / 2;
          let centerY = newRectHeight / 2 + padding;
  
          let newRect = this.add.rectangle(centerX, centerY,newRectWidth,newRectHeight,0xfff21e);
          newRect.setStrokeStyle(4,0x000000);
  
           
           this.add.text(centerX,centerY,'bee?',{color:'#000000'}).setOrigin(.5);
           
  }
  
}

class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('pentagon', 'images/circle.png');
        
    }

    create() {
        this.add.image(400, 300, 'background').setScale(0.8*3);
        const pentagon = this.add.image(400, 300, 'pentagon').setInteractive().setScale(0.23);
        if (player1Score > player2Score){
            this.add.text(400, 293, 'Player 1 wins!', { color: '#000000' }).setOrigin(0.5).setScale(0.8);
        } else if (player2Score > player1Score){
            this.add.text(400, 293, 'Player 2 wins!', { color: '#000000' }).setOrigin(0.5).setScale(0.8);
        }
        
        pentagon.on('pointerdown', () => {
            
        });
        
    }
}


const config={
  type:Phaser.AUTO,
  width:800,
  height:600,
  scene:[StartScene,Player1ReadyScene,MainScene,Player2ReadyScene,Player2Scene,NextMinigameReadyScene,
  NextMinigameScene,NextMinigame2Scene,NextMinigame3Scene, Player2ReadySceneCopy, NextMinigamePlayer2Scene1, NextMinigamePlayer2Scene2, NextMinigamePlayer2Scene3, EndScene]
  };
  
  const game=new Phaser.Game(config);
}
