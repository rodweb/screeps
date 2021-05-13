import {
  findClosestEnergyResource,
  findClosestEnergyStructure,
  findClosestSource,
  hasEnergy,
  isFull,
  isWorking,
  startWorking,
  stopWorking,
} from 'utils';
import actions from '../actions';

export function pioneer(creep: Creep): void {
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
