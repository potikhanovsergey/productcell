import { useMantineTheme, Anchor } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

const ProductHuntExternalLink = () => {
  const theme = useMantineTheme();
  return (
    <Anchor
      href="https://producthunt.com"
      target="_blank"
      c={theme.other.primaryColor}
      sx={{ display: "flex", alignItems: "center", gap: 4 }}
    >
      <IconExternalLink /> Product Hunt
    </Anchor>
  );
};

export default ProductHuntExternalLink;
