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
  getTarget: (creep: Creep) => AnyCreep | Structure<StructureConstant> | null,
): void {
  const target = getTarget(creep);
  if (!target) return;
  if (creep.pos.isNearTo(target)) {
    creep.transfer(target, RESOURCE_ENERGY);
  } else {
    moveNear(creep, target.pos);
  }
}

function pickup(
  creep: Creep,
  getTarget: (creep: Creep) => Resource | null,
): number | void {
  const target = getTarget(creep);
  if (!target) return ERR_INVALID_TARGET;
  if (creep.pos.isNearTo(target)) {
    return creep.pickup(target);
  } else {
    moveNear(creep, target.pos);
  }
}

function upgrade(
  creep: Creep,
  getTarget: (creep: Creep) => StructureController | null,
): number | void {
  const target = getTarget(creep);
  if (!target) return ERR_INVALID_TARGET;
  if (creep.pos.inRangeTo(target, 3)) {
    return creep.upgradeController(target);
  } else {
    moveNear(creep, target.pos);
  }
}

function build(
  creep: Creep,
  getTarget: (creep: Creep) => ConstructionSite | null,
): number | void {
  const target = getTarget(creep);
  if (!target) return ERR_INVALID_TARGET;
  if (creep.pos.inRangeTo(target, 3)) {
    return creep.build(target);
  } else {
    moveNear(creep, target.pos);
  }
}

const actions = {
  moveNear,
  harvest,
  transfer,
  pickup,
  upgrade,
  build,
};

export default actions;
