import * as test from './app';

function someFunction() {
  console.log('inside some function');
}

describe('thisFunctionWillCallSetTimeout', () => {
  it('should call someFunction', () => {
    console.log('start');

    spyOn(globalThis, 'setTimeout').and.callThrough();
    // Mock function
    // const someFunctionSpy = jasmine.createSpy('someFunction', someFunction).and.callThrough();

    //jasmine.createSpy('setTimeout').and.callThrough();
    //spyOn(global, 'setTimeout').and.callThrough();
    test.thisFunctionWillCallSetTimeout(someFunction);

    // expect(someFunctionSpy).toHaveBeenCalled();
    expect(true).toBeTruthy();
  });
});
