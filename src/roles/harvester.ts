import actions from '../actions';
import { findClosestSource, findNearExtensions, hasEnergy } from '../utils';

export function harvester(creep: Creep): void {
  actions.harvest(creep, findClosestSource);
  if (!hasEnergy(creep)) return;
  actions.transfer(
    creep,
    () =>
      findNearExtensions(creep).find((extension) => extension.isNotFull) ||
      null,
  );
}
