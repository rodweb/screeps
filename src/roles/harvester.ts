import actions from '../actions';
import { findClosestSource } from '../utils';

export function harvester(creep: Creep): void {
  actions.harvest(creep, findClosestSource);
}
