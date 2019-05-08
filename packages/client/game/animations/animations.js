
export default function makeAnimations(scene) { 
   

    // GHOST ANIMATION BLUE
    scene.anims.create({
      key: 'blue-r',
      frames: scene.anims.generateFrameNumbers('blue', {
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
        key: 'blue-s',
        frames: [{
            key: 'blue',
            frame: 6
        }],
        frameRate: 20
    });

     scene.anims.create({
         key: 'blue-l',
         frames: scene.anims.generateFrameNumbers('blue', {
             start: 3,
             end: 5
         }),
         frameRate: 10,
         repeat: -1
     });

    // GHOST ANIMATION GREEN
    scene.anims.create({
      key: 'green-r',
      frames: scene.anims.generateFrameNumbers('green', {
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
        key: 'green-s',
        frames: [{
            key: 'green',
            frame: 6
        }],
        frameRate: 20
    });

     scene.anims.create({
         key: 'green-l',
         frames: scene.anims.generateFrameNumbers('green', {
             start: 3,
             end: 5
         }),
         frameRate: 10,
         repeat: -1
     });
    // GHOST ANIMATION RED
    scene.anims.create({
      key: 'red-r',
      frames: scene.anims.generateFrameNumbers('red', {
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
        key: 'red-s',
        frames: [{
            key: 'red',
            frame: 6
        }],
        frameRate: 20
    });

     scene.anims.create({
         key: 'red-l',
         frames: scene.anims.generateFrameNumbers('red', {
             start: 3,
             end: 5
         }),
         frameRate: 10,
         repeat: -1
     });

     scene.anims.create({
         key: 'crosshair-s', 
         frames: [{
           key: 'crosshair',
           frame: 0
         }]
     })
}