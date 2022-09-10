import { render } from '@wordpress/element';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('root');
  if (!appRoot) {
    return;
  }

  render(<App title={ appRoot.dataset.title } />, appRoot);
});