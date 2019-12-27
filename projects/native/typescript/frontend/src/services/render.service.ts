import { registerSetStateEventListener } from './store';

let attributeBindings: AttributeBinding<any, any>[] = [];

registerSetStateEventListener(OnStateChange);

export function appendComponent(element: HTMLElement, component: Component): void {
  const childElement = document.createElement(component.name);

  appendComponentAttributes(childElement, component);
  appendComponentClasses(childElement, component);
  appendComponentChildren(childElement, component);

  element.appendChild(childElement);
}

export function appendComponentClasses(childElement: HTMLElement, component: Component) {
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

export function appendComponentChildren(childElement: HTMLElement, component: Component) {
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

export function appendComponentsBinding(childElement: HTMLElement, binding: Binding<any, Component[]>) {
  const components = binding.fn(binding.deps);
  const total = components.length;
  for (let i = 0; i < total; i++) {
    const component = components[i];
    appendComponent(childElement, component);
  }
}

export function appendComponentAttributes(childElement: HTMLElement, component: Component) {
  for (const sourceProp in component) {
    let destProp = sourceProp;
    if (component.hasOwnProperty(sourceProp) && sourceProp !== 'children' && sourceProp !== 'classes' && sourceProp !== 'name') {
      if (sourceProp === 'text') {
        destProp = 'textContent';
      }

      let sourceValue = (component as any)[sourceProp];

      if (isBinding(sourceValue)) {
        // setup re-rendering, when value changes in the store.
        attributeBindings.push({
          binding: sourceValue,
          childElement,
          component,
          name: destProp,
          render: renderAttributeBinding
        });

        sourceValue = sourceValue.fn(sourceValue.deps);
      }

      (childElement as any)[destProp] = sourceValue;
    }
  }
}

export function isBinding(binding: Binding<any, any>): binding is Binding<any, any> {
  return binding && binding.deps;
}

export function isComponent(component: Component | Binding<any, Component[]>): component is Component {
  return (component as Component).name !== undefined;
}

export function OnStateChange(state: any) {
  console.log(`State ${JSON.stringify(state)} changed.`);

  for (const prop in state) {
    state.hasOwnProperty(prop);
    const deps = state[prop];

    if (deps !== null && (Array.isArray(deps) || deps === 'object')) {
      OnStateChange(deps);
    }

    const found = findMatchingDeps(attributeBindings, deps);
    if (found) {
      found.render(found);
    }
  }
}

function findMatchingDeps(bindings: AttributeBinding<any, any>[], deps: any): AttributeBinding<any, any> | null {
  const total = bindings.length;
  for (let i = 0; i < total; i++) {
    const binding = bindings[i];
    if (binding.binding.deps === deps) {
      return binding;
    }
  }
  return null;
}

export function renderAttributeBinding<T, V>(binding: AttributeBinding<T, V>) {
  (binding.childElement as any)[binding.name] = binding.binding.fn(binding.binding.deps);
}

export type ComponentFactory<T> = (deps: T, overrides?: Component) => Component;

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

interface AttributeBinding<T, V> {
  binding: Binding<T, V>;
  childElement: HTMLElement;
  component: Component;
  name: string;
  render: (binding: AttributeBinding<T, V>) => void;
}
