import ErrorMapper from 'libs/error-mapper';

declare global {
  interface CreepMemory {
    role: string;
  }
}

function unwrappedLoop() {
  console.log(`Current game tick is ${Game.time}`);
}

const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export { loop, unwrappedLoop };
