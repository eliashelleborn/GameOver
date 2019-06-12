class Weapons {
  constructor() {
    this.list = [{
      type: 'Bazooka',
      name: 'Bazooka',
      ammo: -1, // -1 for infinite ammo
      key: 'bazooka',
      image: '../../images/bazooka.png',
      maxLoot: 2,
    },
    {
      type: 'GrenadeLauncher',
      name: 'Grenade Launcher',
      ammo: 1,
      key: 'grenadelauncher',
      image: '../../images/grenadelauncher.png',
      maxLoot: 2,
    },
    ];
  }
}
export default Weapons;
