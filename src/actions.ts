function moveNear(creep: Creep, target: RoomPosition): void {
  creep.moveTo(target);
}

function harvest(
  creep: Creep,
  getTarget: (creep: Creep) => Source | null,
): void {
  const target = getTarget(creep);
  if (!target) return;
  if (creep.pos.isNearTo(target)) {
    creep.harvest(target);
  } else {
    moveNear(creep, target.pos);
  }
}

function transfer(
  creep: Creep,
  getTarget: (creep: Creep) => StructureSpawn | null,
): void {
  const target = getTarget(creep);
  if (!target) return;
  if (creep.pos.isNearTo(target)) {
    creep.transfer(target, RESOURCE_ENERGY);
  } else {
    moveNear(creep, target.pos);
  }
}

const actions = {
  moveNear,
  harvest,
  transfer,
};

export default actions;
