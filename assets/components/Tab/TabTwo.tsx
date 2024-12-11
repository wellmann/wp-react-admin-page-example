import { __experimentalGrid as Grid } from '@wordpress/components';
import Box from '../Box';

const TabTwo = () => {
  return (
    <Grid
      columns={3}
      gap={10}
      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    >
      <Box />
      <Box />
      <Box />
    </Grid>
  );
};

export default TabTwo;
