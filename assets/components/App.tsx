import {
  ExternalLink,
  Flex,
  Notice,
  Snackbar,
  TabPanel,
  __experimentalGrid as Grid,
  __experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import style from './App.module.css';
import Icon from '../images/icon.svg';
import useSearchParams from '../hooks/useSearchParams';
import TabOne from './Tab/TabOne';
import TabTwo from './Tab/TabTwo';
import TabThree from './Tab/TabThree';

const App = ({ title }: { title: string }) => {
  const [showAnnouncement, setShowAnnouncement] = useState<boolean | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tab, setTab] = useSearchParams('tab', 'tab-1');

  useEffect(() => {
    setShowAnnouncement(true);
    setError(
      __('This is an example error message.', 'wp-react-admin-page-example')
    );
    setSuccess(__('Example success', 'wp-react-admin-page-example'));
  }, []);

  return (
    <>
      <TopBar title={title} />
      <Spacer marginY={12} />
      <Grid columns={1} gap={12} className={style.inner}>
        {showAnnouncement && (
          <Notice
            status="info"
            onRemove={() => setShowAnnouncement(null)}
            actions={[
              {
                label: __('Click me!', 'wp-react-admin-page-example'),
                onClick: () => setShowAnnouncement(null),
              },
              {
                label: __(
                  'Or visit a link for more info',
                  'wp-react-admin-page-example'
                ),
                url: 'https://wordpress.org',
                variant: 'link',
              },
            ]}
          >
            <h2>{__('Announcement banner', 'wp-react-admin-page-example')}</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
          </Notice>
        )}
        <TabPanel
          activeClass="is-active"
          onSelect={setTab}
          initialTabName={tab}
          className={style.mainNav}
          tabs={[
            {
              name: 'tab-1',
              title: __('Tab 1', 'wp-react-admin-page-example'),
              component: TabOne,
            },
            {
              name: 'tab-2',
              title: __('Tab 2', 'wp-react-admin-page-example'),
              component: TabTwo,
            },
            {
              name: 'tab-3',
              title: __('Tab 3', 'wp-react-admin-page-example'),
              component: TabThree,
            },
          ]}
        >
          {(tab) => {
            const TabComponent = tab.component;
            return (
              <>
                <Spacer marginY={12} />
                <Grid columns={1} gap={12}>
                  {error && (
                    <Notice status="error" onRemove={() => setError(null)}>
                      {error}
                    </Notice>
                  )}
                  <TabComponent />
                </Grid>
              </>
            );
          }}
        </TabPanel>
        <Spacer marginY={12} />
      </Grid>
      {success && (
        <Snackbar onRemove={() => setSuccess(null)} className={style.snackbar}>
          {success}
        </Snackbar>
      )}
    </>
  );
};

const TopBar = ({ title }: { title: string }) => {
  return (
    <Flex gap={1} className={style.topBar}>
      <Flex justify="start" gap={1}>
        <Icon aria-hidden="true" focusable="false" />
        <h1>{title}</h1>
      </Flex>
      <ExternalLink href="https://google.com">
        {__('Help', 'wp-react-admin-page-example')}
      </ExternalLink>
    </Flex>
  );
};

export default App;
