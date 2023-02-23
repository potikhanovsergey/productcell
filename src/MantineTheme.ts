import { MantineThemeOverride, ButtonStylesParams } from "@mantine/core";

const primaryColor = "#FF5454";

const MantineTheme: MantineThemeOverride = {
  primaryShade: 5,
  cursorType: "pointer",
  other: {
    primaryColor,
  },
  colors: {
    orange: [
      "#ffeeee",
      "#ffdddd",
      "#ffaaaa",
      "#ff8787",
      "#ff6565",
      "#FF5454", // [5]
      "#e64c4c",
      "#cc4343",
      "#993232",
      "#662222",
    ],
  },
  primaryColor: "orange",
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
    Progress: {
      styles: (theme) => ({
        root: {
          background: theme.colors.dark[5],
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
