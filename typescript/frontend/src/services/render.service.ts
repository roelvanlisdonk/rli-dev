import { registerOnStateChangeEventListeners } from './store';

let renderBindings: RenderBinding<any, any>[] = [];

registerOnStateChangeEventListeners(OnStateChange);

export function appendComponent(element: HTMLElement, component: Component): void {
  const childElement = document.createElement(component.name);

  appendComponentAttributes(childElement, component);
  appendComponentClasses(childElement, component);
  appendComponentChildren(childElement, component);

  element.appendChild(childElement);
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
        renderBindings.push({
          attributeName: destProp,
          binding: sourceValue,
          element: childElement,
          oldDeps: Object.assign({}, sourceValue.deps),
          render: renderAttributeBinding
        } as AttributeRenderBinding<any, any>);

        sourceValue = sourceValue.fn(sourceValue.deps);
      }

      (childElement as any)[destProp] = sourceValue;
    }
  }
}

export function appendComponentsBinding(element: HTMLElement, binding: Binding<any, Component[]>) {
  // Setup re-rendering, when value changes in the store.
  const renderBinding: ComponentsRenderBinding<any, any> = {
    binding,
    components: [],
    element,
    oldDeps: Object.assign({}, binding.deps),
    render: renderComponentsBinding
  };
  renderBindings.push(renderBinding);
  renderComponentsBinding(renderBinding);
}

export function renderComponentsBinding<T, V>(binding: ComponentsRenderBinding<T, V>) {
  const components = (binding.binding.fn(binding.binding.deps) as unknown) as Component[];
  if (!components) {
    return;
  }

  // Remove bindings from child components.

  // Remove child elements.

  const total = components.length;
  for (let i = 0; i < total; i++) {
    const component = components[i];
    appendComponent(binding.element, component);
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

export function appendComponentClasses(element: HTMLElement, component: Component) {
  if (component.classes && component.classes.length > 0) {
    const total = component.classes.length;
    for (let i = 0; i < total; i++) {
      const cssClass = component.classes[i];
      if (typeof cssClass == 'string') {
        element.classList.add(cssClass);
        continue;
      }

      if (isBinding(cssClass)) {
        // setup re-rendering, when value changes in the store.
        const renderBinding = {
          binding: cssClass,
          element,
          component,
          oldDeps: Object.assign({}, cssClass.deps),
          render: renderCssClassBinding
        };
        renderBindings.push(renderBinding);
        renderCssClassBinding(renderBinding);
      }
    }
  }
}

export function isBinding(binding: Binding<any, any>): binding is Binding<any, any> {
  return binding && binding.deps;
}

export function isComponent(component: Component | Binding<any, Component[]>): component is Component {
  return (component as Component).name !== undefined;
}

export function OnStateChange(): void {
  const total = renderBindings.length;
  for (let i = 0; i < total; i++) {
    const binding = renderBindings[i];

    if (shouldReRender(binding)) {
      binding.render(binding);
      binding.oldDeps = binding.binding.deps;
    }
  }
}

export function renderAttributeBinding<T, V>(binding: AttributeRenderBinding<T, V>) {
  if (!binding.attributeName) {
    return;
  }
  (binding.element as any)[binding.attributeName] = binding.binding.fn(binding.binding.deps);
}

export function renderCssClassBinding<T, V>(binding: RenderBinding<T, V>) {
  const whenBinding = binding.binding as WhenBinding<T, string>;
  const cssClass = whenBinding.fn(whenBinding.deps);
  if (whenBinding.falseValue && typeof whenBinding.falseValue === 'string') {
    binding.element.classList.remove(whenBinding.falseValue);
  }

  if (whenBinding.trueValue && typeof whenBinding.trueValue === 'string') {
    binding.element.classList.remove(whenBinding.trueValue);
  }

  if (cssClass && typeof cssClass === 'string') {
    binding.element.classList.add(cssClass);
  }
}

export function shouldReRender(binding: RenderBinding<any, any>): boolean {
  if (binding.binding.deps !== binding.oldDeps) {
    return true;
  }

  if (Array.isArray(binding.binding.deps)) {
    // To improve performance. We only want to re-render, when the array itself changes.
    return false;
  }

  const newValue = JSON.stringify(binding.binding.deps);
  const oldValue = JSON.stringify(binding.oldDeps);
  return newValue !== oldValue;
}

export function when<T, V>(deps: T, fn: (deps: T) => boolean, trueValue: V, falseValue?: V | null): WhenBinding<T, V> {
  if (falseValue === undefined) {
    falseValue = null;
  }

  return {
    deps,
    falseValue,
    fn: () => (fn(deps) ? trueValue : (falseValue as V | null)),
    trueValue
  };
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
  fn: (deps: T) => V | null;
}

export interface WhenBinding<T, V> extends Binding<T, V> {
  deps: T;
  depFields?: keyof T[]; // Only used, to improve performance, when you only want to re-render on changes of specific fields.
  falseValue: V | null;
  fn: (deps: T) => V | null;
  trueValue: V;
}

interface RenderBinding<T, V> {
  binding: Binding<T, V>;
  element: HTMLElement;
  oldDeps: T; // Is used to detect changes.
  render: (binding: RenderBinding<T, V>) => void;
}

interface AttributeRenderBinding<T, V> extends RenderBinding<T, V> {
  attributeName: string;
}

interface ComponentsRenderBinding<T, V> extends RenderBinding<T, V> {
  renderedElements: HTMLElement[];
}
