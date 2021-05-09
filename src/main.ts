import ErrorMapper from 'libs/error-mapper';
import game from './game';
import roles from './roles';

declare global {
  interface CreepMemory {
    role: string;
    working: boolean;
  }
}

const bodyTypes = {
  pioneer: [MOVE, MOVE, CARRY, CARRY, WORK],
};

function spawnPioneerFor(room: Room) {
  const role = 'pioneer';
  const spawns = room.find(FIND_MY_SPAWNS);
  for (const spawn of spawns) {
    const result = spawn.spawnCreep(bodyTypes.pioneer, role, {
      memory: {
        role,
        working: false,
      },
    });
    if (result === OK) return;
  }
}

function spawnCreepsFor(room: Room): void {
  const creepCount = room.find(FIND_MY_CREEPS).length;
  if (creepCount === 0) {
    return spawnPioneerFor(room);
  }
}

function unwrappedLoop() {
  console.log(`Current game tick is ${Game.time}`);

  for (const room of game.getMyRooms()) {
    spawnCreepsFor(room);

    for (const creep of game.getMyCreeps(room)) {
      roles[creep.name](creep);
    }
  }
}

const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export { loop, unwrappedLoop };
