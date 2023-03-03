import { observer, Computed } from "@legendapp/state/react";
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

const Calendar = () => {
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  return (
    <Container size="md" px={0}>
      <ScrollArea type="never" onScrollPositionChange={onScrollPositionChange}>
        <StickyContainer>
          <Box
            pos="relative"
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(50px, auto) 1fr",
            }}
          >
            <Box />
            <Stack>
              <Group>
                <Text>Days</Text>
                <Arrow />
              </Group>
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
            </Stack>

            <RowLabels pr={10} />
            <CalendarGrid />
          </Box>
        </StickyContainer>
      </ScrollArea>
      <DetailsDrawer />
    </Container>
  );
};

export default observer(Calendar);
