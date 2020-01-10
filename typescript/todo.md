# TODO

## General
- ESLint
- Karma for frontend testing
- Native jasmine for backend testing

## Front-end
- Add .getStoreId() function to each object in the store.
- Add when attribute binding, this binding will add or remove the element from the dom.
- Change store, it should contain 2 maps, state en previousState.
  When an object is upserted in the state a copy is upserted in the previousState
  On upsert, bindings depended on the upserted object are executed.
- Store.save, should traverse the given object tree en store every object in the maps.
  If you want to update an array, just add a .getStoreId() function to the object, that returns the same store id.
- For the save you can add .getDepFields() function to the objects, to improve performance
- When a given object or array in the given object tree for save, is not a StoreItem,
  it will be converted to a StoreItem and saved in state and previousState. 
- Change renderComponentsBinding, it should save the added elements and bindings.
- Change renderComponentsBinding, it should remove elements and bindings
- Change binding.deps, it should be an store item and optional fields
  NOTE: a store item can be an object or an array, but it will have a getStoreId().



## NPM Scripts
- Add cross platform "open-browser": "open(http://localhost:3003)" to npm run start
- Add karma unit test runner for frontend code, because frontend code should run in the browser.
- Add karma + puppeteer end-to-end tests
- Add jasmine unit test runner for backend code, because backend code should run in node.



## Backend code
- Make frontend javascript files, contain content hash code in filename for cache busting
- Make http2 work in backend.
- Publish to Azure devops
- Publish to Amazone
- Add .NET Core backend with the same functionality as the node backend.
- Remove express from backend and use native 'http2' module.



## Frontend code
- Add bind.service.ts
  - Add get function
  - Add when function
- Add http.service.ts
- Add render.service.ts
- Add router.service.ts
- Add store.service.ts
- Add styles.service.ts
- Add translation.service.ts







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

// ------------------------------------ main.ts ---------------------------------------- //
import { app } from './app.component';
import { router } from './router.service';
import { store } from './store.service';

const appState: AppState = {
  car: {},
  persons: []
}

// Register routes
router.register('/car', import('./car').then((mod)=> {
  // When the user, navigates to /car the car module will be loaded and we update the store with the component render function to use and which data to use, when rendering the component.
  // This will automatically trigger a re-render of the router-outlet component.
  store.set({ router: { component: mod.component, componentState: {} }});
}));

// Start the application rendering.
const body = document.querySelectorAll('body')[0];
body.append(app(appState))


// ------------------------------------ app.component.ts ---------------------------------------- //
import { car } from './car.component';
import { person-list } from './person-list.component';
import { router-outlet } from './router-outlet.component';

export function app(state: AppState): DocumentFragment {
  return render({
    tag: 'app',
    children: [
      div({ css: row, children: [
        car(car1, { css: [column] }),           // This will only overwrite the css class column.
        person-list(persons, { css: [column] }) // This will only overwrite the css class column.
      ]}),
      router-outlet(state.router) // This will dynamically load a component and render it.
    ]
  });
}

// ------------------------------------ car.component.ts ------------------------------------------------ //

export let translations = {
    fullName: 'Full name'
};

let translationsNl = {
    fullName: 'Volledige naam'
};

export function car(state: Car, overrides?: VNode, translator?: Translator): DocumentFragment {
  // Register translation for dutch.
  translations = translateService.register('car', translations, 'nl');
  // Register translation for the default language.
  translations = translateService.register('car', translations);

  

  const component = {
    tag: 'car',
    css: [get(state, color)],
    text: get(state, fullName, ['type', 'name']),
    display: when(state, isBmw),
    // Life cycle hooks
    onDestroy: () => {
      // unsubscribe, manually subscribed store items.
    }
  };
  component = Object.assign(list, overrides);

  return render(component);
}

function color(car: Car): CssClass {
  if(car.name === 'BMW') {
    return green;
  }

  return normal;
}

function fullName(car: Car) {
  return `${translations.fullName}: ${car.type} - ${car.name}`;
}

// ------------------------------------ person-list.component.ts ---------------------------------------- //


