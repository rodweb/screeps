import ErrorMapper from './libs/error-mapper';
import './libs';
import './prototypes';
import game from './game';
import roles, { Roles } from './roles';
import Transfer from './tasks/transfer';

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

class Colony {
  readonly roomName: string;

  constructor(room: Room) {
    this.roomName = room.name;
  }

  get room() {
    return game.getRoomByName(this.roomName)!;
  }

  tick() {
    spawnCreepsFor(this.room);
    this.runCreeps();
  }

  private runCreeps() {
    for (const creep of game.getMyCreeps(this.room)) {
      roles[creep.memory.role as Roles](creep);
    }
  }
}

const colonyByRoomName = new Map<string, Colony>();

function getColony(room: Room) {
  const colony = colonyByRoomName.get(room.name) || new Colony(room);
  colonyByRoomName.set(room.name, colony);
  return colony;
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
    getColony(room).tick();
  }
}

const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export { loop, unwrappedLoop };
