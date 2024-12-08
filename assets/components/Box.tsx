import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Card, CardBody, CardFooter, DropdownMenu, Flex, Spinner, TextControl } from "@wordpress/components";

const Box = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Flex>
        <h2>{ __('Heading', 'wp-react-admin-page-example') }</h2>
        <DropdownMenu
          icon="ellipsis"
          label={ __('Options', 'wp-react-admin-page-example') }
          controls={[
            {
              title: __('First option', 'wp-react-admin-page-example'),
              icon: 'saved',
              onClick: () => alert(__('First option', 'wp-react-admin-page-example'))
            },
            {
              title: __('Second option', 'wp-react-admin-page-example'),
              onClick: () => alert(__('Second option', 'wp-react-admin-page-example'))
            }
          ]}
        />
      </Flex>
      <Card>
        <CardBody>
          <TextControl
            help={ __('Help text to explain the input.', 'wp-react-admin-page-example') }
            label={ __('Label Text', 'wp-react-admin-page-example') }
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
            { __('Save', 'wp-react-admin-page-example') }
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Box;