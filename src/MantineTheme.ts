import { MantineThemeOverride, ButtonStylesParams } from "@mantine/core";

const primaryColor = "rgb(255, 97, 84)";

const MantineTheme: MantineThemeOverride = {
  primaryShade: 5,
  cursorType: "pointer",
  other: {
    primaryColor,
  },
  components: {
    Loader: {
      defaultProps: {
        color: "dark",
      },
    },
    Button: {
      defaultProps: {
        loaderPosition: "center",
      },
    },
    Avatar: {
      defaultProps: {
        children: "?!",
        color: "violet",
      },
    },
    Popover: {
      defaultProps: {
        transitionProps: {
          transition: "pop",
          duration: 200,
        },
      },
    },
    TooltipFloating: {
      styles: (theme) => ({
        tooltip: {
          background: theme.black,
          color: theme.white,
          boxShadow: theme.shadows.md,
        },
      }),
    },
    Tooltip: {
      defaultProps: {
        transitionProps: {
          transition: "pop",
          duration: 200,
        },
      },
      styles: (theme) => ({
        tooltip: {
          background: theme.black,
          color: theme.white,
          boxShadow: theme.shadows.md,
        },
      }),
    },
  },
  globalStyles: (theme) => ({
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
    html: {
      scrollBehavior: "smooth",
    },
    "::selection": {
      background: primaryColor,
      color: theme.white,
    },
    body: {
      lineHeight: theme.lineHeight,
      minHeight: "100vh",
      wordBreak: "break-word",
      overflowY: "auto",
      overflowX: "hidden",
      letterSpacing: "-.01em",
      WebkitFontSmoothing: "antialiased",
    },
  }),
};

export default MantineTheme;
