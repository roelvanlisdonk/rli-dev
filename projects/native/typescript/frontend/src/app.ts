import { add } from './store/store';

const fragment = document.createDocumentFragment();
addHeaderTo(fragment);
addMainTo(fragment);

add();

document.body.appendChild(fragment);

function addActionButtonTo(fragment: DocumentFragment) {
  let counter = 100;
  const actionButton = document.createElement('button');
  actionButton.innerText = 'Execute v4';
  actionButton.style.cursor = 'pointer';
  actionButton.style.marginTop = '20px';
  actionButton.onclick = () => {
    counter += 20;
    actionButton.style.width = `${counter}px`;
  };
  fragment.appendChild(actionButton);
}
function addHeaderTo(fragment: DocumentFragment) {
  addTitleTo(fragment);
}
function addMainTo(fragment: DocumentFragment) {
  addActionButtonTo(fragment);
  addTitleTo(fragment);
}
function addTitleTo(fragment: DocumentFragment) {
  const title = 'This is a title.';
  console.log(`title: ${title}`);
  const textElement = document.createElement('div');
  textElement.innerText = title;
  textElement.style.color = '#FF0000';
  fragment.appendChild(textElement);
}

export function thisFunctionWillCallSetTimeout(fn: Function) {
  console.log('thisFunctionWillCallSetTimeout');
  setTimeout(() => {
    console.log('inside setTimeout');
    fn();
  }, 20);
}
