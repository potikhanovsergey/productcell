import { Button, ButtonProps, createStyles } from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

const useStyles = createStyles((theme) => ({
  button: {
    background: "#ff6154",
    borderRadius: theme.radius.sm,
    color: theme.white,
    "&:not(:disabled)": {
      "&:hover": {
        background: "#ff6154",
        "&:after": {
          opacity: 1,
        },
      },
      "&:after": {
        content: "''",
        position: "absolute",
        zIndex: 1,
        borderRadius: theme.radius.sm,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(227deg,#ff4582,#ff6154)`,
        opacity: 0,
      },
    },
  },
}));

const PrimaryButton = ({
  className,
  ...props
}: ButtonProps & ComponentPropsWithoutRef<"button">) => {
  const { classes, cx } = useStyles();
  return (
    <Button
      styles={{ inner: { zIndex: 2, position: "relative" } }}
      className={cx(classes.button, className)}
      {...props}
    />
  );
};

export default PrimaryButton;
