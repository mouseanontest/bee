function launchRunnerGame() {
    //Whatever you do, DO NOT DELETE THE LAUNCH FUNCTION FROM THE .JS OR THE .HTML FILES!! THIS WILL BREAK THE GAME!
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
        constructor(scene, x, y)
        {
            //Constructs player object
            super(scene, x, y, 'player');
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.setScale(0.25);
            this.setCollideWorldBounds(false);
            this.setGravityY(3000); //Gravity is set per object
        }
    }
    
    var game = new Phaser.Game(config);
    
    //Game Objects
    var obstacles;
    var victoryImage;
    var player1;
    var player2;
    
    //Keyboard controls
    var cursors;
    var p1Jump;
    var p2Jump;
    
    //GUI elements
    var gui;
    var guiTimer;
    
    //Gameplay values
    var difficulty = 1;
    var difficultyEnabled = true;
    var hazardType;
    var objectHazard;
    var objectSkin;
    var creatingObstacles = false;
    var objIteration = 0;
    var player1super;
    var player2super;
    
    function preload()
    {
        //Player, title, and sky
        this.load.image('sky', 'images/honeycombBG.png');
        this.load.image('player', 'images/playerBee.png');
        this.load.image('title', 'images/runnerAssets/flappyBeeTitle.png');
        //Victory
        this.load.image('p1v', 'images/player1V.png');
        this.load.image('p2v', 'images/player2V.png');
        //Obstacles
        this.load.image('obstacle1', 'images/runnerAssets/obstacles/obstacle1.png');
        this.load.image('obstacle2', 'images/runnerAssets/obstacles/obstacle2.png');
        this.load.image('obstacle3', 'images/runnerAssets/obstacles/obstacle3var1.png');
        this.load.image('obstacle4', 'images/runnerAssets/obstacles/obstacle3var2.png');
        this.load.image('obstacle5', 'images/runnerAssets/obstacles/obstacle3var3.png');
        //Music
        this.load.audio('music', 'audio/runner.mp3');
    }
    
    function create()
    {

        //Begin music
        music = this.sound.add('music');
        music.play({ loop: true });
        
        //Set the background image
        let bgImage = this.add.image(600, 350, 'sky');
        bgImage.setScale(1);
    
       //Adds players to the scene
       player1 = new Player(this, 400, 500);
       player2 = new Player(this, 400, 400);
       //Sets player colors
       player1.setTint(0x5050ff);
       player2.setTint(0xaa3030);
       
       //Disables player movement
       player1.disableBody(true, false);
       player2.disableBody(true, false);
       this.time.delayedCall(5000, enablePlayers, [], this);
       
       //Set up user input
       cursors = this.input.keyboard.createCursorKeys();
       cursors.up.on('down', jumpP2); //calls p2Jump function when up key is pressed
       p1Jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
       p1Jump.on('down', jumpP1); //calls p1Jump function when W key is pressed
       
       //Starting countdown timer
       gui = this.add.text(500, 100, 'Get ready...', {fontSize: '32px', fill: '#000'});
       this.time.delayedCall(2000, setStartText, ['     3'], this);
       this.time.delayedCall(3000, setStartText, ['     2'], this);
       this.time.delayedCall(4000, setStartText, ['     1'], this);
       this.time.delayedCall(5000, setStartText, [' Flap!'], this);
       this.time.delayedCall(6000, setStartText, [''], this);
       
       //Begins obstacle generation
       obstacles = this.physics.add.group();
       this.time.delayedCall(5000, spawnObstacles, [this], this);
    }

    function setStartText(text) {
        //Bypasses a stupid function scope restriction
        gui.setText(text);
    }
    
    function enablePlayers() {
        //Enables players
        console.log("Players have been enabled");
        player1.enableBody();
        player2.enableBody();
        this.physics.add.collider(player1, obstacles);
        this.physics.add.collider(player2, obstacles);
    }

    function spawnObstacles(scene){
        creatingObstacles = true;
        /*/
        ObjectHazard is a collidable obstacle 
        hazardType defines the type of obstacle that is generated
        1- Top pillar
        2- Bottom pillar
        3- Box obstacle (3 variations)
        It is possible for an unavoidable obstacle to be generated at higher difficulties as a result of top and bottom pillars generating in quick succession
        but I'm lazy and it's not something that would be super noticable to the average player.
        /*/
        if(objIteration < 0) {
            hazardType = 3;
        } else {
            hazardType = Phaser.Math.Between(1, 3);
        }
        if (hazardType === 1) {
            objectHazard = obstacles.create(game.scale.width+500, Phaser.Math.Between(100, 150), 'obstacle1');
            objectHazard.setScale(Phaser.Math.Between(4, 6) * 0.1).refreshBody();
        } else if (hazardType === 2) {
            objectHazard = obstacles.create(game.scale.width+500, Phaser.Math.Between(600, 650), 'obstacle2');
            objectHazard.setScale(Phaser.Math.Between(5, 7) * 0.1).refreshBody();
        } else {
            if (objIteration > 0){
                objectSkin = Phaser.Math.Between(3, 5);
            } else {
                objectSkin = 4;
            }
            objectHazard = obstacles.create(game.scale.width+500, Phaser.Math.Between(200, 500), 'obstacle'+objectSkin);
            if (objectSkin < 5) {
                objectHazard.setScale(Phaser.Math.Between(35, 50) * 0.01).refreshBody();
            } else {
                objectHazard.setScale(0.30).refreshBody();
            }
        }
        objectHazard.setVelocityX(difficulty * -550);
        objectHazard.setPushable(false);
        
        //Spawns a new obstacle every 1-3 seconds
        scene.time.delayedCall(Phaser.Math.Between(1000 - (difficulty * 500), 2000 - (difficulty * 100)), spawnObstacles, [scene], scene);

        objIteration++;
    }

    function checkPlayerStates(refFrame) {
        //Checks to see if players have exited level bounds
        if (player1.y > 700 || player1.x < 0) {
            gameOver(1, refFrame);
            console.log("detected");
        } else if (player2.y > 700 || player2.x < 0) {
            gameOver(2, refFrame);
            console.log("detected");
        }
    }

    function gameOver(winner, refFrame) {
        //Stops game and displays win screen
        if (winner === 1) {
            console.log("Player 1 wins!");
            victoryImage = refFrame.add.image(600, 350, 'p1v');
        } else if (winner === 2) {
            console.log("Player 2 wins!");
            victoryImage = refFrame.add.image(600, 350, 'p2v');
        }
        refFrame.scene.pause();
    }

    
    function update()
    {
        //Checks player position every frame
        checkPlayerStates(this);

        //Checks to see if players should get a super jump
        if (player1.body.touching.down && player1super === 0){
            player1super = 1;
        }
        if (player2.body.touching.down && player2super === 0){
            player2super = 1;
        }

        //Adds player drag
        player1.setDragX(1000 * difficulty);
        player2.setDragX(1000 * difficulty);
        if (difficultyEnabled === true) {
            difficulty = difficulty + 0.000075;
        }
        
        //Removes old obstacles
        if (creatingObstacles == true){
            if (objectHazard.x < -100) {
                console.log("Object Destroyed");
                objectHazard.destroy();
            }
        }

    }
    
    //Jump events for players
    function jumpP1(event)
    {
        if (player1.y > 0){
            if (player1super === 1) {
                player1.setVelocityY(-1500);
                player1super = 0;
            } else {
                player1.setVelocityY(-800);
          }
        }
    }
    
    function jumpP2(event)
    {
        if (player2super === 1) {
            player2.setVelocityY(-1500);
            player2super = 0;
        } else {
            player2.setVelocityY(-800);
        }
    }
}