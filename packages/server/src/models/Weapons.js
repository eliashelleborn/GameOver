class Weapons {
  constructor() {
    this.list = [{
      type: 'Bazooka',
      name: 'Bazooka',
      ammo: 10,
      key: 'bazooka',
      image: '../../images/bazooka.png',
      maxLoot: 5,
    },
    {
      type: 'GrenadeLauncher',
      name: 'Grenade Launcher',
      ammo: 1,
      key: 'grenadelauncher',
      image: '../../images/grenadelauncher.png',
      maxLoot: 3,
    },
    ];
  }
}
export default Weapons;
