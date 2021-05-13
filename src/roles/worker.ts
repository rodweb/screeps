import actions from '../actions';
import {
  findClosestConstructionSite,
  findClosestEnergyResource,
  hasEnergy,
} from '../utils';

export function worker(creep: Creep): void {
  if (hasEnergy(creep)) {
    let result = actions.build(creep, findClosestConstructionSite);
    if (result === OK) return;
    actions.upgrade(creep, () => creep.room.controller || null);
  } else {
    actions.pickup(creep, findClosestEnergyResource);
  }
}
