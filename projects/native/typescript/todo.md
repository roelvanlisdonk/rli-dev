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

- Setup project for frontend and backend TypeScript development.
- Use native node instead of express - https://www.alexkras.com/simple-https-test-server-using-node-js/
- Make debugging work in vscode for backend
  - https://code.visualstudio.com/docs/typescript/typescript-debugging
- Backend mock server can be created by: nodemon and ts-node
  https://dev.to/nuclight/setting-up-fullstack-typescript-app-1bbe
  https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change
  nodemon is used to check if files are changed
  ts-node is used to run a node application and compile TypeScript on the fly, so you don't have to recompile the whole
  project every time. It will automatically restart your TypeScript application when a file changes?

  There's also ts-node-dev, a modified version of node-dev using ts-node for compilation and won't restart the process on file change.

  This is very handy, because then the state will be preserved, it will be much faster.

- We should have a 'mock' backend server that server \*.json files on all /api/ requests.
- This data will be cached in the TypeScript node app
- You can register put and post and delete functions to alter the cache.
- There will be a /api/reset function, that will reset the cache

# Folder structure

I think I want the following folder structure:

- dist
  - contains backend and frontend JavaScript code
  - server will use these source to run
  - browser will use the files from this folder to show the front-end.
- backend
  - src
    - server.ts // is the entry point for the server
  - package.json
  - tsconfig.json
  - tslint
- frontend
  - src
    - app.ts
    - index.html // is the entry point for the UI.
  - package.json
  - tsconfig.json
  - tslint
- package.json
  - this will contain only npm run scripts
