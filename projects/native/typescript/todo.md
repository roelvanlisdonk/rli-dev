# TODO

## NPM Scripts

Use npm-run-all to execute the following scripts in parallel

- "frontend-watch": "tsc -w"
- "refresh-browser-on-frontend-code-change": "ts-node-dev refresh-browser.ts"

  - Watch on frontend/tsconfig.tsbuildinfo and frontend/\*_/_.html
  - call http('localhost:3003/refreshBrowser'), when the watch fires.
    <br>

- "pre-launch-task": "npm-run-all frontend-watch refresh-browser-on-frontend-code-change start-backend open-browser" // Used in launch.json - preLaunchTask
  <br>

- "open-browser": "open(http://localhost:3003)"
- "start": "npm-run-all start-backend open-browser"
  // By default I want to start in debugging.
- "start-backend": "ts-node-dev --inspect=4321 --project ./backend/tsconfig.json --respawn --transpileOnly ./backend/src/server.ts",

<br>
<br>

## Retry EventSource

When the server restarts the browser

<br>
<br>

## Add render functions

The render function returns a document fragment, so it can add multiple elements
App starts with

```TypeScript
import row from '../../styles/row';
import column from '../../styles/column';

// Advise name your general classes, so not .row, but .a-row (application row) or ds-row (design system row).
// Classes specific to a component should be registered and will always start with the tagName, e.g. app-green.
// This prevents styles from classes bleeding into child components.
// This will also make shore that you can see easily see, what classes are use where.

// Advise always use classes, don't use css 'selectors', because that will byte you in the end.
// Css classes is a bit more verbose in the html, but it makes it really clear, where the styles are coming from.

const tagName = 'app'
const green = registerCssClass(app, 'green', { paddingLeft: '10px'; });
// This will register a class app-green, yes I know this is a little bit verbose in the html,
// but I think this is the best trade-off we can make, to not interfere with child elements.


const app = render({
  tag: tagName,
  children: [
    div({ css: row, children: [
      div({ css: [column], text: get(car1, fullName), display: when(car1, isGreen)}),
      div({ css: [column, green], text: get(car1, fullName, ['type', 'name']), display: when(car1, isBmw)}),
      div({ css: [get(car1, color)]}),
      personList(persons, { css: [column] }) // This will only overwrite the css class column.
    ]})
  ]
});
root.append(app);


function color(car: Car): CssClass {
  if(car.name === 'BMW') {
    return green;
  }

  return normal;
}



function fullName(car: Car) {
  return `${car.type} - ${car.name}`;
}


function personList(persons: Person[], overrides: VNode) {
  const list = {
    tag: 'person-list'
  };
  list = Object.assign(list, overrides);
  
  for(const person of persons) {
    list.children.push(
      div({ text: get(person, fullName)]})
    )
  }

  function fullName {
    return `${person.firstName} ${person.lastName}`;
  }

  return render(list);
}




```


## Add file watcher to node server

To minimize external dependencies / tooling used, we will watch changes to the frontend files,
inside the node server.
https://thisdavej.com/how-to-watch-for-files-changes-in-node-js/
We can use child_process to execute tsc -w and output the logging to the console.

<br>
<br>

## Deep paths as selectors in TypeScript

https://stackoverflow.com/questions/45372227/how-to-implement-typescript-deep-partial-mapped-type-not-breaking-array-properti

```
const state : {
  task: {
    some: {
      color: string
    }
  }
}

const task = select('task.some.color')

el.display = bind(task, ()=> 'block')

```

- Reload browser
- In v1 we will just use a websocket on the server and client to refresh the browser, when TypeScript frontend code transpilation is done.
- When the server restarts, because of a server TypeScript code change, we will have to restore the connection to the browser.

* we can always have a node-mon process on the server, that when a static file, like _.html or _.css changes, the page reloads?

- In the future we will create a separate publish process and a npm run start-prod, so we can check if things in production will work.

- Make \*.map files work, so we can debug TypeScript on the frontend.
- Check if using ts-node-dev for debugging speeds up the debugging process, because currently it is taking long to start.
  - There is a stackoverflow person, saying he is able to use ts-node-dev to restart debug process, when file changes, only make sure you are not on a breakpoint when saving a file
    - edit and automatically restart debug process:
    - https://github.com/whitecolor/ts-node-dev/issues/9
  - https://medium.com/@dupski/debug-typescript-in-vs-code-without-compiling-using-ts-node-9d1f4f9a94a
- Remove express from backend and use native 'http2' module.
- Make using a npm module in the frontend work
- Make http2 work in backend.
- Make frontend javascript files, contain content hash code in filename for cache busting
- Make a separate publish process and a npm run start-prod
- Publish to Azure devops
- Publish to Amazone

# .NET Core

Use this post to recompile .net core server when code changes:
dotnet watch run
https://weblog.west-wind.com/posts/2019/May/18/Live-Reloading-Server-Side-ASPNET-Core-Apps

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
- Check if we can use solution tsconfig.json file, so we can compile the whole project just with want tsc command.
  - http://www.typescriptlang.org/docs/handbook/project-references.html#tsc--b-commandline

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
