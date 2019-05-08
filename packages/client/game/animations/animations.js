
export default function makeAnimations(scene) { 
    // DUDE ANIMATIONS
    // scene.anims.create({
    //     key: 'left',
    //     frames: scene.anims.generateFrameNumbers('dude', {
    //         end: 3
    //     }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // scene.anims.create({
    //     key: 'turn',
    //     frames: [{
    //         key: 'dude',
    //         frame: 4
    //     }],
    //     frameRate: 20
    // });

    // scene.anims.create({
    //     key: 'right',
    //     frames: scene.anims.generateFrameNumbers('dude', {
    //         start: 5,
    //         end: 8
    //     }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // GHOST ANIMATION
    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('blue', {
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
        key: 'turn',
        frames: [{
            key: 'blue',
            frame: 6
        }],
        frameRate: 20
    });

     scene.anims.create({
         key: 'left',
         frames: scene.anims.generateFrameNumbers('blue', {
             start: 3,
             end: 5
         }),
         frameRate: 10,
         repeat: -1
     });
}