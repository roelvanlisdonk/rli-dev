import { DynamicRoutingModule } from './dynamic-routing.module';

describe('DynamicRoutingModule', () => {
  let dynamicRoutingModule: DynamicRoutingModule;

  beforeEach(() => {
    dynamicRoutingModule = new DynamicRoutingModule();
  });

  it('should create an instance', () => {
    expect(dynamicRoutingModule).toBeTruthy();
  });
});
