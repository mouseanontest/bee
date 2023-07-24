

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
var player;
var pentagons = [];
var totalPentagons = 12;

//Keyboard controls
var cursors;
var keys;
var space;

var gui;
var guiTimer;

function preload()
{
    this.load.image('background', 'images/background.png');
    this.load.image('platform', 'images/platform.png');
    this.load.image('player', 'images/bee.png');
    this.load.image('pentagon', 'images/pentagon.png');
}

function create()
{
    //Set the background origin to be at (0, 0) or top left corner of the image rather than the center of the image asset
   let background = this.add.tileSprite(0, 0, game.scale.width, game.scale.height, 'background').setOrigin(0, 0);

   //Create the platforms and the player character set to collide with the platforms
   createPlatforms(this);

   player1 = new Player(this, 400, 400);
   player1.setScale(0.25)
   this.physics.add.collider(player1, platforms);

   player2 = new Player(this, 400, 400);
   player2.setScale(0.25)
   this.physics.add.collider(player2, platforms);

   //Create the pentagon interactables
   for (var i = 0; i < totalPentagons; i++)
   {
       let myPentagon = new Pentagon(this, Phaser.Math.Between(0, game.scale.width), Phaser.Math.Between(0, game.scale.height-80));
       myPentagon.setScale(0.1)
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

   gui = this.add.text(16, 16, '', {fontSize: '32px', fill: '#000'});
}

function createPlatforms(scene)
{
    platforms = scene.physics.add.staticGroup();

    //basePlatform is the floor of the game
    let basePlatform = platforms.create(game.scale.width/2, game.scale.height-30, 'platform');
    basePlatform.setScale(3, 1).refreshBody(); //scales the base platform in the x axis to cover the entire floor

    platforms.create(250, 350, 'platform'); //creates the upper left platform
    platforms.create(950, 500, 'platform'); //creates the bottome right platform
}

function update()
{
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
    gui.setText('Yum yum!');
    guiTimer = this.time.delayedCall(1000, removeText, [], this);
}

//Reset the gui text to be empty after the guiTimer elapses
function removeText()
{
    gui.setText('');
}

