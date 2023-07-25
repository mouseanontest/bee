let player1
let player2
let playersDead=0
let multiplier=0

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
        this.setGravityY(3000)
        this.score=0
        this.canMove=true
    }
}

var game=new Phaser.Game(config)

function preload(){
    this.load.image('background', 'images/scrollingPerhaps.png')
    this.load.image('pentagon', 'images/pentagon.png')
    this.load.image('bee', 'images/bee.png')
    this.load.image('platform', 'images/platform.png')
}

function create(){
    for (let i=0; i<5; i++){
        this.add.image(-500+1146*i, -500, 'background').setOrigin(0)
    }

    createPlatforms(this)
    player1=new Player(this, 300, 100)
    player2=new Player(this, 400, 100)

    this.physics.add.collider(player1, platforms)
    this.physics.add.collider(player2, platforms)

    camera=this.cameras.main.setBounds(0,0, 4800, 600)

    cursors = this.input.keyboard.createCursorKeys()
    keys = this.input.keyboard.addKeys('W, A, D')
    keys.W.on('down', jump)
    cursors.up.on('down', jump)
}

function createPlatforms(scene){
    platforms = scene.physics.add.staticGroup()
    let basePlatform = platforms.create(0, game.scale.height-50, 'platform').setOrigin(0);
    basePlatform.setScale(10, 1).refreshBody()
}

function update(){
    let maxSpd=350
    let accel=80
    let decel=70
    moveCam(camera)
    console.log(camera.scrollX)
    if (player1.body.x-camera.scrollX<25) killPlayer(player1)
    if (player2.body.x-camera.scrollX<25) killPlayer(player2)

    if (player1.canMove){
        if (keys.A.isDown){
            player1.setVelocityX(appr(accel, -1*maxSpd, player1.body.velocity.x))
        } else if (keys.D.isDown){
            player1.setVelocityX(appr(accel, maxSpd, player1.body.velocity.x))
        } else {
            player1.setVelocityX(appr(decel, 0, player1.body.velocity.x))
        }
    }

    if (player2.canMove){
        if (cursors.left.isDown){
            player2.setVelocityX(appr(accel, -1*maxSpd, player2.body.velocity.x))
        } else if (cursors.right.isDown){
            player2.setVelocityX(appr(accel, maxSpd, player2.body.velocity.x))
        } else {
            player2.setVelocityX(appr(decel, 0, player2.body.velocity.x))
        }
    }    
}

function moveCam(camera){
    camera.scrollX=multiplier**1.07*2
    multiplier++
}

function jump(event){
    if (keys.W.isDown && player1.body.touching.down){
        player1.setVelocityY(-1000)
    } else if (cursors.up.isDown && player2.body.touching.down){
        player2.setVelocityY(-1000)
    }
}

function killPlayer(player){
    player.score=player.body.x
    player.disableBody(true, true)
    player.canMove=false
    playersDead++
}

function appr(inc, val, num){
    if (num>val){
        return num-inc<val ? val : num-inc
    } else {
        return num+inc>=val ? val : num+inc
    }
}