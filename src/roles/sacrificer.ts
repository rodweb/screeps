export default function sacrificer(creep: Creep) {
  const spawn = creep.pos
    .findInRange(FIND_MY_SPAWNS, 1, {
      filter: (s) => !s.spawning,
    })
    .find(Boolean);
  if (!spawn) return;
  spawn.recycleCreep(creep);
}
