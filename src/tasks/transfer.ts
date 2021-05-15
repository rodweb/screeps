import game from '../game';

export default class Transfer {
  readonly targetId: Id<StructureExtension>;
  private assignedCreepName: string | null = null;

  constructor(target: StructureExtension) {
    this.targetId = target.id;
  }

  getTarget(): StructureExtension | null {
    return game.getObjectById(this.targetId);
  }

  getAssignedCreep(): Creep | null {
    if (!this.assignedCreepName) return null;
    return game.getCreepByName(this.assignedCreepName);
  }

  assign(creep: Creep): void {
    this.assignedCreepName = creep.name;
  }

  unassign(): void {
    this.assignedCreepName = null;
  }

  canBePerformedBy(creep: Creep): boolean {
    return creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
  }

  perform(): void | boolean {
    if (!this.assignedCreepName) return;

    const target = this.getTarget();
    if (!target) {
      return;
    }

    const creep = this.getAssignedCreep();
    if (!creep) {
      this.unassign();
      return;
    }

    if (!this.canBePerformedBy(creep)) {
      this.unassign();
      return;
    }

    if (!creep.pos.isNearTo(target.pos)) {
      creep.moveTo(target.pos, { visualizePathStyle: {} });
      return;
    }

    const amount = creep.store.getUsedCapacity(RESOURCE_ENERGY);
    const result = creep.transfer(target, RESOURCE_ENERGY);
    if (result === OK) {
      return amount >= target.store.getFreeCapacity(RESOURCE_ENERGY);
    }
  }
}
