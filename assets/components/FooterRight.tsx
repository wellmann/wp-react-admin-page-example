import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

interface Props {
  targetElem: HTMLElement;
}

declare var __BUILD_TIMESTAMP__: Date;

const FooterRight = ({ targetElem }: Props) => {
  const targetRef = useRef(targetElem);
  const isMounted = useRef(false);

  if (!isMounted.current) {
    targetRef.current.innerHTML = '';
    isMounted.current = true;
  }

  return (
    <>
      {__('App version', 'wp-react-admin-page-example') + ': '}
      {__BUILD_TIMESTAMP__}
    </>
  );
};

export default FooterRight;
