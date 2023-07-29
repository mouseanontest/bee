// function LaunchTagGame(){

    var randomText = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
        },

        fps: {forceSetTimeOut: true, fps: 60},
        scene: {
            preload: dnd,
            create: dnf,
            update: fnf,
        }

    };

    class XD extends Phaser.Physics.Arcade.Sprite
    {
        Beans = 2;
        doNotDisturb = 0;
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
                this.doNotDisturb = 0;
            }
        }
    }


    var uwu = new Phaser.Game(randomText);

    //Game Objects
    var tapPlainsFor1White;
    var NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM;
    var overused;
    var earwax;
    var nosehairs;

    var Nike = true;
    var JustDoIt = false;

    //Keyboard controls
    var CussWords;
    var synthPlayerForAltPopBandddd;

    var cooldown = 0;

    var banananananananananananananaWuNana = [];
    var jumptyDumptyGO = [];
    var nya = [];

    var zoomControlX;
    var zoomControlY;


    var go = null
    var whereforeArtThouMyRomeo;

    var maxCount = 75

    var jumpSound
    var alarmSound

    //sounds
    function dnd()
    {
        this.load.image('atsa', 'images/atsa.png');
        this.load.image('background', 'images/honeycombBG.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('player', 'images/playerBee.png');
        this.load.image('sagitariusFemale', 'images/tagArrow.png');
        this.load.audio('jumpSound', 'audio/jump.mp3');
        this.load.audio('alarmSound', 'audio/alarm.mp3')
    }

    function dnf()
    {
        jumpSound=this.sound.add('jumpSound')
        alarmSound=this.sound.add('alarmSound')


        //Set the background origin to be at (0, 0) or top left corner of the image rather than the center of the image asset
        let background = this.add.tileSprite(0, 0, uwu.scale.width, uwu.scale.height, 'background').setOrigin(0, 0).setScale(1);
    
        //Create the platforms and the player character set to collide with the platforms
        createPlatforms(this);

        earwax = new XD(this, 300, 400);
        earwax.setScale(0.1)
        earwax.setTint(0xaa3030)
        this.physics.add.collider(earwax, tapPlainsFor1White, function(){earwax.onBasic = true}, null, this);
        this.physics.add.collider(earwax, NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM, function(){earwax.Asta = true; earwax.offJump = true}, null, this);
        this.physics.add.collider(earwax, overused, function(){earwax.atsaButSpelledCorrectly = true; earwax.offSpeed = true}, null, this);

        nosehairs = new XD(this, 700, 400);
        nosehairs.setScale(0.1)
        nosehairs.setTint(0x5050ff)
        this.physics.add.collider(nosehairs, tapPlainsFor1White, function(){nosehairs.onBasic = true}, null, this);
        this.physics.add.collider(nosehairs, NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM, function(){nosehairs.Asta = true; nosehairs.offSpeed = true}, null, this);
        this.physics.add.collider(nosehairs, overused, function(){nosehairs.atsaButSpelledCorrectly = true; nosehairs.offSpeed = true}, null, this);

        this.physics.add.collider(earwax, nosehairs, tag, null, this);

        earwax.sagitariusFemale = this.physics.add.image(0, 0, 'sagitariusFemale');
        earwax.sagitariusFemale.setScale(0.1)

        nosehairs.sagitariusFemale = this.physics.add.image(0, 0, 'sagitariusFemale');
        nosehairs.sagitariusFemale.setScale(0.1);
        
        //camera stuff
        this.cameras.main.setBounds(0, 0, 800, 600);
            
        //Set up user input
        CussWords = this.input.keyboard.createCursorKeys();
        synthPlayerForAltPopBandddd = this.input.keyboard.addKeys('A, D');
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
        whereforeArtThouMyRomeo = this.add.text(10,10, "", {fill: '#000', font: "bold 56px Arial"})
        // whereforeArtThouMyRomeo.setOrigin(whereforeArtThouMyRomeo.width/2, whereforeArtThouMyRomeo.height/2)
        // whereforeArtThouMyRomeo.setScrollFactor(0,0)
    }


    function fnf()
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
            //whereforeArtThouMyRomeo
            
            // whereforeArtThouMyRomeo.setPosition((earwax.x+nosehairs.x)/2 - this.cameras.main.displayWidth/2,
            //                       (earwax.y+nosehairs.y)/2 - whereforeArtThouMyRomeo.height/2);
            // console.log(whereforeArtThouMyRomeo.x)

            // console.log(whereforeArtThouMyRomeo.y)

            // player upkeep

            earwax.upkeep();
            nosehairs.upkeep();
            
            //player movement and direction
            if (CussWords.left.isDown)
            {
                earwax.flipX = true
                earwax.setVelocityX(-300 - earwax.speed);
            }

            if (synthPlayerForAltPopBandddd.A.isDown)
            {
                nosehairs.flipX = true
                nosehairs.setVelocityX(-300 - nosehairs.speed);
            }

            
            if (CussWords.right.isDown)
            {
                earwax.flipX = false
                earwax.setVelocityX(300 + earwax.speed);
            }

            if (synthPlayerForAltPopBandddd.D.isDown)
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
        tapPlainsFor1White = scene.physics.add.staticGroup();
        NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM = scene.physics.add.staticGroup();
        overused = scene.physics.add.staticGroup();

        //bottom ground
        jumptyDumptyGO.push(overused.create(37.5, uwu.scale.height, 'platform'));
        jumptyDumptyGO[0].setScale(0.15, 0.25).refreshBody();

        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+87.5, uwu.scale.height, 'platform'));
        nya[0].setScale(0.35, 0.25).refreshBody();

        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5, uwu.scale.height, 'platform'));
        jumptyDumptyGO[1].setScale(0.15, 0.25).refreshBody();

        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+87.5*2+37.5*2+75, uwu.scale.height, 'platform'));
        banananananananananananananaWuNana[0].setScale(0.3, 0.25).refreshBody();

        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5*2+75*2+25, uwu.scale.height, 'platform'));
        jumptyDumptyGO[2].setScale(0.1, 0.25).refreshBody();

        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+87.5*2+37.5*2+75*2+25*2+87.5, uwu.scale.height, 'platform'));
        banananananananananananananaWuNana[1].setScale(0.35, 0.25).refreshBody();

        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+75*2+25*2+87.5*2+50, uwu.scale.height, 'platform'));
        nya[1].setScale(0.2, 0.25).refreshBody();

        //left half, left-right
        
        jumptyDumptyGO.push(overused.create(37.5*2+25, uwu.scale.height-110, 'platform'));
        jumptyDumptyGO[3].setScale(0.1, 0.1).refreshBody();

        jumptyDumptyGO.push(overused.create(37.5*2-25, uwu.scale.height-205, 'platform'));
        jumptyDumptyGO[4].setScale(0.1, 0.1).refreshBody();

        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+25*2+12.5, uwu.scale.height-200, 'platform'));
        banananananananananananananaWuNana[2].setScale(0.05, 9/10).refreshBody();

        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+87.5*2-12.5*2, uwu.scale.height-90, 'platform'));
        banananananananananananananaWuNana[3].setScale(0.05, 0.3).refreshBody();
        
        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+25*2+25, uwu.scale.height-105, 'platform'));
        banananananananananananananaWuNana[4].setScale(0.1, 0.05).refreshBody();
        
        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+25*2+12.5+62.5, uwu.scale.height-240, 'platform'));
        nya[2].setScale(0.2, 0.1).refreshBody();

        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+25*2+62.5*2+12.5, uwu.scale.height-260, 'platform'));
        banananananananananananananaWuNana[5].setScale(0.05, 0.3).refreshBody();

        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5*2+37.5, uwu.scale.height-100, 'platform'));
        jumptyDumptyGO[5].setScale(0.15, 0.1).refreshBody();
        
        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5*2+37.5*2+12.5, uwu.scale.height-190, 'platform'));
        jumptyDumptyGO[6].setScale(0.15, 0.1).refreshBody();
        
        jumptyDumptyGO.push(overused.create(37.5*2+25*2+62.5*2+12.5*2+37.5, uwu.scale.height-280, 'platform'));
        jumptyDumptyGO[7].setScale(0.15, 0.1).refreshBody();
        


        //right half, left-right

        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5*2+37.5*2+25*2, uwu.scale.height-280, 'platform'));
        jumptyDumptyGO[8].setScale(0.1, 0.1).refreshBody();
        
        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+25*2+62.5*2+12.5+200, uwu.scale.height-225, 'platform'));
        banananananananananananananaWuNana[6].setScale(0.05, 0.45).refreshBody();
        
        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+25*2+62.5*2+12.5+200, uwu.scale.height-92.5, 'platform'));
        banananananananananananananaWuNana[7].setScale(0.05, 0.35).refreshBody();

        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+50, uwu.scale.height-280, 'platform'));
        banananananananananananananaWuNana[8].setScale(0.2, 0.1).refreshBody();
        
        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+25*2+62.5*2+12.5*2+200+112.5, uwu.scale.height-245, 'platform'));
        banananananananananananananaWuNana[9].setScale(0.05, 0.45).refreshBody();

        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+50, uwu.scale.height-200, 'platform'));
        jumptyDumptyGO[9].setScale(0.3, 0.1).refreshBody();
        
        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+25*2+62.5*2+12.5*2+200+112.5+125, uwu.scale.height-250, 'platform'));
        banananananananananananananaWuNana[10].setScale(0.05, 0.4).refreshBody();

        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+50+25, uwu.scale.height-125, 'platform'));
        banananananananananananananaWuNana[11].setScale(0.1, 0.1).refreshBody();
        
        banananananananananananananaWuNana.push(tapPlainsFor1White.create(37.5*2+25*2+62.5*2+12.5+200*2, uwu.scale.height-92.5, 'platform'));
        banananananananananananananaWuNana[12].setScale(0.05, 0.35).refreshBody();

        banananananananananananananaWuNana.push(tapPlainsFor1White.create(uwu.scale.width-10, uwu.scale.height-25, 'platform'));
        banananananananananananananaWuNana[13].setScale(0.05, 0.35).refreshBody();
        
        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, uwu.scale.height-150, 'platform'));
        jumptyDumptyGO[10].setScale(0.05, 0.1).refreshBody();
        
        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, uwu.scale.height-225, 'platform'));
        jumptyDumptyGO[11].setScale(0.05, 0.1).refreshBody();
        
        jumptyDumptyGO.push(overused.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, uwu.scale.height-340, 'platform'));
        jumptyDumptyGO[12].setScale(0.05, 0.1).refreshBody();

        //in the wrong place
        jumptyDumptyGO.push(overused.create(37.5*2-25, uwu.scale.height-340, 'platform'));
        jumptyDumptyGO[13].setScale(0.1, 0.1).refreshBody();
