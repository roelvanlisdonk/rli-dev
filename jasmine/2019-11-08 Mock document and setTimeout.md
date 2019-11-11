If you have some code, that contains a call to setTimeout or calls one of the document functions, you can mock those 'global' functions without having to reset them, if you do it in your jasmine it function.

```TypeScript
function someFunction() {

}

function thisFunctionWillCallSetTimeout() {
    setTimeout(someFunction, 20);
}

describe('thisFunctionWillCallSetTimeout', () => {
    it('should call someFunction', () => {

        expect(comp).toBeTruthy();
    });
});
```
