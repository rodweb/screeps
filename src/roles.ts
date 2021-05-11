import actions from './actions';
import sacrificer from './roles/sacrificer';

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

function findClosestEnergyResource(creep: Creep): Resource | null {
  return creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
    filter: (s) => s.resourceType === RESOURCE_ENERGY && s.amount > 50,
  });
}

function findClosestConstructionSite(creep: Creep): ConstructionSite | null {
  return creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
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
      let result = actions.pickup(creep, findClosestEnergyResource);
      if (result === OK) return;
      actions.harvest(creep, findClosestSource);
    }
  }
}

function harvester(creep: Creep): void {
  actions.harvest(creep, findClosestSource);
}

function worker(creep: Creep): void {
  if (hasEnergy(creep)) {
    let result = actions.build(creep, findClosestConstructionSite);
    if (result === OK) return;
    actions.upgrade(creep, () => creep.room.controller || null);
  } else {
    actions.pickup(creep, findClosestEnergyResource);
  }
}

const roles: Record<Roles, (creep: Creep) => void> = {
  pioneer,
  harvester,
  worker,
  sacrificer,
};

export enum Roles {
  pioneer = 'pioneer',
  harvester = 'harvester',
  worker = 'worker',
  sacrificer = 'sacrificer',
}

export default roles;
