import ErrorMapper from './libs/error-mapper';
import './libs';
import './prototypes';
import game from './game';
import roles, { Roles } from './roles';

declare global {
  interface CreepMemory {
    role: string;
    working: boolean;
  }
}

const bodyTypes: Record<Roles, BodyPartConstant[]> = {
  pioneer: [MOVE, MOVE, CARRY, CARRY, WORK],
  harvester: [WORK, WORK, MOVE, CARRY],
  worker: [MOVE, MOVE, CARRY, CARRY, WORK],
  sacrificer: [MOVE],
  upgrader: [WORK, WORK, CARRY],
};

function getCreepName(role: Roles): string {
  let i = 1;
  let name;
  do {
    name = `${role}:${i++}`;
  } while (game.creepExists(name));
  return name;
}

function spawnRole(room: Room, role: Roles) {
  const spawns = room.find(FIND_MY_SPAWNS);
  for (const spawn of spawns) {
    const creepName = getCreepName(role);
    const body = bodyTypes[role];
    const result = spawn.spawnCreep(body, creepName, {
      memory: {
        role,
        working: false,
      },
    });
    if (result === OK) return;
  }
}

function spawnCreepsFor(room: Room): void {
  // @ts-ignore
  const creepsByRole = _.groupBy(
    game.getMyCreeps(room),
    (creep) => creep.memory.role,
  );
  const getRoleCount = (role: Roles) => (creepsByRole[role] || []).length;
  if (getRoleCount(Roles.pioneer) < 1) {
    return spawnRole(room, Roles.pioneer);
  }
  if (getRoleCount(Roles.harvester) < 2) {
    return spawnRole(room, Roles.harvester);
  }
  if (getRoleCount(Roles.worker) < 5) {
    return spawnRole(room, Roles.worker);
  }
  if (getRoleCount(Roles.upgrader) < 1) {
    return spawnRole(room, Roles.upgrader);
  }
  if (getRoleCount(Roles.sacrificer) < 1) {
    return spawnRole(room, Roles.sacrificer);
  }
}

function generatePixels() {
  if (Game.cpu.bucket == 10000) {
    const result = Game.cpu?.generatePixel();
    if (result === OK) return true;
  }
  return false;
}

function clearMemory() {
  for (const creepName in Memory.creeps) {
    if (!Game.creeps[creepName]) delete Memory.creeps[creepName];
  }
}

function unwrappedLoop() {
  console.log(`Current game tick is ${Game.time}`);

  clearMemory();
  if (generatePixels()) return;

  for (const room of game.getMyRooms()) {
    spawnCreepsFor(room);

    for (const creep of game.getMyCreeps(room)) {
      roles[creep.memory.role as Roles](creep);
    }
  }
}

const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export { loop, unwrappedLoop };
