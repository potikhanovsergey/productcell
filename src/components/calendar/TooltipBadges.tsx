import { hoveredProduct } from "@/store/LegendStore";
import { observer } from "@legendapp/state/react";
import { Badge } from "@mantine/core";

const TooltipBadges = () => {
  const product = hoveredProduct.get();
  return (
    <>
      {product.topics.nodes.map((topic) => (
        <Badge
          color="orange"
          variant="outline"
          key={topic.name}
          size="xs"
          sx={{ fontSize: 8 }}
        >
          {topic.name}
        </Badge>
      ))}
    </>
  );
};

export default observer(TooltipBadges);
