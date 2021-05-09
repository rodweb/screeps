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

const game = {
  getRooms,
  getMyRooms,
  getMyCreeps,
};

export default game;
