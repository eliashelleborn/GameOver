export default function makeSpriteAnimations(scene) {
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
    key: 'blue-standLeft',
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
    key: 'blue-standRight',
    frames: [{
      key: 'blue',
      frame: 1,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'blue-dead',
    frames: scene.anims.generateFrameNumbers('blue', {
      start: 6,
      end: 11,
    }),
    frameRate: 7,
    repeat: -1,
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
    key: 'green-standLeft',
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
    key: 'green-standRight',
    frames: [{
      key: 'green',
      frame: 1,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'green-dead',
    frames: scene.anims.generateFrameNumbers('green', {
      start: 6,
      end: 11,
    }),
    frameRate: 7,
    repeat: -1,
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
    key: 'red-standLeft',
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
    key: 'red-standRight',
    frames: [{
      key: 'red',
      frame: 1,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'red-dead',
    frames: scene.anims.generateFrameNumbers('red', {
      start: 6,
      end: 11,
    }),
    frameRate: 7,
    repeat: -1,
  });

  // GHOST ANIMATION YELLOW
  scene.anims.create({
    key: 'yellow-right',
    frames: scene.anims.generateFrameNumbers('yellow', {
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'yellow-standLeft',
    frames: [{
      key: 'yellow',
      frame: 4,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'yellow-left',
    frames: scene.anims.generateFrameNumbers('yellow', {
      start: 3,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'yellow-standRight',
    frames: [{
      key: 'yellow',
      frame: 1,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'yellow-dead',
    frames: scene.anims.generateFrameNumbers('yellow', {
      start: 6,
      end: 11,
    }),
    frameRate: 7,
    repeat: -1,
  });

  // GHOST ANIMATION PURPLE
  scene.anims.create({
    key: 'purple-right',
    frames: scene.anims.generateFrameNumbers('purple', {
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'purple-standLeft',
    frames: [{
      key: 'purple',
      frame: 4,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'purple-left',
    frames: scene.anims.generateFrameNumbers('purple', {
      start: 3,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'purple-standRight',
    frames: [{
      key: 'purple',
      frame: 1,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'purple-dead',
    frames: scene.anims.generateFrameNumbers('purple', {
      start: 6,
      end: 11,
    }),
    frameRate: 7,
    repeat: -1,
  });

  // GHOST ANIMATION DARKBLUE
  scene.anims.create({
    key: 'darkblue-right',
    frames: scene.anims.generateFrameNumbers('darkblue', {
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'darkblue-standLeft',
    frames: [{
      key: 'darkblue',
      frame: 4,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'darkblue-left',
    frames: scene.anims.generateFrameNumbers('darkblue', {
      start: 3,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'darkblue-standRight',
    frames: [{
      key: 'darkblue',
      frame: 1,
    }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'darkblue-dead',
    frames: scene.anims.generateFrameNumbers('darkblue', {
      start: 6,
      end: 11,
    }),
    frameRate: 7,
    repeat: -1,
  });
}
