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
