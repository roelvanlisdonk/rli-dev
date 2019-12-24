import { setupReloadOnServerSideEvent } from './services/server-side-events.service';
import { addCssTag, addCssClass } from './services/style.service';

setupReloadOnServerSideEvent();
boot();

function boot() {
  const persons: Person[] = [
    {
      firstName: 'Max',
      lastName: 'Brook'
    }
  ];

  appendComponent(document.body, personList(persons));
}

function appendComponent(element: HTMLElement, component: Component): void {
  const childElement = document.createElement(component.name);

  if (component.text && typeof component.text == 'string') {
    childElement.textContent = component.text;
  }

  if (component.type && typeof component.type == 'string') {
    (childElement as HTMLButtonElement).type = component.type;
  }

  appendComponentClasses(childElement, component);
  appendComponentChildren(childElement, component);
  appendComponentEventHandlers(childElement, component);

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

function appendComponentEventHandlers(childElement: HTMLElement, component: Component) {
  for (const prop in component) {
    if (component.hasOwnProperty(prop) && prop.startsWith('on')) {
      (childElement as any)[prop] = (component as any)[prop];
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
      actionButton({ text: 'Execute', onclick: () => console.log('Clicked on execute button.') }),
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
          text: x.firstName
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
