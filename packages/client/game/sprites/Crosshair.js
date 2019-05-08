export default class Crosshair extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.key, config.x, config.y);
        this.scene = config.scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.anims.play(config.key)
    }
    update(keys, x, y) {
        this.x = x-50;
        this.y = y-50;
    }
}