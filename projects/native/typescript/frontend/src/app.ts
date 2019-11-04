import { add } from './store';

const fragment = document.createDocumentFragment();
addHeaderTo(fragment);
addMainTo(fragment);

add();

document.body.appendChild(fragment);

function addActionButtonTo(fragment: DocumentFragment) {
  const actionButton = document.createElement('button');
  actionButton.innerText = 'Execute';
  actionButton.style.cursor = 'pointer';
  actionButton.style.marginTop = '20px';
  actionButton.onclick = () => {
    // textElement.style.color = '#00FF00';
  };
  fragment.appendChild(actionButton);
}
function addHeaderTo(fragment: DocumentFragment) {}
function addMainTo(fragment: DocumentFragment) {}
function addTitleTo(fragment: DocumentFragment) {
  const title = 'This is a title.';
  console.log(`title: ${title}`);
  const textElement = document.createElement('div');
  textElement.innerText = title;
  textElement.style.color = '#FF0000';
  fragment.appendChild(textElement);
}
