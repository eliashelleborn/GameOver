export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {

        super(config.scene, config.x, config.y, config.key, config.id);

        this.scene = config.scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.scene.collide
        this.scene.physics.add.collider(this.body, this.scene.groundLayer);
        this.body.setBounce(0.3);
        this.body.setCollideWorldBounds(true);
        this.velocity = {
            x: 50,
            y: -400
        }
        this.id = config.id
        
    }
    create () {
        
        
        
    }
    update(keys) {
     
        // // Moving the player
        if (keys.left) {
            this.run(-this.velocity.x)
        } else if (keys.right) {
            this.run(this.velocity.x)
        } else {
            this.run(0);
        }

        // JUMP
        if (keys.jump && this.body.onFloor()) {
            this.jump();
        }
        
    }
    run (vel) {
        this.body.setVelocityX(vel);
        if (vel < 0){
            this.anims.play('left', true);
        }else if (vel > 0){
            this.anims.play('right', true);
        }else {
            this.anims.play('turn');
        }
    }
    jump () {
        this.body.setVelocityY(this.velocity.y);
    }
}