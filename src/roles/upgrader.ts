const first = <T>(arr: T[]) => arr.find(Boolean);

export default function upgrader(creep: Creep) {
  const tombstone = first(
    creep.pos.findInRange(FIND_TOMBSTONES, 1, {
      filter: (s) => s.store.getUsedCapacity(RESOURCE_ENERGY),
    }),
  );
  if (tombstone) creep.withdraw(tombstone, RESOURCE_ENERGY);
  creep.upgradeController(creep.room.controller!);
}
