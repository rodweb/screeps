import sacrificer from './roles/sacrificer';
import upgrader from './roles/upgrader';
import { pioneer } from './roles/pioneer';
import { harvester } from './roles/harvester';
import { worker } from './roles/worker';

const roles: Record<Roles, (creep: Creep) => void> = {
  pioneer,
  harvester,
  worker,
  sacrificer,
  upgrader,
};

export enum Roles {
  pioneer = 'pioneer',
  harvester = 'harvester',
  worker = 'worker',
  sacrificer = 'sacrificer',
  upgrader = 'upgrader',
}

export default roles;
