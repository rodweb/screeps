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

const game = {
  getMyRooms,
  getMyCreeps,
  creepExists,
};

export default game;
