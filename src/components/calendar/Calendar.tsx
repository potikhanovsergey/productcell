import { getProduct } from "@/queries/getProduct";
import { loadingHash, productsHash } from "@/store/LegendStore";
import { observer } from "@legendapp/state/react";
import {
  Box,
  Container,
  Group,
  rem,
  ScrollArea,
  Text,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { Dayjs } from "dayjs";
import CalendarGrid from "./CalendarGrid";
import { StickyContainer, Sticky } from "react-sticky";
import { useState } from "react";
import Arrow from "./Arrow";
import ColumnLabels from "./ColumnLabels";
import RowLabels from "./RowLabels";
import DetailsDrawer from "./DetailsDrawer";


const Calendar = () => {
  const theme = useMantineTheme();
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
              <Sticky>
                {({ style, isSticky }) => (
                  <Box
                    style={style}
                    sx={{
                      background: theme.white,
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
                    <ColumnLabels mb={4} />
                  </Box>
                )}
              </Sticky>
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
