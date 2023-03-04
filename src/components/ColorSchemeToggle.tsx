import {
  useMantineColorScheme,
  ActionIcon,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        variant="transparent"
        size="lg"
        aria-label="Toggle website's color scheme"
      >
        {colorScheme === "dark" ? (
          <IconSun color={theme.white} size="1.2rem" />
        ) : (
          <IconMoonStars color={theme.black} size="1.2rem" />
        )}
      </ActionIcon>
    </Group>
  );
};

export default ColorSchemeToggle;
