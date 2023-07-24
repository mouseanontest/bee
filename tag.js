

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    physics: {
        default: 'arcade',
    },

    scene: {
        preload: preload,
        create: create,
        update: update,
    }

};

class Player extends Phaser.Physics.Arcade.Sprite
{
    totalJumps = 2;
    currentJumps = 0;
    gui;
    arrow;
    constructor(scene, x, y)
    {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(2);
        this.setCollideWorldBounds(true);
        this.setGravityY(3000); //We will set gravity *per object* rather than for the scene!
    }
    upkeep(){
        //set gui
        this.gui.setText(cooldown);
        //Player will not move in the x-axis unless a movement key is being pressed
        this.setVelocityX(0);

        //Player has "drag" on the x-axis meaning they slide a bit after an input
        this.setDragX(1000);

        //This will reset the number of jumps available to the player whenever the player lands
        if (this.body.touching.down) {
            this.currentJumps = 0;
        }
    }
}

class Pentagon extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'pentagon');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setGravityY(1000);
    }
}

var game = new Phaser.Game(config);

//Game Objects
var platforms;
var player1;
var player2;
var pentagons = [];
var totalPentagons = 12;


var P1it = true;
var P2it = false;

//Keyboard controls
var cursors;
var keys;
var space;

var guiTimer
var temp;

var cooldown = 0;
function preload()
{
    this.load.image('background', 'images/background.png');
    this.load.image('platform', 'images/platform.png');
    this.load.image('player', 'images/bee.png');
    this.load.image('pentagon', 'images/pentagon.png');
    this.load.image('arrow', 'images/tagArrow.png');
}

function create()
{
    //Set the background origin to be at (0, 0) or top left corner of the image rather than the center of the image asset
   let background = this.add.tileSprite(0, 0, game.scale.width, game.scale.height, 'background').setOrigin(0, 0);

   //Create the platforms and the player character set to collide with the platforms
   createPlatforms(this);

   player1 = new Player(this, 400, 400);
   player1.setScale(0.25)
   player1.setTint(0xaa3030)
   this.physics.add.collider(player1, platforms);

   player2 = new Player(this, 400, 400);
   player2.setScale(0.25)
   player2.setTint(0x4040ff)

   this.physics.add.collider(player2, platforms);

   this.physics.add.collider(player1, player2, tag, null, this);

   player1.arrow = this.physics.add.image(0, 0, 'arrow');
   player1.arrow.setScale(0.25);

   player2.arrow = this.physics.add.image(0, 0, 'arrow');
   player2.arrow.setScale(0.25);
    
   //Create the pentagon interactables
   for (var i = 0; i < totalPentagons; i++)
   {
       let myPentagon = new Pentagon(this, Phaser.Math.Between(0, game.scale.width), Phaser.Math.Between(0, game.scale.height-80));
       myPentagon.setScale(0.05)
       this.physics.add.collider(myPentagon, platforms);
       pentagons.push(myPentagon);
   }

   this.physics.add.overlap(player1, pentagons, eatPentagon, null, this);
   this.physics.add.overlap(player2, pentagons, eatPentagon, null, this);

   //Set up user input
   cursors = this.input.keyboard.createCursorKeys();
   keys = this.input.keyboard.addKeys('A, D');
   wRizz = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
   cursors.up.on('down', jump1); //calls jump function when space is pressed
   wRizz.on('down', jump2); 

   player1.gui = this.add.text(16, 16, '1', {fill: '#000', font:"bold 28px Arial"});
   player2.gui = this.add.text(16, 16, '1', {fill: '#000', font:"bold 28px Arial"});

   player1.arrow.setVisible(P1it);
   player2.arrow.setVisible(P2it);
}


function update()
{
    //arrow upkeep
    player1.arrow.setPosition(player1.body.x + player1.width / 8, player1.body.y - 20);
    player2.arrow.setPosition(player2.body.x + player2.width / 8, player2.body.y - 20);

    // player1.arrow.setVisible(P1it);
    // player2.arrow.setVisible(P2it);
    //gui upkeep
    player1.gui.setPosition(player1.body.x + player1.width / 8 - 8, player1.body.y - 30);
    player2.gui.setPosition(player2.body.x + player2.width / 8 - 8, player2.body.y - 30);
    
    //Handle player movements
    player1.upkeep();
    player2.upkeep();
    if (cursors.left.isDown)
    {
        player1.setVelocityX(-400);
    }

    if (keys.A.isDown)
    {
        player2.setVelocityX(-400);
    }

    
    if (cursors.right.isDown)
    {
        player1.setVelocityX(400);
    }

    if (keys.D.isDown)
    {
        player2.setVelocityX(400);
    }

}


function createPlatforms(scene)
{
    platforms = scene.physics.add.staticGroup();

    //basePlatform is the floor of the game
    let basePlatform = platforms.create(game.scale.width/2, game.scale.height-30, 'platform');
    basePlatform.setScale(3, 1).refreshBody(); //scales the base platform in the x axis to cover the entire floor

    platforms.create(250, 350, 'platform'); //creates the upper left platform
    platforms.create(950, 500, 'platform'); //creates the bottom right platform
}

function jump1(event)
{
    if (player1.body.touching.down) {
      //If the player is on the ground, the player can jump
      player1.setVelocityY(-1100);
      player1.currentJumps++;
    } else if (player1.currentJumps < player1.totalJumps) {
      //If the player is not on the ground but has an available air jump, use that jump
      player1.setVelocityY(-800);
      player1.currentJumps++;
    }
}
function jump2(event)
{
    if (player2.body.touching.down) {
      //If the player is on the ground, the player can jump
      player2.setVelocityY(-1100);
      player2.currentJumps++;
    } else if (player2.currentJumps < player2.totalJumps) {
      //If the player is not on the ground but has an available air jump, use that jump
      player2.setVelocityY(-800);
      player2.currentJumps++;
    }
}

//This function is called when a player overlaps with a pentagon
function eatPentagon(player, pentagon)
{
    pentagon.disableBody(true, true); //remove that particular pentagon from the game (physics and visibility)
}

function tag(){
    if(cooldown<1){
        P1it = !P1it;
        P2it = !P2it;
        player1.gui.setVisible(P1it)
        player2.gui.setVisible(P2it)
        cooldown = 3;
        for(let i = 1;i < 4;i++){
            temp = this.time.delayedCall(i*1000, help, null, this);
            
        }
    }
}
function help(){
    if(cooldown>0){
        cooldown--;
    }else{
        cooldown = 0;
        player1.gui.setVisible(false)
        player2.gui.setVisible(false)
        player1.arrow.visible = P1it
        player2.arrow.visible = P2it
    }
}
// function tagCheck(){
//     if(P1it){
//         console.log(this)
//         P1it = false;
//         console.log(3);
//         for(let i = 1;i < 4;i++){
//             temp = this.time.delayedCall(i*1000, console.log, 3-i, this) 
            
//         }
//     }else if(P2it){
//         console.log(this)
//         P2it = false;
//         setTimer1(3);
//     }
// }

// function setTimer1(timer){
//     if(timer>0){
//         player1.gui.setText(timer);
//     }else{
//         P1it = true;
//         player1.gui.setText('');
//     } 
// }

// function setTimer2(timer){
//     if(timer>0){
//         player2.gui.setText(timer);
//     }else{
        
//         P2it = true;
//         player2.gui.setText('');
//     } 
// }