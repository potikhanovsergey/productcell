import { Text } from "@mantine/core";
import { Show, observer } from "@legendapp/state/react";
import { drawerDetails } from "@/store/LegendStore";

const DrawerDate = () => {
  return (
    <Show if={drawerDetails}>
      {() => (
        <Text color="dimmed" mb="sm">
          {drawerDetails.date.get()!.format("DD MMMM YYYY, dddd")}
        </Text>
      )}
    </Show>
  );
};

export default observer(DrawerDate);
