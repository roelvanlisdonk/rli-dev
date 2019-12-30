let rootState = {};
let onStateChangeEventListeners: (() => void)[] = [];

export function getState<T extends Object>(): T {
  return rootState as T;
}

export function registerOnStateChangeEventListeners(fn: () => void) {
  onStateChangeEventListeners.push(fn);
}

export function save<T extends Object>(state: T): void {
  for (let listener of onStateChangeEventListeners) {
    listener();
  }

  rootState = Object.assign(rootState, state);
}
