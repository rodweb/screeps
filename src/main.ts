import ErrorMapper from 'libs/error-mapper';
import game from './game';
import roles from './roles';

declare global {
  interface CreepMemory {
    role: string;
    working: boolean;
  }
}

enum Roles {
  pioneer = 'pioneer',
  harvester = 'harvester',
}

const bodyTypes: Record<Roles, BodyPartConstant[]> = {
  pioneer: [MOVE, MOVE, CARRY, CARRY, WORK],
  harvester: [WORK, WORK, MOVE, CARRY],
};

function spawnRole(room: Room, role: Roles) {
  const spawns = room.find(FIND_MY_SPAWNS);
  for (const spawn of spawns) {
    const result = spawn.spawnCreep(bodyTypes[role], role, {
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
    return spawnRole(room, Roles.pioneer);
  }
  // @ts-ignore
  const creepsByRole = _.groupBy(
    game.getMyCreeps(room),
    (creep) => creep.memory.role,
  );
  const getRoleCount = (role: Roles) => (creepsByRole[role] || []).length;
  if (getRoleCount(Roles.harvester) < 2) {
    spawnRole(room, Roles.harvester);
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
