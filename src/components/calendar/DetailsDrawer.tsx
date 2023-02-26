import { drawerOpened } from "@/store/LegendStore";
import { observer } from "@legendapp/state/react";
import { Drawer, Title } from "@mantine/core";

const DetailsDrawer = () => {
  return (
    <Drawer
      opened={drawerOpened.get()}
      onClose={() => drawerOpened.set(false)}
      title={<Title order={2}>Winner details</Title>}
      padding="xl"
      size="md"
      position="right"
    >
      Will be soon...
    </Drawer>
  );
};

export default observer(DetailsDrawer);
