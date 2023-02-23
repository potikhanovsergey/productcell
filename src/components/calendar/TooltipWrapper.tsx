import { ReactNode } from "react";
import { Stack } from "@mantine/core";

const TooltipWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Stack spacing={4} pt={4}>
      {children}
    </Stack>
  );
};

export default TooltipWrapper;
