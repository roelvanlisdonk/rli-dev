import { getState } from '../store/store';

const state = getState<StyleState>();
state.cssRules = new Set<string>();

const style = document.createElement('style');
document.head.appendChild(style);

export function addRule(rule: string): void {
  if (!rule || state.cssRules.has(rule)) {
    return;
  }
  state.cssRules.add(rule);

  // Modern browsers use 'Constructable Stylesheets' to prevent flash of un-styled content, when attaching stylesheet to the head of the document.
  const sheet = new CSSStyleSheet() as any;
  if (typeof sheet.replaceSync === 'function') {
    console.log('inside modern browser');
    sheet.replaceSync(rule);
    const modernDocument = document as any;
    modernDocument.adoptedStyleSheets = [...modernDocument.adoptedStyleSheets, sheet];
    return;
  }

  // Old browsers use insertRule:
  const styleSheet = style.sheet as CSSStyleSheet;
  styleSheet.insertRule(rule);
}

export interface StyleState {
  cssRules: Set<string>;
}
