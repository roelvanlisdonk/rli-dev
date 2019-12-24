let state = {};

export function getState<T>(): T {
  return state as T;
}
