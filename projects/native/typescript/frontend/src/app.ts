import { setupReloadOnServerSideEvent } from './services/server-side-events.service';
import { addCssTag } from './services/style.service';

setupReloadOnServerSideEvent();
renderAppComponent();

function renderAppComponent() {
  const name = 'ts-app';
  addCssTag(name, {
    border: '10px solid rgb(100, 100, 100)',
    display: 'flex'
  });

  const fragment = document.createDocumentFragment();
  const hello = document.createElement('ts-app');

  hello.textContent = 'Hello world!!!!';
  fragment.append(hello);
  document.body.appendChild(fragment);
}

function personList(persons: Person[], overrides?: VNode): VNode {
  const name = 'person-list';
  return {
    name,
    children: [
      {
        name: 'ul',
        children: [{}]
      }
    ]
  };
}

export interface Person {
  firstName: string;
  lastName: string;
}

export interface VNode {
  children?: (VNode | Binding<any, VNode[]>)[];
  classes?: (string | Binding<any, any>)[];
  name: string;
  text?: string | Binding<any, any>;
}

export interface Binding<T, V> {
  deps: T;
  depFields: any; // Only used, to improve performance, when you only want to re-render on changes of specific fields.
  value: V;
  fn: (deps: T) => V;
}
