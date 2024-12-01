import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Card, CardBody, CardFooter, Spinner, TextControl } from "@wordpress/components";

const Box = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <h2>{ __('Heading', 'wp-react-page-admin-example') }</h2>
      <Card>
        <CardBody>
          <TextControl
            help={ __('Help text to explain the input.', 'wp-react-page-admin-example') }
            label={ __('Label Text', 'wp-react-page-admin-example') }
            onChange={ setInputValue }
            value={ inputValue }
          />
        </CardBody>
        <CardFooter justify="flex-end">
          { isProcessing && <Spinner /> }
          <Button
            variant="primary"
            onClick={ () => setIsProcessing(true) }
          >
            { __('Save', 'wp-react-page-admin-example') }
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Box;