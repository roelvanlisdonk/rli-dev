import { setupReloadOnServerSideEvent } from './services/server-side-events.service';
import { addCssTag, addCssClass, StyleState } from './services/style.service';
import { getState, save } from './services/store';
import { Binding, Component, appendComponent, when } from './services/render.service';

const state = getState<AppState>();

setupReloadOnServerSideEvent();
boot();

function boot() {
  state.persons = [
    {
      firstName: 'Max',
      lastName: 'Brook'
    },
    {
      firstName: 'Pi',
      lastName: 'Po'
    },
    {
      firstName: 'Karel',
      lastName: 'Appel'
    }
  ];

  appendComponent(document.body, personList(state.persons));
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
          const person = state.persons[0];
          if (person.firstName === 'Someone else') {
            person.firstName = 'Simon the king';
          } else {
            person.firstName = 'Someone else';
          }
          person.isSelected = true;
          save(state);
        }
      }),
      {
        name: 'ul',
        children: [personListItems(persons)]
      }
    ]
  };
}

addCssClass('person-list-item-selected', {
  color: 'rgb(255, 0, 0)'
});

function personListItems(persons: Person[]): Binding<Person[], Component[]> {
  persons = persons || [];
  return {
    deps: persons,
    fn: (persons: Person[]) =>
      persons.map((x) => {
        return {
          classes: [when(x, isSelected, 'person-list-item-selected')],
          name: 'li',
          text: {
            deps: x,
            fn: (person: Person) => person.firstName
          }
        };
      })
  };
}

function isSelected(person: Person): boolean {
  return Boolean(person.isSelected);
}

export interface AppState extends StyleState {
  persons: Person[];
}

export interface Person {
  firstName: string;
  isSelected?: boolean;
  lastName: string;
}
