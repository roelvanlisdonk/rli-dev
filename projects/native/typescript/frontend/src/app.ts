import { setupReloadOnServerSideEvent } from './services/server-side-events.service';
import { addCssTag, addCssClass, StyleState } from './services/style.service';
import { getState } from './services/store';
import { strictEqual } from 'assert';

const state = getState<AppState>();

setupReloadOnServerSideEvent();
boot();

function boot() {
  state.persons = [
    {
      firstName: 'Max',
      lastName: 'Brook'
    }
  ];

  appendComponent(document.body, personList(state.persons));
}

function appendComponent(element: HTMLElement, component: Component): void {
  const childElement = document.createElement(component.name);

  appendComponentAttributes(childElement, component);
  appendComponentClasses(childElement, component);
  appendComponentChildren(childElement, component);

  element.appendChild(childElement);
}

function appendComponentClasses(childElement: HTMLElement, component: Component) {
  if (component.classes && component.classes.length > 0) {
    const total = component.classes.length;
    for (let i = 0; i < total; i++) {
      const cssClass = component.classes[i];
      if (typeof cssClass == 'string') {
        childElement.classList.add(cssClass);
      }
    }
  }
}

function appendComponentChildren(childElement: HTMLElement, component: Component) {
  if (component.children && component.children.length > 0) {
    const total = component.children.length;
    for (let i = 0; i < total; i++) {
      const grandChild = component.children[i];
      if (isComponent(grandChild)) {
        appendComponent(childElement, grandChild);
      } else {
        appendComponentsBinding(childElement, grandChild);
      }
    }
  }
}

function appendComponentsBinding(childElement: HTMLElement, binding: Binding<any, Component[]>) {
  const components = binding.fn(binding.deps);
  const total = components.length;
  for (let i = 0; i < total; i++) {
    const component = components[i];
    appendComponent(childElement, component);
  }
}

function appendComponentAttributes(childElement: HTMLElement, component: Component) {
  for (const sourceProp in component) {
    let destProp = sourceProp;
    if (component.hasOwnProperty(sourceProp) && sourceProp !== 'children' && sourceProp !== 'classes' && sourceProp !== 'name') {
      if (sourceProp === 'text') {
        destProp = 'textContent';
      }

      let sourceValue = (component as any)[sourceProp];
      if (sourceValue && sourceValue.deps) {
        // setup re-rendering, when value change in the store.
        sourceValue = sourceValue.fn(sourceValue.deps);
      }

      (childElement as any)[destProp] = sourceValue;
    }
  }
}

function isComponent(component: Component | Binding<any, Component[]>): component is Component {
  return (component as Component).name !== undefined;
}

export interface ActionButtonOptions extends Partial<HTMLButtonElement> {
  text: string | Binding<any, string>;
}

function actionButton(options: ActionButtonOptions): Component {
  const name = 'button';
  const className = 'action-button';
  addCssClass(className, {
    cursor: 'pointer',
    userSelect: 'none'
  });

  return Object.assign(
    {
      name,
      classes: [className],
      text: options.text,
      type: 'button'
    },
    options
  );
}

function personList(persons: Person[]): Component {
  const name = 'person-list';
  addCssTag(name, {
    border: '10px solid rgb(100, 100, 100)',
    display: 'flex'
  });
  return {
    name,
    children: [
      actionButton({
        text: 'Execute',
        onclick: () => {
          console.log('Clicked on execute button.');
          state.persons[0].firstName = 'Someone else';
        }
      }),
      {
        name: 'ul',
        children: [personListItems(persons)]
      }
    ]
  };
}

function personListItems(persons: Person[]): Binding<Person[], Component[]> {
  persons = persons || [];
  return {
    deps: persons,
    fn: (persons: Person[]) =>
      persons.map((x) => {
        return {
          name: 'li',
          text: {
            deps: x,
            fn: (person: Person) => person.firstName
          }
        };
      })
  };
}

export type ComponentFactory<T> = (deps: T, overrides?: Component) => Component;

export interface Person {
  firstName: string;
  lastName: string;
}

export interface Component extends Partial<GlobalEventHandlers> {
  children?: (Component | Binding<any, Component[]>)[];
  classes?: (string | Binding<any, any>)[];
  name: string;
  text?: string | Binding<any, string>;
  type?: string;
}

export interface Binding<T, V> {
  deps: T;
  depFields?: keyof T[]; // Only used, to improve performance, when you only want to re-render on changes of specific fields.
  fn: (deps: T) => V;
}

export interface AppState extends StyleState {
  persons: Person[];
}