//skyting

        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+25*2+12.5+62.5, uwu.scale.height-400, 'platform'));
        nya[3].setScale(0.2, 0.1).refreshBody();

        jumptyDumptyGO.push(overused.create(37.5*2+25*2+62.5*2+12.5*2+37.5, uwu.scale.height-440, 'platform'));
        jumptyDumptyGO[14].setScale(0.1, 0.1).refreshBody();
        
        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+25*2+62.5*2+12.5*2+37.5, uwu.scale.height-525, 'platform'));
        nya[4].setScale(0.1, 0.1).refreshBody();

        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+12.5, uwu.scale.height-525, 'platform'));
        nya[5].setScale(0.1, 0.1).refreshBody();
        
        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+12.5+100, uwu.scale.height-525, 'platform'));
        nya[6].setScale(0.1, 0.1).refreshBody();
        
        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+100*2-10, uwu.scale.height-420, 'platform'));
        nya[7].setScale(0.05, 0.1).refreshBody();

        nya.push(NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.create(37.5*2+87.5*2+37.5*2+37.5*2+25*3+62.5*2+50+12.5, uwu.scale.height-475, 'platform'));
        nya[8].setScale(0.15, 0.1).refreshBody();


        NYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM.setTint(0xfaa500);
        tapPlainsFor1White.setTint(0xdadada);
        overused.setTint(0xa0a0ea);
    }
