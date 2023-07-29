// function LaunchTagGame(){

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
        },

        fps: {forceSetTimeOut: true, fps: 60},
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
        onBasic = false;
        offJump = true;
        offSpeed = true;

        constructor(scene, x, y)
        {
            super(scene, x, y, 'player');
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.setScale(2);
            this.setCollideWorldBounds(true);
            this.setGravityY(1500);
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


    var game = new Phaser.Game(config);

    //Game Objects
    var basicPlatforms;
    var speedPlatforms;
    var jumpPlatforms;
    var player1;
    var player2;

    var P1it = true;
    var P2it = false;

    //Keyboard controls
    var cursors;
    var keys;

    var cooldown = 0;

    var basicArray = [];
    var jumpArray = [];
    var speedArray = [];

    var zoomControlX;
    var zoomControlY;


    var go = null
    var countdown;

    var maxCount = 75

    var jumpSound
    var alarmSound

    //sounds
    function preload()
    {
        this.load.image('atsa', 'images/atsa.png');
        this.load.image('background', 'images/honeycombBG.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('player', 'images/playerBee.png');
        this.load.image('arrow', 'images/tagArrow.png');
        this.load.audio('jumpSound', 'audio/jump.ogg');
        this.load.audio('alarmSound', 'audio/alarm.wav')
    }

    function create()
    {
        jumpSound=this.sound.add('jumpSound')
        alarmSound=this.sound.add('alarmSound')

        //unused
        graphics = this.add.graphics();

        //Set the background origin to be at (0, 0) or top left corner of the image rather than the center of the image asset
        let background = this.add.tileSprite(0, 0, game.scale.width, game.scale.height, 'background').setOrigin(0, 0);
    
        //Create the platforms and the player character set to collide with the platforms
        createPlatforms(this);

        player1 = new Player(this, 300, 400);
        player1.setScale(0.1)
        player1.setTint(0xaa3030)
        this.physics.add.collider(player1, basicPlatforms, function(){player1.onBasic = true}, null, this);
        this.physics.add.collider(player1, speedPlatforms, function(){player1.onSpeed = true; player1.offJump = true}, null, this);
        this.physics.add.collider(player1, jumpPlatforms, function(){player1.onJump = true; player1.offSpeed = true}, null, this);

        player2 = new Player(this, 700, 400);
        player2.setScale(0.1)
        player2.setTint(0x5050ff)
        this.physics.add.collider(player2, basicPlatforms, function(){player2.onBasic = true}, null, this);
        this.physics.add.collider(player2, speedPlatforms, function(){player2.onSpeed = true; player2.offSpeed = true}, null, this);
        this.physics.add.collider(player2, jumpPlatforms, function(){player2.onJump = true; player2.offSpeed = true}, null, this);

        this.physics.add.collider(player1, player2, tag, null, this);

        player1.arrow = this.physics.add.image(0, 0, 'arrow');
        player1.arrow.setScale(0.1)

        player2.arrow = this.physics.add.image(0, 0, 'arrow');
        player2.arrow.setScale(0.1);
        
        //camera stuff
        this.cameras.main.setBounds(0, 0, 800, 600);
            
        //Set up user input
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('A, D');
        wRizz = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        cursors.up.on('down', jump1); //calls jump function when space is pressed
        wRizz.on('down', jump2); 

        player1.gui = this.add.text(16, 16, '1', {fill: '#000', font:"bold 16px Arial"});
        player2.gui = this.add.text(16, 16, '1', {fill: '#000', font:"bold 16px Arial"});


        player1.arrow.setVisible(P1it);
        player2.arrow.setVisible(P2it);
        
        Atsa = this.add.image(game.scale.width/2, game.scale.height/2, "atsa");
        
        this.input.on('pointerdown', function (pointer)
        {
            if(go === null){
                go = true;
                gameEnd.call(this, maxCount);
                Atsa.destroy()
            }
        }, this);
        
        this.cameras.main.setZoom(1)
        countdown = this.add.text(10,10, "", {fill: '#000', font: "bold 56px Arial"})
        // countdown.setOrigin(countdown.width/2, countdown.height/2)
        // countdown.setScrollFactor(0,0)
    }


    function update()
    {  
        if(go){
            frames++   
            if(player1.onSpeed){
                player1.speed = 150;
            }else{
                player1.speed = 0;
            }

            if(player1.onJump){
                player1.jump = -100;
            }else{
                player1.jump = 0
            }


            if(player2.onSpeed){
                player2.speed = 150;
            }else{
                player2.speed = 0;
            }

            if(player2.onJump){
                player2.jump = -100;
            }else{
                player2.jump = 0
            }

            player1.speed += 25*P1it
            player2.speed += 25*P2it

            //arrow upkeep
            player1.arrow.setPosition(player1.body.x + player1.width / 8 - 15, player1.body.y - 10);
            player2.arrow.setPosition(player2.body.x + player2.width / 8 - 15, player2.body.y - 10);
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
            player1.gui.setPosition(player1.body.x + player1.width / 8 - 20, player1.body.y-18);
            player2.gui.setPosition(player2.body.x + player2.width / 8 - 20, player2.body.y-18);
            
            //camera
            this.cameras.main.scrollX = (player1.x+player2.x)/2-this.cameras.main.width/2;
            this.cameras.main.scrollY = (player1.y+player2.y)/2-this.cameras.main.height/2;
            
            zoomControlX = game.scale.width/Math.abs(player1.x-player2.x);
            zoomControlY = game.scale.height/Math.abs(player1.y-player2.y);
            if(!zoomControlX){
                zoomControlX = zoomControlY;
            }
            if(!zoomControlY){
                zoomControlY = zoomControlX;
            }
            this.cameras.main.setZoom(Math.min(zoomControlX, zoomControlY)*0.7);
            if(this.cameras.main.zoom){
                this.cameras.main.setZoom(1);
            }
            if(this.cameras.main.zoom>3){
                this.cameras.main.setZoom(3);
            }
            //countdown
            
            // countdown.setPosition((player1.x+player2.x)/2 - this.cameras.main.displayWidth/2,
            //                       (player1.y+player2.y)/2 - countdown.height/2);
            // console.log(countdown.x)

            // console.log(countdown.y)

            // player upkeep

            player1.upkeep();
            player2.upkeep();
            
            //player movement and direction
            if (cursors.left.isDown)
            {
                player1.flipX = true
                player1.setVelocityX(-300 - player1.speed);
            }

            if (keys.A.isDown)
            {
                player2.flipX = true
                player2.setVelocityX(-300 - player2.speed);
            }

            
            if (cursors.right.isDown)
            {
                player1.flipX = false
                player1.setVelocityX(300 + player1.speed);
            }

            if (keys.D.isDown)
            {
                player2.flipX = false
                player2.setVelocityX(300 + player2.speed);
            }
            
            if(!player1.body.touching.down||player1.onBasic){
                player1.onSpeed = false
                player1.onJump = false
            }
            
            if(player1.offSpeed){
                player1.onSpeed = false;
                player1.offJump = false;
            }
            if(player1.offJump){
                player1.onJump = false
            }

            if(player2.offSpeed){
                player2.onSpeed = false;
                player2.offJump = false;
            }
            if(player2.offJump){
                player2.onJump = false
            }

            if(!player2.body.touching.down||player2.onBasic){
                player2.onSpeed = false
                player2.onJump = false
            }


            player1.offSpeed = false
            player1.offJump = false

            player1.onBasic = false
            player2.onBasic = false
        }
    }

 
    function createPlatforms(scene)
    {
        basicPlatforms = scene.physics.add.staticGroup();
        speedPlatforms = scene.physics.add.staticGroup();
        jumpPlatforms = scene.physics.add.staticGroup();

        //bottom ground
        jumpArray.push(jumpPlatforms.create(37.5, game.scale.height, 'platform'));
        jumpArray[0].setScale(0.15, 0.25).refreshBody();

        speedArray.push(speedPlatforms.create(37.5*2+87.5, game.scale.height, 'platform'));
        speedArray[0].setScale(0.35, 0.25).refreshBody();

        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5, game.scale.height, 'platform'));
        jumpArray[1].setScale(0.15, 0.25).refreshBody();

        basicArray.push(basicPlatforms.create(37.5*2+87.5*2+37.5*2+75, game.scale.height, 'platform'));
        basicArray[0].setScale(0.3, 0.25).refreshBody();

        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5*2+75*2+25, game.scale.height, 'platform'));
        jumpArray[2].setScale(0.1, 0.25).refreshBody();

        basicArray.push(basicPlatforms.create(37.5*2+87.5*2+37.5*2+75*2+25*2+87.5, game.scale.height, 'platform'));
        basicArray[1].setScale(0.35, 0.25).refreshBody();

        speedArray.push(speedPlatforms.create(37.5*2+87.5*2+37.5*2+75*2+25*2+87.5*2+50, game.scale.height, 'platform'));
        speedArray[1].setScale(0.2, 0.25).refreshBody();

        //left half, left-right
        
        jumpArray.push(jumpPlatforms.create(37.5*2+25, game.scale.height-110, 'platform'));
        jumpArray[3].setScale(0.1, 0.1).refreshBody();

        jumpArray.push(jumpPlatforms.create(37.5*2-25, game.scale.height-205, 'platform'));
        jumpArray[4].setScale(0.1, 0.1).refreshBody();

        basicArray.push(basicPlatforms.create(37.5*2+25*2+12.5, game.scale.height-200, 'platform'));
        basicArray[2].setScale(0.05, 9/10).refreshBody();

        basicArray.push(basicPlatforms.create(37.5*2+87.5*2-12.5*2, game.scale.height-90, 'platform'));
        basicArray[3].setScale(0.05, 0.3).refreshBody();
        
        basicArray.push(basicPlatforms.create(37.5*2+25*2+25, game.scale.height-105, 'platform'));
        basicArray[4].setScale(0.1, 0.05).refreshBody();
        
        speedArray.push(speedPlatforms.create(37.5*2+25*2+12.5+62.5, game.scale.height-240, 'platform'));
        speedArray[2].setScale(0.2, 0.1).refreshBody();

        basicArray.push(basicPlatforms.create(37.5*2+25*2+62.5*2+12.5, game.scale.height-260, 'platform'));
        basicArray[5].setScale(0.05, 0.3).refreshBody();

        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5*2+37.5, game.scale.height-100, 'platform'));
        jumpArray[5].setScale(0.15, 0.1).refreshBody();
        
        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5*2+37.5*2+12.5, game.scale.height-190, 'platform'));
        jumpArray[6].setScale(0.15, 0.1).refreshBody();
        
        jumpArray.push(jumpPlatforms.create(37.5*2+25*2+62.5*2+12.5*2+37.5, game.scale.height-280, 'platform'));
        jumpArray[7].setScale(0.15, 0.1).refreshBody();
        


        //right half, left-right

        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5*2+37.5*2+25*2, game.scale.height-280, 'platform'));
        jumpArray[8].setScale(0.1, 0.1).refreshBody();
        
        basicArray.push(basicPlatforms.create(37.5*2+25*2+62.5*2+12.5+200, game.scale.height-225, 'platform'));
        basicArray[6].setScale(0.05, 0.45).refreshBody();
        
        basicArray.push(basicPlatforms.create(37.5*2+25*2+62.5*2+12.5+200, game.scale.height-92.5, 'platform'));
        basicArray[7].setScale(0.05, 0.35).refreshBody();

        basicArray.push(basicPlatforms.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+50, game.scale.height-280, 'platform'));
        basicArray[8].setScale(0.2, 0.1).refreshBody();
        
        basicArray.push(basicPlatforms.create(37.5*2+25*2+62.5*2+12.5*2+200+112.5, game.scale.height-245, 'platform'));
        basicArray[9].setScale(0.05, 0.45).refreshBody();

        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+50, game.scale.height-200, 'platform'));
        jumpArray[9].setScale(0.3, 0.1).refreshBody();
        
        basicArray.push(basicPlatforms.create(37.5*2+25*2+62.5*2+12.5*2+200+112.5+125, game.scale.height-250, 'platform'));
        basicArray[10].setScale(0.05, 0.4).refreshBody();

        basicArray.push(basicPlatforms.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+50+25, game.scale.height-125, 'platform'));
        basicArray[11].setScale(0.1, 0.1).refreshBody();
        
        basicArray.push(basicPlatforms.create(37.5*2+25*2+62.5*2+12.5+200*2, game.scale.height-92.5, 'platform'));
        basicArray[12].setScale(0.05, 0.35).refreshBody();

        basicArray.push(basicPlatforms.create(game.scale.width-10, game.scale.height-25, 'platform'));
        basicArray[13].setScale(0.05, 0.35).refreshBody();
        
        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, game.scale.height-150, 'platform'));
        jumpArray[10].setScale(0.05, 0.1).refreshBody();
        
        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, game.scale.height-225, 'platform'));
        jumpArray[11].setScale(0.05, 0.1).refreshBody();
        
        jumpArray.push(jumpPlatforms.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, game.scale.height-340, 'platform'));
        jumpArray[12].setScale(0.05, 0.1).refreshBody();

        jumpArray.push(jumpPlatforms.create(37.5*2-25, game.scale.height-340, 'platform'));
        jumpArray[13].setScale(0.1, 0.1).refreshBody();




        speedPlatforms.setTint(0xeaa500);
        basicPlatforms.setTint(0xdadada);
        jumpPlatforms.setTint(0xa0a0ea);
    }
