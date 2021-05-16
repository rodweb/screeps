function isMine(room: Room): boolean {
  return Boolean(room?.controller?.my);
}

function getRooms(): Room[] {
  return Object.values(Game.rooms);
}

function getMyRooms(): Room[] {
  return getRooms().filter(isMine);
}

function getMyCreeps(room: Room): Creep[] {
  return room.find(FIND_MY_CREEPS);
}

function creepExists(creepName: string): boolean {
  return Boolean(Game.creeps[creepName]);
}

function getObjectById<T>(id: Id<T> | string): T | null {
  return Game.getObjectById(id as Id<T>);
}

function getCreepByName(creepName: string): Creep | null {
  return Game.creeps[creepName] || null;
}

function getRoomByName(roomName: string): Room | null {
  return Game.rooms[roomName] || null;
}

const game = {
  getMyRooms,
  getMyCreeps,
  creepExists,
  getObjectById,
  getCreepByName,
  getRoomByName,
};

export default game;
