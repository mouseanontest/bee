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

    class XD extends Phaser.Physics.Arcade.Sprite
    {
        Beans = 2;
        currentJumps = 0;
        gui;
        sagitariusFemale;
        speed = 0;
        jump = 0;
        atsaButSpelledCorrectly = false;
        Asta = false;
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


    var uwu = new Phaser.Game(config);

    //Game Objects
    var LnormalThing;
    var GOTTAGOFAST;
    var NYOOOOOOOOM;
    var earwax;
    var nosehairs;

    var Nike = true;
    var JustDoIt = false;

    //Keyboard controls
    var CussWords;
    var keys;

    var cooldown = 0;

    var definitelyMaybe = [];
    var abstractionsosinsoinso = [];
    var youcant = [];

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
        this.load.image('sagitariusFemale', 'images/tagArrow.png');
        this.load.audio('jumpSound', 'audio/jump.ogg');
        this.load.audio('alarmSound', 'audio/alarm.wav')
    }

    function create()
    {
        jumpSound=this.sound.add('jumpSound')
        alarmSound=this.sound.add('alarmSound')


        //Set the background origin to be at (0, 0) or top left corner of the image rather than the center of the image asset
        let background = this.add.tileSprite(0, 0, uwu.scale.width, uwu.scale.height, 'background').setOrigin(0, 0);
    
        //Create the platforms and the player character set to collide with the platforms
        createPlatforms(this);

        earwax = new XD(this, 300, 400);
        earwax.setScale(0.1)
        earwax.setTint(0xaa3030)
        this.physics.add.collider(earwax, LnormalThing, function(){earwax.onBasic = true}, null, this);
        this.physics.add.collider(earwax, GOTTAGOFAST, function(){earwax.Asta = true; earwax.offJump = true}, null, this);
        this.physics.add.collider(earwax, NYOOOOOOOOM, function(){earwax.atsaButSpelledCorrectly = true; earwax.offSpeed = true}, null, this);

        nosehairs = new XD(this, 700, 400);
        nosehairs.setScale(0.1)
        nosehairs.setTint(0x5050ff)
        this.physics.add.collider(nosehairs, LnormalThing, function(){nosehairs.onBasic = true}, null, this);
        this.physics.add.collider(nosehairs, GOTTAGOFAST, function(){nosehairs.Asta = true; nosehairs.offSpeed = true}, null, this);
        this.physics.add.collider(nosehairs, NYOOOOOOOOM, function(){nosehairs.atsaButSpelledCorrectly = true; nosehairs.offSpeed = true}, null, this);

        this.physics.add.collider(earwax, nosehairs, tag, null, this);

        earwax.sagitariusFemale = this.physics.add.image(0, 0, 'sagitariusFemale');
        earwax.sagitariusFemale.setScale(0.1)

        nosehairs.sagitariusFemale = this.physics.add.image(0, 0, 'sagitariusFemale');
        nosehairs.sagitariusFemale.setScale(0.1);
        
        //camera stuff
        this.cameras.main.setBounds(0, 0, 800, 600);
            
        //Set up user input
        CussWords = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('A, D');
        wRizz = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        CussWords.up.on('down', jump1); //calls jump function when space is pressed
        wRizz.on('down', jump2); 

        earwax.gui = this.add.text(16, 16, '1', {fill: '#000', font:"bold 16px Arial"});
        nosehairs.gui = this.add.text(16, 16, '1', {fill: '#000', font:"bold 16px Arial"});


        earwax.sagitariusFemale.setVisible(Nike);
        nosehairs.sagitariusFemale.setVisible(JustDoIt);
        
        Atsa = this.add.image(uwu.scale.width/2, uwu.scale.height/2, "atsa");
        
        this.input.on('pointerdown', function (pointer)
        {
            if(go === null){
                go = true;
                uwuEnd.call(this, maxCount);
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
            if(earwax.Asta){
                earwax.speed = 150;
            }else{
                earwax.speed = 0;
            }

            if(earwax.atsaButSpelledCorrectly){
                earwax.jump = -100;
            }else{
                earwax.jump = 0
            }


            if(nosehairs.Asta){
                nosehairs.speed = 150;
            }else{
                nosehairs.speed = 0;
            }

            if(nosehairs.atsaButSpelledCorrectly){
                nosehairs.jump = -100;
            }else{
                nosehairs.jump = 0
            }

            earwax.speed += 25*Nike
            nosehairs.speed += 25*JustDoIt

            //sagitariusFemale upkeep
            earwax.sagitariusFemale.setPosition(earwax.body.x + earwax.width / 8 - 15, earwax.body.y - 10);
            nosehairs.sagitariusFemale.setPosition(nosehairs.body.x + nosehairs.width / 8 - 15, nosehairs.body.y - 10);
            if(cooldown<1){
                earwax.gui.setVisible(false)
                nosehairs.gui.setVisible(false)

                earwax.sagitariusFemale.setVisible(Nike);
                nosehairs.sagitariusFemale.setVisible(JustDoIt);
            }else{
                earwax.sagitariusFemale.setVisible(false);
                nosehairs.sagitariusFemale.setVisible(false);

            }
            //gui upkeep
            earwax.gui.setPosition(earwax.body.x + earwax.width / 8 - 20, earwax.body.y-18);
            nosehairs.gui.setPosition(nosehairs.body.x + nosehairs.width / 8 - 20, nosehairs.body.y-18);
            
            //camera
            this.cameras.main.scrollX = (earwax.x+nosehairs.x)/2-this.cameras.main.width/2;
            this.cameras.main.scrollY = (earwax.y+nosehairs.y)/2-this.cameras.main.height/2;
            
            zoomControlX = uwu.scale.width/Math.abs(earwax.x-nosehairs.x);
            zoomControlY = uwu.scale.height/Math.abs(earwax.y-nosehairs.y);
            if(!zoomControlX){
                zoomControlX = zoomControlY;
            }
            if(!zoomControlY){
                zoomControlY = zoomControlX;
            }
            this.cameras.main.setZoom(Math.min(zoomControlX, zoomControlY)*0.7);
            if(this.cameras.main.zoom<1){
                this.cameras.main.setZoom(1);
            }
            if(this.cameras.main.zoom>3){
                this.cameras.main.setZoom(3);
            }
            //countdown
            
            // countdown.setPosition((earwax.x+nosehairs.x)/2 - this.cameras.main.displayWidth/2,
            //                       (earwax.y+nosehairs.y)/2 - countdown.height/2);
            // console.log(countdown.x)

            // console.log(countdown.y)

            // player upkeep

            earwax.upkeep();
            nosehairs.upkeep();
            
            //player movement and direction
            if (CussWords.left.isDown)
            {
                earwax.flipX = true
                earwax.setVelocityX(-300 - earwax.speed);
            }

            if (keys.A.isDown)
            {
                nosehairs.flipX = true
                nosehairs.setVelocityX(-300 - nosehairs.speed);
            }

            
            if (CussWords.right.isDown)
            {
                earwax.flipX = false
                earwax.setVelocityX(300 + earwax.speed);
            }

            if (keys.D.isDown)
            {
                nosehairs.flipX = false
                nosehairs.setVelocityX(300 + nosehairs.speed);
            }
            
            if(!earwax.body.touching.down||earwax.onBasic){
                earwax.Asta = false
                earwax.atsaButSpelledCorrectly = false
            }
            
            if(earwax.offSpeed){
                earwax.Asta = false;
                earwax.offJump = false;
            }
            if(earwax.offJump){
                earwax.atsaButSpelledCorrectly = false
            }

            if(nosehairs.offSpeed){
                nosehairs.Asta = false;
                nosehairs.offJump = false;
            }
            if(nosehairs.offJump){
                nosehairs.atsaButSpelledCorrectly = false
            }

            if(!nosehairs.body.touching.down||nosehairs.onBasic){
                nosehairs.Asta = false
                nosehairs.atsaButSpelledCorrectly = false
            }


            earwax.offSpeed = false
            earwax.offJump = false

            earwax.onBasic = false
            nosehairs.onBasic = false
        }
    }

 
    function createPlatforms(scene)
    {
        LnormalThing = scene.physics.add.staticGroup();
        GOTTAGOFAST = scene.physics.add.staticGroup();
        NYOOOOOOOOM = scene.physics.add.staticGroup();

        //bottom ground
        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5, uwu.scale.height, 'platform'));
        abstractionsosinsoinso[0].setScale(0.15, 0.25).refreshBody();

        youcant.push(GOTTAGOFAST.create(37.5*2+87.5, uwu.scale.height, 'platform'));
        youcant[0].setScale(0.35, 0.25).refreshBody();

        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5, uwu.scale.height, 'platform'));
        abstractionsosinsoinso[1].setScale(0.15, 0.25).refreshBody();

        definitelyMaybe.push(LnormalThing.create(37.5*2+87.5*2+37.5*2+75, uwu.scale.height, 'platform'));
        definitelyMaybe[0].setScale(0.3, 0.25).refreshBody();

        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+75*2+25, uwu.scale.height, 'platform'));
        abstractionsosinsoinso[2].setScale(0.1, 0.25).refreshBody();

        definitelyMaybe.push(LnormalThing.create(37.5*2+87.5*2+37.5*2+75*2+25*2+87.5, uwu.scale.height, 'platform'));
        definitelyMaybe[1].setScale(0.35, 0.25).refreshBody();

        youcant.push(GOTTAGOFAST.create(37.5*2+87.5*2+37.5*2+75*2+25*2+87.5*2+50, uwu.scale.height, 'platform'));
        youcant[1].setScale(0.2, 0.25).refreshBody();

        //left half, left-right
        
        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+25, uwu.scale.height-110, 'platform'));
        abstractionsosinsoinso[3].setScale(0.1, 0.1).refreshBody();

        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2-25, uwu.scale.height-205, 'platform'));
        abstractionsosinsoinso[4].setScale(0.1, 0.1).refreshBody();

        definitelyMaybe.push(LnormalThing.create(37.5*2+25*2+12.5, uwu.scale.height-200, 'platform'));
        definitelyMaybe[2].setScale(0.05, 9/10).refreshBody();

        definitelyMaybe.push(LnormalThing.create(37.5*2+87.5*2-12.5*2, uwu.scale.height-90, 'platform'));
        definitelyMaybe[3].setScale(0.05, 0.3).refreshBody();
        
        definitelyMaybe.push(LnormalThing.create(37.5*2+25*2+25, uwu.scale.height-105, 'platform'));
        definitelyMaybe[4].setScale(0.1, 0.05).refreshBody();
        
        youcant.push(GOTTAGOFAST.create(37.5*2+25*2+12.5+62.5, uwu.scale.height-240, 'platform'));
        youcant[2].setScale(0.2, 0.1).refreshBody();

        definitelyMaybe.push(LnormalThing.create(37.5*2+25*2+62.5*2+12.5, uwu.scale.height-260, 'platform'));
        definitelyMaybe[5].setScale(0.05, 0.3).refreshBody();

        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5, uwu.scale.height-100, 'platform'));
        abstractionsosinsoinso[5].setScale(0.15, 0.1).refreshBody();
        
        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+12.5, uwu.scale.height-190, 'platform'));
        abstractionsosinsoinso[6].setScale(0.15, 0.1).refreshBody();
        
        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+25*2+62.5*2+12.5*2+37.5, uwu.scale.height-280, 'platform'));
        abstractionsosinsoinso[7].setScale(0.15, 0.1).refreshBody();
        


        //right half, left-right

        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+25*2, uwu.scale.height-280, 'platform'));
        abstractionsosinsoinso[8].setScale(0.1, 0.1).refreshBody();
        
        definitelyMaybe.push(LnormalThing.create(37.5*2+25*2+62.5*2+12.5+200, uwu.scale.height-225, 'platform'));
        definitelyMaybe[6].setScale(0.05, 0.45).refreshBody();
        
        definitelyMaybe.push(LnormalThing.create(37.5*2+25*2+62.5*2+12.5+200, uwu.scale.height-92.5, 'platform'));
        definitelyMaybe[7].setScale(0.05, 0.35).refreshBody();

        definitelyMaybe.push(LnormalThing.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+50, uwu.scale.height-280, 'platform'));
        definitelyMaybe[8].setScale(0.2, 0.1).refreshBody();
        
        definitelyMaybe.push(LnormalThing.create(37.5*2+25*2+62.5*2+12.5*2+200+112.5, uwu.scale.height-245, 'platform'));
        definitelyMaybe[9].setScale(0.05, 0.45).refreshBody();

        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+50, uwu.scale.height-200, 'platform'));
        abstractionsosinsoinso[9].setScale(0.3, 0.1).refreshBody();
        
        definitelyMaybe.push(LnormalThing.create(37.5*2+25*2+62.5*2+12.5*2+200+112.5+125, uwu.scale.height-250, 'platform'));
        definitelyMaybe[10].setScale(0.05, 0.4).refreshBody();

        definitelyMaybe.push(LnormalThing.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+50+25, uwu.scale.height-125, 'platform'));
        definitelyMaybe[11].setScale(0.1, 0.1).refreshBody();
        
        definitelyMaybe.push(LnormalThing.create(37.5*2+25*2+62.5*2+12.5+200*2, uwu.scale.height-92.5, 'platform'));
        definitelyMaybe[12].setScale(0.05, 0.35).refreshBody();

        definitelyMaybe.push(LnormalThing.create(uwu.scale.width-10, uwu.scale.height-25, 'platform'));
        definitelyMaybe[13].setScale(0.05, 0.35).refreshBody();
        
        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, uwu.scale.height-150, 'platform'));
        abstractionsosinsoinso[10].setScale(0.05, 0.1).refreshBody();
        
        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, uwu.scale.height-225, 'platform'));
        abstractionsosinsoinso[11].setScale(0.05, 0.1).refreshBody();
        
        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, uwu.scale.height-340, 'platform'));
        abstractionsosinsoinso[12].setScale(0.05, 0.1).refreshBody();

        abstractionsosinsoinso.push(NYOOOOOOOOM.create(37.5*2-25, uwu.scale.height-340, 'platform'));
        abstractionsosinsoinso[13].setScale(0.1, 0.1).refreshBody();




        GOTTAGOFAST.setTint(0xeaa500);
        LnormalThing.setTint(0xdadada);
        NYOOOOOOOOM.setTint(0xa0a0ea);
    }
