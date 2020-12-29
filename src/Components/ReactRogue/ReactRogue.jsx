import React, { useRef, useEffect, useState } from 'react';
import './reset.css';
import './ReactRogue.css';
import InputManager from '../../utilities/InputManager';
import Spawner from '../../World/Spawner';
import World from '../../World/World';
import levelConstants from '../../Config/levelConstants';

const ReactRogue = ({ width, height, tileSize }) => {
  const canvasRef = useRef();
  let inputManager = new InputManager();
  // const [player, setPlayer] = useState(new Player(1, 2, tileSize));
  const [world, setWorld] = useState(new World(width, height, tileSize));
  
  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  }

  useEffect(() => {
    console.log('Create Map!');
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(levelConstants.spawnLoot);
    spawner.spawnMonsters(levelConstants.spawnMonsters);
    spawner.spawnStairs();
    setWorld(newWorld);
  }, []);

  useEffect(() => {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    }
  });

  useEffect(() => {
    console.log("Draw to canvas")
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width * tileSize, height * tileSize);
    world.draw(ctx);
  })
  return (
  <div className="game-wrapper">
    <canvas 
    ref={canvasRef}  
    width={width * tileSize} 
    height={height * tileSize} 
    style={{ border: '1px solid black',
    background: 'DimGray' }}
    ></canvas>
    <div className="detail-wrapper">
      <div className="sector-label">
        Inventory
      </div>
      <ul className="inventory">
        {world.player.inventory.map((item, index) => {
          return (
            <li key={index}>{item.attributes.ascii} {item.attributes.name}</li>
          )
        })}
      </ul>
      <div className="sector-label">
        Combat Log
      </div>
      <ul className="combat-log">
        {world.history.map((entry, index) => {
          return (
            <li key={index}>{entry}</li>
          )
        })}
      </ul>
    </div>
  </div>)
}

export default ReactRogue;