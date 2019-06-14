class Weapons {
  constructor() {
    this.list = [{
      type: 'Bazooka',
      name: 'Bazooka',
      ammo: 2, // -1 for infinite ammo
      key: 'bazooka',
      image: '../../images/bazooka.png',
      maxLoot: 2,
    },
    {
      type: 'GrenadeLauncher',
      name: 'Grenade Launcher',
      ammo: 2,
      key: 'grenadelauncher',
      image: '../../images/grenadelauncher.png',
      maxLoot: 2,
    },
    {
      type: 'ClusterBombLauncher',
      name: 'Cluster Bomb',
      ammo: 2,
      key: 'clusterbomblauncher',
      image: '../../images/clusterbomblauncher.png',
      maxLoot: 2,
    },
    ];
  }
}
export default Weapons;
