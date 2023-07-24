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
    this.load.image('background', 'images/background.png');
    this.load.image('pentagon', 'images/pentagon.png');
    this.load.image('bee', 'images/bee.png');
}