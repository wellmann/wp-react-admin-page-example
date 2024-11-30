import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Notice,
  Snackbar,
  Spinner,
  TabPanel,
  TextControl,
  __experimentalGrid as Grid,
  __experimentalSpacer as Spacer
} from '@wordpress/components';
import { useEffect, useState } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import style from "./App.module.css";

interface AppProps {
  title: string
}

const App = ({ title }: AppProps) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [tab, setTab] = useSearchParams('tab', 'tab-1');

  return (
    <>
      <h1 className="wp-heading-inline">{ title }</h1>
      <button className="page-title-action">{ __('Action', 'wp-react-page-admin-example') }</button>
      <hr className="wp-header-end" />
      <Spacer marginY={ 3 } />
      { error && <>
        <Notice
        status="error"
        onRemove={ () => setError(null) }
        >{ error }</Notice>
        <Spacer marginY={ 6 } />
      </>
      }
      <TabPanel
        activeClass="is-active"
        onSelect={ setTab }
        initialTabName={ tab }
        tabs={ [
          {
            name: 'tab-1',
            title: __('Tab 1', 'wp-react-page-admin-example'),
            component: TabOne
          },
          {
            name: 'tab-2',
            title: __('Tab 2', 'wp-react-page-admin-example'),
            component: TabTwo
          },
          {
            name: 'tab-3',
            title: __('Tab 3', 'wp-react-page-admin-example'),
            component: TabThree
          },
        ] }
      >
        { ({ component: TabComponent }: { component: React.FunctionComponent }) => <>
          <Spacer marginY={ 9 } />
          <TabComponent />
        </> }
      </TabPanel>
      { success && <Snackbar
        onRemove={ () => setSuccess(null) }
        className={ style.snackbar }
      >
        { success }
      </Snackbar> }
    </>
  );
}

const TabOne = () => {
  return (
    <Grid
      columns={ 3 }
      gap={ 10 }
      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    >
      <Box />
      <Box />
      <Box />
    </Grid>
  );
}

const TabTwo = () => {
  return (
    <Grid columns={ 1 }>
      <Box />
    </Grid>
  );
}

const TabThree = () => {
  return (
    <Grid
      columns={ 2 }
      gap={ 10 }
      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    >
      <Box />
      <Box />
    </Grid>
  );
}

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

const useSearchParams = (param: string, defaultValue: string) => {
  const { pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);
  const [value, setValue] = useState(urlParams.get(param) || defaultValue);

  useEffect(() => {
    urlParams.set(param, value);
    window.history.replaceState({}, '', pathname + '?' + urlParams.toString());
  }, [value]);

  return [value, setValue] as const;
};

export default App;