

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    speed = 0;
    jump = 0;
    onJump = false;
    onSpeed = false;
    constructor(scene, x, y)
    {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(2);
        this.setCollideWorldBounds(true);
        this.setGravityY(2500); //We will set gravity *per object* rather than for the scene!
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
var basicPlatforms;
var speedPlatforms;
var jumpPlatforms;
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

var graphics
var guiTimer
var temp;

var cooldown = 0;

var basicArray = [];
var jumpArray = [];
var speedArray = [];
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
    // this.cameras.main.startFollow(this.ship, true, 0.09, 0.09);

    this.cameras.main.setZoom(1);

    //unused
    graphics = this.add.graphics();
    //Set the background origin to be at (0, 0) or top left corner of the image rather than the center of the image asset
   let background = this.add.tileSprite(0, 0, game.scale.width, game.scale.height, 'background').setOrigin(0, 0);

   //Create the platforms and the player character set to collide with the platforms
   createPlatforms(this);

   player1 = new Player(this, 400, 400);
   player1.setScale(0.15)
   player1.setTint(0xaa3030)
   this.physics.add.collider(player1, basicPlatforms);
   this.physics.add.collider(player1, speedPlatforms, function(){player1.onSpeed = true}, null, this);
   this.physics.add.collider(player1, jumpPlatforms, function(){player1.onJump = true}, null, this);

   player2 = new Player(this, 400, 400);
   player2.setScale(0.15)
   player2.setTint(0x5050ff)
   this.physics.add.collider(player2, basicPlatforms);
   this.physics.add.collider(player2, speedPlatforms, function(){player2.onSpeed = true}, null, this);
   this.physics.add.collider(player2, jumpPlatforms, function(){player2.onJump = true}, null, this);

   this.physics.add.collider(player1, player2, tag, null, this);

   player1.arrow = this.physics.add.image(0, 0, 'arrow');
   player1.arrow.setScale(0.15)

   player2.arrow = this.physics.add.image(0, 0, 'arrow');
   player2.arrow.setScale(0.15);
   
   //camera stuff
   this.cameras.main.setBounds(0, 0, 800, 600);
   this.cameras.main.startFollow(player1, true);
    
   //Create the pentagon interactables
   for (var i = 0; i < totalPentagons; i++)
   {
       let myPentagon = new Pentagon(this, Phaser.Math.Between(0, game.scale.width), Phaser.Math.Between(0, game.scale.height-80));
       myPentagon.setScale(0.05)
       this.physics.add.collider(myPentagon, basicPlatforms);
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

   player1.gui = this.add.text(16, 16, '1', {fill: '#000', font:"bold 24px Arial"});
   player2.gui = this.add.text(16, 16, '1', {fill: '#000', font:"bold 24px Arial"});

   player1.arrow.setVisible(P1it);
   player2.arrow.setVisible(P2it);
}


function update()
{
    if(player1.onSpeed){
        player1.speed = 100;
    }else{
        player1.speed = 0;
    }

    if(player1.onJump){
        player1.jump = -100;
    }else{
        player1.jump = 0
    }


    if(player2.onSpeed){
        player2.speed = 100;
    }else{
        player2.speed = 0;
    }

    if(player2.onJump){
        player2.jump = -100;
    }else{
        player2.jump = 0
    }


    //arrow upkeep
    player1.arrow.setPosition(player1.body.x + player1.width / 8 - 8, player1.body.y - 15);
    player2.arrow.setPosition(player2.body.x + player2.width / 8 - 8, player2.body.y - 15);
    if(cooldown<1){
        player1.gui.setVisible(false)
        player2.gui.setVisible(false)

        player1.arrow.setVisible(P1it);
        player2.arrow.setVisible(P2it);
    }else{
        player1.arrow.setVisible(false);
        player2.arrow.setVisible(false);

    }
    //gui upkeep
    player1.gui.setPosition(player1.body.x + player1.width / 8 - 16, player1.body.y - 25);
    player2.gui.setPosition(player2.body.x + player2.width / 8 - 16, player2.body.y - 25);
    
    //Handle player movements
    player1.upkeep();
    player2.upkeep();
    if (cursors.left.isDown)
    {
        player1.setVelocityX(-400 - player1.speed);
    }

    if (keys.A.isDown)
    {
        player2.setVelocityX(-400 - player2.speed);
    }

    
    if (cursors.right.isDown)
    {
        player1.setVelocityX(400 + player1.speed);
    }

    if (keys.D.isDown)
    {
        player2.setVelocityX(400 + player2.speed);
    }
    player1.onSpeed = false
    player1.onJump = false

    player2.onSpeed = false
    player2.onJump = false
}


function createPlatforms(scene)
{
    basicPlatforms = scene.physics.add.staticGroup();
    speedPlatforms = scene.physics.add.staticGroup();
    jumpPlatforms = scene.physics.add.staticGroup();
    //basePlatform is the floor of the game
    basicArray.push(basicPlatforms.create(game.scale.width/2, game.scale.height-30, 'platform'));
    basicArray[0].setScale(1.5, 0.4).refreshBody(); //scales the base platform in the x axis to cover the entire floor

    speedArray.push(speedPlatforms.create(250, 350, 'platform')) //creates the upper left platform
    jumpArray.push(jumpPlatforms.create(400, 475, 'platform'))//creates the bottom right platform

    jumpArray[0].setScale(0.5, 0.25).refreshBody();
    speedArray[0].setScale(0.5).refreshBody();
    speedPlatforms.setTint(0xffa500);
    basicPlatforms.setTint(0xf0f0f0);
    jumpPlatforms.setTint(0xa0a0ff);
}

function jump1(event)
{
    if (player1.body.touching.down) {
      //If the player is on the ground, the player can jump
      player1.setVelocityY(-800 + player1.jump);
      player1.currentJumps++;
    } else if (player1.currentJumps < player1.totalJumps) {
      //If the player is not on the ground but has an available air jump, use that jump
      player1.setVelocityY(-500);
      player1.currentJumps++;
    }
}
function jump2(event)
{
    if (player2.body.touching.down) {
      //If the player is on the ground, the player can jump
      player2.setVelocityY(-800 + player2.jump);
      player2.currentJumps++;
    } else if (player2.currentJumps < player2.totalJumps) {
      //If the player is not on the ground but has an available air jump, use that jump
      player2.setVelocityY(-500);
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