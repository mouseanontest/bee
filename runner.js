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
    
    function preload()
    {
        this.load.image('sky', 'images/honeycombBG.png');
        this.load.image('player', 'images/playerBee.png');
        this.load.image('obstacle1', 'images/obstacles/obstacle1.png');
        this.load.image('obstacle2', 'images/obstacles/obstacle2.png');
        this.load.image('obstacle3', 'images/obstacles/obstacle3var1.png');
        this.load.image('obstacle4', 'images/obstacles/obstacle3var2.png');
        this.load.image('obstacle5', 'images/obstacles/obstacle3var3.png');
    }
    
    function create()
    {
    
        //Set the background image
        let bgImage = this.add.image(600, 350, 'sky')
        bgImage.setScale(1);
    
       //Starts generating obstacles and adds players to the scene
       obstacles = this.physics.add.group();
       spawnObstacles(this);
       player1 = new Player(this, 400, 400);
       player2 = new Player(this, 400, 400);
       //sets player colors
       player1.setTint(0x5050ff);
       player2.setTint(0xaa3030);
       this.physics.add.collider(player1, obstacles);
       this.physics.add.collider(player2, obstacles);
    
       //Set up user input
       cursors = this.input.keyboard.createCursorKeys();
       p1Jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
       p1Jump.on('down', jumpP1); //calls jump function when space is pressed
       cursors.up.on('down', jumpP2); //calls jump function when space is pressed
    
       gui = this.add.text(500, 100, '', {fontSize: '32px', fill: '#000'});
    }
    
    function spawnObstacles(scene){
        //objectHazard is a collidable obstacle
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
        scene.time.delayedCall(Phaser.Math.Between(1000 - (difficulty * 500), 2000 - (difficulty * 500)), spawnObstacles, [scene], scene);
    }
    
    function update()
    {
        //Adds player drag
        player1.setDragX(1000 * difficulty);
        player2.setDragX(1000 * difficulty);
        if (difficultyEnabled === true) {
            difficulty = difficulty + 0.0005;
        }
        
        if (objectHazard.x < -100) {
            console.log("Object Destroyed");
            objectHazard.destroy();
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