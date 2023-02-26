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
        color: "orange",
        size: "xs",
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
    Modal: {
      defaultProps: {
        shadow: "xl",
        centered: true,
        transitionProps: {
          transition: {
            in: { opacity: 1, transform: "translateY(0)" },
            out: { opacity: 0, transform: "translateY(-30px)" },
            common: { transformOrigin: "top" },
            transitionProperty: "transform, opacity",
          },
          duration: 350,
          timingFunction: "cubic-bezier(.4,0,.2,1)",
        },
      },
      styles: (theme) => ({
        header: {
          zIndex: 100,
        },
        title: {
          fontWeight: 600,
        },
        modal: {
          border: "none",
        },
        close: {
          "&:hover": { background: theme.fn.rgba(theme.colors.dark[5], 0.07) },
          color: theme.colors.dark[5],
        },
      }),
    },
    ScrollArea: {
      styles: (theme, params, context) => ({
        scrollbar: {
          zIndex: 101,
        },
      }),
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
        events: {
          touch: true,
          hover: true,
          focus: true,
        },
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
      scrollMarginTop: "-36px",
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
