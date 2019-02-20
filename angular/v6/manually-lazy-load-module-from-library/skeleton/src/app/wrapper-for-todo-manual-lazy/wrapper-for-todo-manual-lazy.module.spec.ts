import { WrapperForTodoManualLazyModule } from './wrapper-for-todo-manual-lazy.module';

describe('WrapperForTodoManualLazyModule', () => {
  let wrapperForTodoManualLazyModule: WrapperForTodoManualLazyModule;

  beforeEach(() => {
    wrapperForTodoManualLazyModule = new WrapperForTodoManualLazyModule();
  });

  it('should create an instance', () => {
    expect(wrapperForTodoManualLazyModule).toBeTruthy();
  });
});
