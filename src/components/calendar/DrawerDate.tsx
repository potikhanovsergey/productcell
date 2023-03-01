import { Text } from "@mantine/core";
import { Show, observer } from "@legendapp/state/react";
import { drawerDetails } from "@/store/LegendStore";

const DrawerDate = () => {
  const details = drawerDetails.get();

  return (
    <Show if={details.date}>
      {() => (
        <Text color="dimmed" mb="sm">
          {details.date!.format("DD MMMM YYYY")}
        </Text>
      )}
    </Show>
  );
};

export default observer(DrawerDate);
