import { add } from './store';
var fragment = document.createDocumentFragment();
addHeaderTo(fragment);
addMainTo(fragment);
add();
document.body.appendChild(fragment);
function addActionButtonTo(fragment) {
    var actionButton = document.createElement('button');
    actionButton.innerText = 'Execute';
    actionButton.style.cursor = 'pointer';
    actionButton.style.marginTop = '20px';
    actionButton.onclick = function () {
        // textElement.style.color = '#00FF00';
    };
    fragment.appendChild(actionButton);
}
function addHeaderTo(fragment) { }
function addMainTo(fragment) { }
function addTitleTo(fragment) {
    var title = 'This is a title.';
    console.log("title: " + title);
    var textElement = document.createElement('div');
    textElement.innerText = title;
    textElement.style.color = '#FF0000';
    fragment.appendChild(textElement);
}
//# sourceMappingURL=app.js.map