//please help me

    function jump1(event)
    {
        if (earwax.body.touching.down) {
        //If the player is on the ground, the player can jump
        earwax.setVelocityY(-400 + earwax.jump);
        earwax.currentJumps = 1;
        jumpSound.play()
        } else if (earwax.currentJumps < earwax.Beans) {
        //If the player is not on the ground but has an available air jump, use that jump
        earwax.setVelocityY(-300);
        earwax.currentJumps = 2;
        jumpSound.play()
        }
    }
    function jump2(event)
    {
        if (nosehairs.body.touching.down) {
        //If the player is on the ground, the player can jump
        nosehairs.setVelocityY(-400 + nosehairs.jump);
        nosehairs.currentJumps = 1;
        jumpSound.play()
        } else if (nosehairs.currentJumps < nosehairs.Beans) {
        //If the player is not on the ground but has an available air jump, use that jump
        nosehairs.setVelocityY(-300);
        nosehairs.currentJumps = 2;
        jumpSound.play()
        }
    }

    function tag(){
        if(cooldown<1){
            Nike = !Nike;
            JustDoIt = !JustDoIt;
            earwax.gui.setVisible(Nike)
            nosehairs.gui.setVisible(JustDoIt)
            cooldown = 3;
            for(let i = 1;i < 4;i++){
                temp = this.time.delayedCall(i*1000, help, null, this);
                
            }
        }
    }

    function uwuEnd(count){
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
            earwax.disableBody(true, false);
            nosehairs.disableBody(true, false);
            this.cameras.main.setZoom(1);
            if(Nike){
                countdown.setText("Player 2 wins!")
            }
            if(JustDoIt){
                countdown.setText("Player 1 wins!")
            }
            changeScore(Nike, JustDoIt)
            document.getElementById("timer").innerHTML = "Game End"
        }else{
            this.time.delayedCall(1000, uwuEnd.bind(this, count-1), null, this);
        }
    }

    function help(){
        if(cooldown>0){
            cooldown--;
        }else{
            cooldown = 0;
            earwax.gui.setVisible(false)
            nosehairs.gui.setVisible(false)
            earwax.sagitariusFemale.visible = Nike
            nosehairs.sagitariusFemale.visible = JustDoIt
        }
    }
// }