export function person-list(persons: Person[], overrides: VNode) {
  const component = {
    tag: 'person-list'
  };
  component = Object.assign(list, overrides);
  
  for(const person of persons) {
    component.children.push(
      div({ text: get(person, fullName)]})
    )
  }

  return render(component);
}

function fullName(person: Person) {
    return `${person.firstName} ${person.lastName}`;
}

// ------------------------------------ router-outlet.component.ts ---------------------------------------- //

function router-outlet(state:Route, overrides: VNode) {
  const component = {
    tag: 'router-outlet'
  };
  const element = render(component)[0];
  const module = import(state.componentModule).then((mod) => {
    renderDomElement(element, mod[state.componentFn](state.componentState));
  });
  component = Object.assign(component, overrides);
  return render(component);
}


// ------------------------------------ http.ts ---------------------------------------- //
public class Http {
  // This class is a thin wrapper around the browsers fetch api.
  // It is created so we can create http interceptors, to execute some code just before sending a http request of just after receiving a http response.

  get(url: string) : Promise {

  }

  post<T>(url: string, data: T) : Promise {
    
  }

  registerRequestInterceptor() {

  }

  registerResponseInterceptor() {

  }

  unRegisterRequestInterceptor() {

  }

  unRegisterResponseInterceptor() {
    
  }
}


// ------------------------------------ router.ts ---------------------------------------- //
import { Store } from './store';

public class Router {
  constructor(store: Store) {

  }

  registerRoute(route: string, fn: RenderFn) {

  }


  watchUrl() {
    // Add event listener to URL changes.
    // Change the state in the store
  }
}

// ------------------------------------ store.ts ---------------------------------------- //

export public class Store {
  get(path: string) {

  }

  // Because local storage is also synchronous, we will only create a synchronous store for now.
  save(item: StoreItem | StoreItem[]) {

  }

  onKeyChange(path: string): Promise {

  }

  onValueChange(value: StoreItem): Promise {

  }

  unsubscribe(promise: Promise) {

  }
}

export const appStore = new Store();


// ------------------------------------ translator.ts ---------------------------------------- //

export public class Translator {
  // For now this api is synchronous, if you have large translation files or many languages, 
  // We should add the asynchronous api.
  constructor(store: Store) {

  }

  getLanguage() string {

  }

  register(translation: any) {

  }

  setLanguage(language: string) {

  }

  translate(key: string): string {

  }
}


```



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



```TypeScript

// First option
// VirtualNode extends VirtualNodeOptions
// - deps
// - tageName
// - create(), e.g. === div()
// Components are functions that receive one parameter and return a VirtualNode object or an array of VirtualNode objects.
// These VirtualNode objects can be passed to the render() function, to convert it to a document fragment.
// There is a life cycle function "beforeRender", that receives the parent dom element and VirtualNode and can be use to do your own rendering.
// Inside the beforeRender you can use component functions to convert VirtualNodes to DocumentFragments.
//
// div
// The only thing a function like div() will do is add tagName: 'div', to the overwrites and a renderFn: div.


render(document.body, div({
  classList: [
    get(boxClass, person),
    when(person, isAdult, 'green', 'black')
  ],
  display: when(person, isAdult, 'flex'),
  text: get(fullName, person)
  children: [
    personList({ deps: persons })
  ]
})));

function whenIsAdult(person) {
  return {
    deps: person,
    depFields: [], // Only used, to improve performance, when you only want to re-render on changes of specific fields.
    value: person.age >= 18 ? 'flex', 'none';
    fn: whenIsAdult
  }
}

render(document.body, div({
  classList: [
    when(person, isAdult, 'required')
  ],
  display: when(person, isAdult, 'flex'),
  text: get(person, fullName)
  children: [
    personList({ deps: persons })
  ]
})));

function fullName(person: Person) {
  return `${person.firstName} ${person.lastName}`;
}

// The get function is a helper function:
function get<T>(deps: T, fn<T>, depFields?: keyOf<T>[]) {
  return {
    deps,
    depFields, // Only used, to improve performance, when you only want to re-render on changes of specific fields.
    value: fn()
    fn
  }
}


```