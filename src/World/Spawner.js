import Loot from '../Objects/Loot';
import Monster from '../NPCs/Monster';
import Stairs from '../Objects/Stairs';

import monsterTable from '../Config/monsterTable';
import lootTable from '../Config/lootTable';

class Spawner {
  constructor(world) {
    this.world = world;
  }

  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = createEntity();
      this.world.add(entity);
      this.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Loot(
        getRandomInt(this.world.width -1), 
        getRandomInt(this.world.height - 1), 
        this.world.tileSize, 
        lootTable[getRandomInt(lootTable.length)]);
    })
  }

  spawnMonsters(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width), 
        getRandomInt(this.world.height), 
        this.world.tileSize, 
        monsterTable[getRandomInt(monsterTable.length)]);
    })
  }

  spawnStairs() {
    let stairs = new Stairs(this.world.width - 10, this.world.height - 10, this.world.tileSize);
    this.world.add(stairs);
    this.world.moveToSpace(stairs);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;