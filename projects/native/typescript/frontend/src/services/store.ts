let rootState = {};
let onStateChangeEventListeners: (<T>(state: T) => void)[] = [];

export function getState<T>(): T {
  return rootState as T;
}

export function registerSetStateEventListener(fn: <T>(state: T) => void) {
  onStateChangeEventListeners.push(fn);
}

export function save<T>(state: T): void {
  rootState = Object.assign(rootState, state);

  for (let listener of onStateChangeEventListeners) {
    listener(rootState);
  }
}
