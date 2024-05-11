import { JSX, render } from 'preact';
import { identity } from 'lodash-es';

export function renderApp(reactElement: JSX.Element, customDom: (dom: HTMLDivElement) => void = identity) {
  const app = document.createElement('div');
  app.id = '__extension-app';

  render(reactElement, app);

  customDom(app);

  document.body.appendChild(app);
}
