import { getState } from './store';

const state = getState<StyleState>();
state.cssRules = new Set<string>();

// Create the one and only stylesheet for this application.
const style = document.createElement('style');
document.head.appendChild(style);

export function addCssClass(name: string, declaration: CSSStyleDeclarationOptional) {
  addCssRule(`.${name} { ${convertCSSStyleDeclarationToText(declaration)} }`);
}

export function addCssRule(rule: string): void {
  if (!rule || state.cssRules.has(rule)) {
    return;
  }
  state.cssRules.add(rule);

  // Modern browsers use 'Constructable Stylesheets' to prevent flash of un-styled content, when attaching stylesheet to the head of the document.
  const sheet = new CSSStyleSheet() as any;
  if (typeof sheet.replaceSync === 'function') {
    sheet.replaceSync(rule);
    const modernDocument = document as any;
    modernDocument.adoptedStyleSheets = [...modernDocument.adoptedStyleSheets, sheet];
    return;
  }

  // Old browsers use insertRule:
  const styleSheet = style.sheet as CSSStyleSheet;
  styleSheet.insertRule(rule);
}

export function addCssTag(name: string, declaration: CSSStyleDeclarationOptional) {
  addCssRule(`${name} { ${convertCSSStyleDeclarationToText(declaration)} }`);
}

export function convertCSSStyleDeclarationToText(declaration: CSSStyleDeclarationOptional): string {
  // To let developers call this function with an object notation as declaration,
  // we have to convert the declaration to a real CSSStyleDeclaration,
  // in order to convert it correctly to a string.
  const element = document.createElement('div');

  for (const prop in declaration) {
    if (declaration.hasOwnProperty(prop)) {
      element.style[prop as any] = (declaration as any)[prop];
    }
  }

  return element.style.cssText;
}

export interface StyleState {
  cssRules: Set<string>;
}

interface CSSStyleDeclarationOptional extends Partial<CSSStyleDeclaration> {}
