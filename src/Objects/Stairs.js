import Entity from '../World/Entity';
import Spawner from '../World/Spawner';
import levelConstants from '../Config/levelConstants';

class Stairs extends Entity {
  attributes = { 
    name: 'Stairs', 
    color: 'black', 
    ascii: '>', 
    offset: { 
      x: 2, 
      y: 2
    }
  }

  action(verb, world) {
    if (verb === 'bump') {
      world.addToHistory('You move down stairs...');
      world.createCellularMap();
      world.player.x = 0;
      world.player.y = 0;
      world.moveToSpace(world.player);
      world.entities = world.entities.filter(e => e === world.player);
      let spawner = new Spawner(world);
      spawner.spawnLoot(levelConstants.spawnLoot);
      spawner.spawnMonsters(levelConstants.spawnMonsters);
      spawner.spawnStairs();
    }
  }
}

export default Stairs