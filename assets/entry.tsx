import { createRoot } from '@wordpress/element';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('root');
  if (!appRoot) {
    return;
  }

  const root = createRoot(appRoot);
  root.render(<App title={ appRoot?.dataset?.title || '' } />);
});