Notes

- Store data should use atomic data
- car1.color.id
  - is a string in format aid-12345
  - the id is just a counter in the store
    car1.color.value
- a render function will always return a Element or an array of Elements
- you can bind a render function, like:
- bindChildren<Args>(parentElement, fn: (args: Args) => Element | Element[], args: Args)
- You can bind a property, like
  - bindText<Args>(element1, fn: (args: Args) => string, args: Args)
  - bindProperty<Args>(element1, keyof<Element>, fn: (args: Args) => string, args: Args)
  - bindStyle<Args>(element1, fn: (args: Args) => Style, args: Args)
  - bindClass<Args>(element1, fn: (args: Args) => ClassList, args: Args)
  - DomEvents will be normal event handler functions, it can use all the data give to the render function
- bindings are stored in the store, because we think it is state.

Normally all 'communication' between 'components' will be done via the store.

- In rare cases you can use the MessageService
  - register
  - subscribe

* Add helper.ts
* Add mock backend development server with hot reload:
  - https://medium.com/@edward17/node-js-typescript-webpack-js-hot-module-replacement-express-js-8d92dad60119
* Add generic 'css' variables file
* Add npm run app
  - This will start the mock backend development server.
*
