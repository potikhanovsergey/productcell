import { observer, Computed, Show } from "@legendapp/state/react";
import {
  Box,
  Container,
  Group,
  rem,
  ScrollArea,
  Text,
  Stack,
} from "@mantine/core";
import CalendarGrid from "./CalendarGrid";
import { StickyContainer, Sticky } from "react-sticky";
import { useState } from "react";
import Arrow from "./Arrow";
import ColumnLabels from "./ColumnLabels";
import RowLabels from "./RowLabels";
import DetailsDrawer from "./DetailsDrawer";
import { mode } from "@/store/LegendStore";
import { months, years } from "@/pages/_app";
import Cell from "./Cell";

const Calendar = () => {
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  return (
    <Container size="md" px={0}>
      <Group>
        <Text>
          <Show if={mode.get() === "days"} else="Weeks">
            Days
          </Show>
        </Text>
        <Arrow />
      </Group>
      <Group noWrap align="flex-start">
      <ScrollArea type="never" onScrollPositionChange={onScrollPositionChange}>
        <StickyContainer>
          <Box
            pos="relative"
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(50px, auto) 1fr",
            }}
          >
            <span />
              <Computed>
                {() => (
                  <Sticky>
                    {({ style, isSticky }) => (
                      <Box
                        style={style}
                        sx={{
                          zIndex: 10,
                          left: `unset !important`,
                          [`@media (max-width: 960px)`]: {
                            left: isSticky
                              ? `calc(50px + -1 * ${rem(
                                  scrollPosition.x
                                )}) !important`
                              : undefined,
                          },
                        }}
                      >
                        <ColumnLabels py={4} />
                      </Box>
                    )}
                  </Sticky>
                )}
              </Computed>

            <RowLabels pr={10} />
            <Group noWrap>
              <CalendarGrid />
            </Group>
          </Box>
        </StickyContainer>
      </ScrollArea>
      <Stack sx={{ flexShrink: 0, userSelect: "none" }} spacing={0}>
        <Text weight="bold" variant="gradient" gradient={{ from: "orange", to: "blue" }}>
          <Show if={mode.get() === "days"} else="Year #1">
            Month #1
          </Show>
        </Text>
        {Object.keys(Array(mode.get() === "days" ? months : years + 1).fill(null)).map(i => <Cell w={25} h={25} key={i} cellIndex={777} rowIndex={+i} />)}
      </Stack>
      </Group>
      <DetailsDrawer />
    </Container>
  );
};

export default observer(Calendar);
