import { ManualLazyModule } from './manual-lazy.module';

describe('ManualLazyModule', () => {
  let manualLazyModule: ManualLazyModule;

  beforeEach(() => {
    manualLazyModule = new ManualLazyModule();
  });

  it('should create an instance', () => {
    expect(manualLazyModule).toBeTruthy();
  });
});
