export default function makeAnimations(scene) {
  // GHOST ANIMATION BLUE
  scene.anims.create({
    key: 'blue-right',
    frames: scene.anims.generateFrameNumbers('blue', {
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'blue-standRight',
    frames: [{
      key: 'blue',
      frame: 4,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'blue-left',
    frames: scene.anims.generateFrameNumbers('blue', {
      start: 3,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'blue-standLeft',
    frames: [{
      key: 'blue',
      frame: 1,
    }],
    frameRate: 20,
  });

  // GHOST ANIMATION GREEN
  scene.anims.create({
    key: 'green-right',
    frames: scene.anims.generateFrameNumbers('green', {
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'green-standRight',
    frames: [{
      key: 'green',
      frame: 4,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'green-left',
    frames: scene.anims.generateFrameNumbers('green', {
      start: 3,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'green-standLeft',
    frames: [{
      key: 'green',
      frame: 1,
    }],
    frameRate: 20,
  });
  // GHOST ANIMATION RED
  scene.anims.create({
    key: 'red-right',
    frames: scene.anims.generateFrameNumbers('red', {
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'red-standRight',
    frames: [{
      key: 'red',
      frame: 4,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'red-left',
    frames: scene.anims.generateFrameNumbers('red', {
      start: 3,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'red-standLeft',
    frames: [{
      key: 'red',
      frame: 1,
    }],
    frameRate: 20,
  });


  // CROSSHAIR
  scene.anims.create({
    key: 'crosshair-s',
    frames: [{
      key: 'crosshair',
      frame: 0,
    }],
  });

  // BULLET
  scene.anims.create({
    key: 'bullet',
    frames: [{
      key: 'bullet',
      frame: 0,
    }],
  });

  // BAZOOKA
  scene.anims.create({
    key: 'bazooka',
    frames: [{
      key: 'bazooka',
      frame: 0,
    }],
  });
}
