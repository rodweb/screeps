import actions from './actions';

function hasEnergy(creep: Creep): boolean {
  return creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
}

function isFull(creep: Creep): boolean {
  return creep.store.getFreeCapacity() === 0;
}

function isWorking(creep: Creep): boolean {
  return creep.memory.working;
}

function stopWorking(creep: Creep): void {
  creep.memory.working = false;
}

function startWorking(creep: Creep): void {
  creep.memory.working = true;
}

function findClosestEnergyStructure(creep: Creep): StructureSpawn | null {
  return creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
    filter: (s) => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
  });
}

function findClosestSource(creep: Creep): Source | null {
  return creep.pos.findClosestByPath(FIND_SOURCES, {
    filter: (s) => s.energy > 0,
  });
}
function pioneer(creep: Creep): void {
  if (isWorking(creep)) {
    if (hasEnergy(creep)) {
      actions.transfer(creep, findClosestEnergyStructure);
    } else {
      stopWorking(creep);
    }
  } else {
    if (isFull(creep)) {
      startWorking(creep);
    } else {
      actions.harvest(creep, findClosestSource);
    }
  }
}

const roles: { [role: string]: (creep: Creep) => void } = {
  pioneer,
};

export default roles;
