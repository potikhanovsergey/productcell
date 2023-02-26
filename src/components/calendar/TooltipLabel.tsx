import TooltipSkeleton from "./TooltipSkeleton";
import TooltipWrapper from "./TooltipWrapper";
import { observer } from "@legendapp/state/react";
import { hoveredProduct } from "@/store/LegendStore";
import { Show } from "@legendapp/state/react";
import TooltipBody from "./TooltipBody";

const TooltipLabel = () => {
  const product = hoveredProduct.get();
  return (
    <TooltipWrapper>
      <Show if={product} else={<TooltipSkeleton />}>
        <TooltipBody />
      </Show>
    </TooltipWrapper>
  );
};

export default observer(TooltipLabel);
