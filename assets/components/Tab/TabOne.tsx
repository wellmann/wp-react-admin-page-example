import { __ } from "@wordpress/i18n";
import { __experimentalGrid as Grid, Card, CardBody } from "@wordpress/components";
import Box from "../Box";

const TabOne = () => {
  return (
    <>
      <div>
        <h2>{__('Heading', 'wp-react-page-admin-example')}</h2>
        <Card>
          <CardBody>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
          </CardBody>
        </Card>
      </div>
      <Grid
        columns={2}
        gap={10}
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      >
        <Box/>
        <Box/>
      </Grid>
    </>
  );
};

export default TabOne;