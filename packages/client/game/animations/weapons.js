export default function makeWeaponsAnimations(scene) {
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
    key: 'missile',
    frames: [{
      key: 'missile',
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
  // GRENADE
  scene.anims.create({
    key: 'grenade',
    frames: [{
      key: 'grenade',
      frame: 0,
    }],
  });

  // EXPLOSION
  scene.anims.create({
    key: 'explosion',
    frames: scene.anims.generateFrameNumbers('explosion', {
      start: 0,
      end: 6,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // THRUST BAR

  scene.anims.create({
    key: 'thrust-bar',
    frames: scene.anims.generateFrameNumbers('thrust-bar', {
      start: 0,
      end: 25,
    }),
    frameRate: 10,
    repeat: -1,
  });
}
