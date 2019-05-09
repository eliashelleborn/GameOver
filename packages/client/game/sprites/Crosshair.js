export default class Crosshair extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.key, config.x, config.y);
        this.scene = config.scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.anims.play(config.key)
        this.y = 0;
        this.x = 0;
    }


    update(keys, x, y) {        
        

        if (keys.crosshair.up){
            this.moveUp();
        }
    }


    startTurnPosition(x, y){
        this.y = y;
        this.x = x + 50;
    }
}