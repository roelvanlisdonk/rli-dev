# Notes on front end

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
* Use a TypeScript node development backend server with breakpoint support in vscode

- https://medium.com/aherforth/how-to-get-auto-restart-and-breakpoint-support-with-typescript-and-node-5af589dd8687

* Load modules in browser today
  - https://philipwalton.com/articles/using-native-javascript-modules-in-production-today/
* Add mock backend development server with hot reload:
  - https://medium.com/@edward17/node-js-typescript-webpack-js-hot-module-replacement-express-js-8d92dad60119
* Add generic 'css' variables file
* Add npm run app
  - This will start the mock backend development server.

# Notes on back end

- We should have a 'mock' backend server that server \*.json files on all /api/ requests.
- This data will be cached in the TypeScript node app
- You can register put and post and delete functions to alter the cache.
- There will be a /api/reset function, that will reset the cache
