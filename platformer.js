let player1=null
let player2=null


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
        super(scene,x,y,'player')
        scene.add.existing(this)
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
}

function create(){
    player1=new Player(this, 100,100)
    player2=new Player(this,200,100)
    cursors = this.input.keyboard.createCursorKeys()
    keys = this.input.keyboard.addKeys('W, A, D')
    keys.W.on('down', jump);
    cursors.up.on('down', jump);
}

function update(){
    let maxSpd=350
    let accel=40
    let decel=45

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
        player1.setVelocityY(800)
    } else if (cursors.up.isDown && player2.body.touching.down){
        player2.setVelocityY(-800)
    }
}

function appr(inc, val, num){
    if (num>val){
        return num-inc<val ? val : num-inc
    } else {
        return num+inc>=val ? val : num+inc
    }
}