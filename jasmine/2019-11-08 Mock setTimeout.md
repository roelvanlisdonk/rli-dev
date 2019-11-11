Jasmine has a way to deal with asynchronous work: https://jasmine.github.io/tutorials/async, but I wanted the test to be 'synchronously'.

So I mocked the window.setTimeout function.
NOTE: this will only work if your jasmine tests are run inside the browser, because in node you will have to mock global.setTimeout.

```TypeScript
function someFunction() {

}

function thisFunctionWillCallSetTimeout() {
    setTimeout(() => {
        someFunction();
    }), 20);
}

describe('thisFunctionWillCallSetTimeout', () => {
    it('should call someFunction', () => {
        // Mock window.setTimeout and call through.
        // Don't use Jasmine mocking on window.setTimeout,
        // because that will not mock setTimeout correctly.
        (window as any).setTimeout = (handler: TimerHandler, timeout?: number) => {
        (handler as any)();
        };
        thisFunctionWillCallSetTimeout();
        const someFunctionSpy = jasmine.createSpy('someFunction', someFunction);
        expect(someFunctionSpy).toHaveBeenCalled();
    });
});
```
