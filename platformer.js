let player1
let player2
let camera

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

class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'bee')
        scene.add.existing(this)
        this.setScale(.5)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setGravityY(3000)
    }
}

var game=new Phaser.Game(config)

function preload(){
    this.load.image('background', 'images/background.png')
    this.load.image('pentagon', 'images/pentagon.png')
    this.load.image('bee', 'images/bee.png')
    this.load.image('platform', 'images/platform.png')
}

function create(){
    this.add.tileSprite(0, 0, game.scale.width, game.scale.height, 'background').setOrigin(0,0)
    
    createPlatforms(this)
    player1=new Player(this, 100,100)
    player2=new Player(this,200,100)

    this.physics.add.collider(player1, platforms)
    this.physics.add.collider(player2, platforms)

    this.cameras.main.setSize(1600, 600)
    camera=this.cameras.add(0, 0, 800, 600)

    cursors = this.input.keyboard.createCursorKeys()
    keys = this.input.keyboard.addKeys('W, A, D')
    keys.W.on('down', jump)
    cursors.up.on('down', jump)
}

function createPlatforms(scene){
    platforms = scene.physics.add.staticGroup()

    let basePlatform = platforms.create(game.scale.width/2, game.scale.height-30, 'platform');
    basePlatform.setScale(3, 1).refreshBody()

    // platforms.create(250, 350, 'platform')
    // platforms.create(950, 500, 'platform') 
}

function update(){
    let maxSpd=350
    let accel=80
    let decel=70

    camera.scrollX = (player1.body.x)|0;

    if (cursors.left.isDown){
        player2.setVelocityX(appr(accel, -1*maxSpd, player2.body.velocity.x))
    } else if (cursors.right.isDown){
        player2.setVelocityX(appr(accel, maxSpd, player2.body.velocity.x))
    } else {
        player2.setVelocityX(appr(decel, 0, player2.body.velocity.x))
    }

    if (keys.A.isDown){
        player1.setVelocityX(appr(accel, -1*maxSpd, player1.body.velocity.x))
    } else if (keys.D.isDown){
        player1.setVelocityX(appr(accel, maxSpd, player1.body.velocity.x))
    } else {
        player1.setVelocityX(appr(decel, 0, player1.body.velocity.x))
    }
}

function jump(event){
    if (keys.W.isDown && player1.body.touching.down){
        player1.setVelocityY(-1000)
    } else if (cursors.up.isDown && player2.body.touching.down){
        player2.setVelocityY(-1000)
    }
}

function appr(inc, val, num){
    if (num>val){
        return num-inc<val ? val : num-inc
    } else {
        return num+inc>=val ? val : num+inc
    }
}