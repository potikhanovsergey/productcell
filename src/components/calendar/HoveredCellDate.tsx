import { hoveredCellDate } from "@/store/LegendStore";
import { observer } from "@legendapp/state/react";
import { Text } from "@mantine/core";

const HoveredCellDate = () => {
  return (
    <Text color="dimmed" size="xs">
      {hoveredCellDate.get()}
    </Text>
  );
};

export default observer(HoveredCellDate);
