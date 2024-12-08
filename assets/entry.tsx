import { createPortal, createRoot } from '@wordpress/element';
import App from './components/App';
import FooterLeft from "./components/FooterLeft";
import FooterRight from "./components/FooterRight";

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('root');
  if (!appRoot) {
    return;
  }

  const footerLeft = document.getElementById('footer-left');
  const footerRight = document.getElementById('footer-upgrade');

  const root = createRoot(appRoot);
  root.render(
    <>
      <App title={ appRoot?.dataset?.title || '' } />
      { footerLeft && createPortal(<FooterLeft targetElem={ footerLeft } />, footerLeft) }
      { footerRight && createPortal(<FooterRight targetElem={ footerRight } />, footerRight) }
    </>
  );
});