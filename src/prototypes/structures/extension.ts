export {};

Object.defineProperty(StructureExtension.prototype, 'isNotFull', {
  get(): boolean {
    return (
      this.store.getUsedCapacity(RESOURCE_ENERGY) <
      this.store.getCapacity(RESOURCE_ENERGY)
    );
  },
});

declare global {
  interface StructureExtension {
    isNotFull: number;
  }
}
