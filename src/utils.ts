export function hasEnergy(creep: Creep): boolean {
  return creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
}

export function isFull(creep: Creep): boolean {
  return creep.store.getFreeCapacity() === 0;
}

export function isWorking(creep: Creep): boolean {
  return creep.memory.working;
}

export function stopWorking(creep: Creep): void {
  creep.memory.working = false;
}

export function startWorking(creep: Creep): void {
  creep.memory.working = true;
}

export function findClosestEnergyStructure(
  creep: Creep,
): StructureSpawn | null {
  return creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
    filter: (s) => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
  });
}

export function findClosestSource(creep: Creep): Source | null {
  return creep.pos.findClosestByPath(FIND_SOURCES, {
    filter: (s) => s.energy > 0,
  });
}

export function findClosestEnergyResource(creep: Creep): Resource | null {
  return creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
    filter: (s) => s.resourceType === RESOURCE_ENERGY && s.amount > 50,
  });
}

export function findClosestConstructionSite(
  creep: Creep,
): ConstructionSite | null {
  return creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
}
