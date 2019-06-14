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
  // GRENADE LAUNCHER
  scene.anims.create({
    key: 'grenadelauncher',
    frames: [{
      key: 'grenadelauncher',
      frame: 0,
    }],
  });
  // CLUSTER
  scene.anims.create({
    key: 'cluster',
    frames: [{
      key: 'cluster',
      frame: 0,
    }],
  });

  // CLUSTER BOMB
  scene.anims.create({
    key: 'clusterbomb',
    frames: [{
      key: 'clusterbomb',
      frame: 0,
    }],
  });

  // CLUSTER BOMB LAUNCHER
  scene.anims.create({
    key: 'clusterbomblauncher',
    frames: [{
      key: 'clusterbomblauncher',
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

  // CRATE
  scene.anims.create({
    key: 'crate',
    frames: [{
      key: 'crate',
      frame: 0,
    }],
  });
}
