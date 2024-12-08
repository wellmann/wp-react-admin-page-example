import { useRef } from '@wordpress/element';
import { ExternalLink } from '@wordpress/components';
import { __ } from "@wordpress/i18n";

interface Props {
  targetElem: HTMLElement;
}

const FooterLeft = ({ targetElem }: Props) => {
  const targetRef = useRef(targetElem);
  const isMounted = useRef(false);

  if (!isMounted.current) {
    targetRef.current.innerHTML = '';
    isMounted.current = true;
  }

  return (
    <span id="footer-thankyou">
      { __('Created with <3 using', 'wp-react-admin-page-example') + ' ' }
      <ExternalLink href="https://wordpress.github.io/gutenberg/">@wordpress/components</ExternalLink>
    </span>
  );
};

export default FooterLeft;