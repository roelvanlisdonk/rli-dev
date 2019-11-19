import { add } from './store/store';
import { setupServerSideEvents } from './services/server-side-events.service';

console.log('starting app!!');
setupServerSideEvents();
render();

function render() {
  const fragment = document.createDocumentFragment();
  addHeaderTo(fragment);
  addMainTo(fragment);
  add();
  addTwoColumnLayout(fragment);
  document.body.appendChild(fragment);
}

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
  const title = 'This is a title and we changed it.';
  console.log(`title: ${title}`);
  const textElement = document.createElement('div');
  textElement.innerText = title;
  textElement.style.color = '#FF0000';
  fragment.appendChild(textElement);
}
function addTwoColumnLayout(fragment: DocumentFragment) {
  const tableDiv = document.createElement('div');
  tableDiv.style.border = '1px solid black';
  addFlexRow(tableDiv);
  addLeftColumn(tableDiv);
  addRightColumn(tableDiv);
  fragment.appendChild(tableDiv);
}

function addRightColumn(tableDiv: HTMLDivElement) {
  const c = document.createElement('div');
  c.style.border = '1px solid black';
  c.style.height = '100px';
  addText(c, 'Right column');
  addFlexColumn(c);
  tableDiv.appendChild(c);
}

function addText(e: HTMLDivElement, text: string) {
  const s = document.createElement('span');
  s.innerText = text;
  e.appendChild(s);
}

function addLeftColumn(tableDiv: HTMLDivElement) {
  const c = document.createElement('div');
  c.style.border = '1px solid black';
  c.style.height = '100px';
  c.style.justifyContent = 'center';
  addFlexColumn(c);
  addText(
    c,
    'Left column Left column Left column Left column Left column Left column Left column Left column Left column Left column Left column Left column'
  );
  tableDiv.appendChild(c);
  return c;
}

function addFlexColumn(element: HTMLElement) {
  const s = element.style;
  s.display = 'flex';
  s.flexDirection = 'column';
  s.flex = '1';
}

function addFlexRow(element: HTMLElement) {
  const s = element.style;
  s.display = 'flex';
  s.flexDirection = 'row';
  s.flexWrap = 'wrap';
}