//please help me

    function jump1(event)
    {
        if (earwax.body.touching.down) {
        //If the player is on the ground, the player can jump
        earwax.setVelocityY(-400 + earwax.jump);
        earwax.doNotDisturb = 1;
        jumpSound.play()
        } else if (earwax.doNotDisturb < earwax.Beans) {
        //If the player is not on the ground but has an available air jump, use that jump
        earwax.setVelocityY(-300);
        earwax.doNotDisturb = 2;
        jumpSound.play()
        }
    }
    function jump2(event)
    {
        if (nosehairs.body.touching.down) {
        //If the player is on the ground, the player can jump
        nosehairs.setVelocityY(-400 + nosehairs.jump);
        nosehairs.doNotDisturb = 1;
        jumpSound.play()
        } else if (nosehairs.doNotDisturb < nosehairs.Beans) {
        //If the player is not on the ground but has an available air jump, use that jump
        nosehairs.setVelocityY(-300);
        nosehairs.doNotDisturb = 2;
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
            go = false;
            earwax.disableBody(true, false);
            nosehairs.disableBody(true, false);
            this.cameras.main.setZoom(1);
            if(Nike){
                whereforeArtThouMyRomeo.setText("Player 2 wins!")
            }
            if(JustDoIt){
                whereforeArtThouMyRomeo.setText("Player 1 wins!")
            }
            document.getElementById("timer").innerHTML = "Game End"
        }else{
            if(count===4){
                alarmSound.play()
            }
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