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
import style from "./App.module.scss";

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
      <button className="page-title-action">Action</button>
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
            title: 'Tab 1',
            component: TabOne
          },
          {
            name: 'tab-2',
            title: 'Tab 2',
            component: TabTwo
          },
          {
            name: 'tab-3',
            title: 'Tab 3',
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
      <h2>Heading</h2>
      <Card>
        <CardBody>
          <TextControl
            help="Help text to explain the input."
            label="Label Text"
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
            { "Save" }
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