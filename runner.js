function launchRunnerGame() {
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
    var creatingObstacles = false;
    
    function preload()
    {
        //Player and sky
        this.load.image('sky', 'images/honeycombBG.png');
        this.load.image('player', 'images/playerBee.png');
        //Obstacles
        this.load.image('obstacle1', 'images/runnerAssets/obstacles/obstacle1.png');
        this.load.image('obstacle2', 'images/runnerAssets/obstacles/obstacle2.png');
        this.load.image('obstacle3', 'images/runnerAssets/obstacles/obstacle3var1.png');
        this.load.image('obstacle4', 'images/runnerAssets/obstacles/obstacle3var2.png');
        this.load.image('obstacle5', 'images/runnerAssets/obstacles/obstacle3var3.png');
        //Countdown (scrapped until further notice)
        this.load.image('countdown1', 'images/runnerAssets/.countdown/countdown3.png');
        this.load.image('countdown2', 'images/runnerAssets/.countdown/countdown2.png');
        this.load.image('countdown3', 'images/runnerAssets/.countdown/countdown1.png');
        this.load.image('countdown4', 'images/runnerAssets/.countdown/countdownFlap.png');
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
       cursors.up.on('down', jumpP1); //calls p1Jump function when up key is pressed
       p2Jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
       p2Jump.on('down', jumpP2); //calls p2Jump function when W key is pressed
       
       gui = this.add.text(500, 100, '', {fontSize: '32px', fill: '#000'});
       
       //Begins obstacle generation
       obstacles = this.physics.add.group();
       this.time.delayedCall(5000, spawnObstacles, [this], this);
    }
    
    function enablePlayers() {
        console.log("function called");
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
        let hazardType = Phaser.Math.Between(1, 3);
        if (hazardType === 1) {
            objectHazard = obstacles.create(game.scale.width+500, Phaser.Math.Between(100, 150), 'obstacle1');
            objectHazard.setScale(Phaser.Math.Between(4, 6) * 0.1).refreshBody();
        } else if (hazardType === 2) {
            objectHazard = obstacles.create(game.scale.width+500, Phaser.Math.Between(600, 650), 'obstacle2');
            objectHazard.setScale(Phaser.Math.Between(5, 7) * 0.1).refreshBody();
        } else {
            let objectSkin = Phaser.Math.Between(3, 5);
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
    }

    
    function update()
    {
        //Adds player drag
        player1.setDragX(1000 * difficulty);
        player2.setDragX(1000 * difficulty);
        if (difficultyEnabled === true) {
            difficulty = difficulty + 0.00005;
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
        player1.setVelocityY(-800);
    }
    
    function jumpP2(event)
    {
        player2.setVelocityY(-800);
    }
}