//please help me

    function jump1(event)
    {
        if (player1.body.touching.down) {
        //If the player is on the ground, the player can jump
        player1.setVelocityY(-400 + player1.jump);
        player1.currentJumps = 1;
        jumpSound.play()
        } else if (player1.currentJumps < player1.totalJumps) {
        //If the player is not on the ground but has an available air jump, use that jump
        player1.setVelocityY(-300);
        player1.currentJumps = 2;
        jumpSound.play()
        }
    }
    function jump2(event)
    {
        if (player2.body.touching.down) {
        //If the player is on the ground, the player can jump
        player2.setVelocityY(-400 + player2.jump);
        player2.currentJumps = 1;
        jumpSound.play()
        } else if (player2.currentJumps < player2.totalJumps) {
        //If the player is not on the ground but has an available air jump, use that jump
        player2.setVelocityY(-300);
        player2.currentJumps = 2;
        jumpSound.play()
        }
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

    function gameEnd(count){
        // console.log(count)
        if(count>maxCount/3*2){
            document.getElementById("timer").style.color = "green"
        }else if(count>maxCount/3){
            document.getElementById("timer").style.color = "orange"
        }else{
            document.getElementById("timer").style.color = "red"
        }
        document.getElementById("timer").innerHTML = "Time Left: " + count
        if(count === 0){
            alarmSound.play()
            go = false;
            player1.disableBody(true, false);
            player2.disableBody(true, false);
            this.cameras.main.setZoom(1);
            if(P1it){
                countdown.setText("Player 2 wins!")
            }
            if(P2it){
                countdown.setText("Player 1 wins!")
            }
            changeScore(P1it, P2it)
            document.getElementById("timer").innerHTML = "Game End"
        }else{
            this.time.delayedCall(1000, gameEnd.bind(this, count-1), null, this);
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
// }