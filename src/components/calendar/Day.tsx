import {
  Box,
  createStyles,
  UnstyledButton,
  Text,
  UnstyledButtonProps,
} from "@mantine/core";
import { FC, ForwardedRef, forwardRef } from "react";

const useStyles = createStyles((theme) => ({
  day: {
    aspectRatio: "1",
    background: theme.colors.gray[3],
    borderRadius: theme.radius.xs,
    "&:hover": {
      background: theme.colors.gray[5],
    },
  },
}));

interface DayProps extends UnstyledButtonProps {
  index: number;
  url: string;
}

const Day: FC<DayProps> = forwardRef(
  ({ index, url, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { classes } = useStyles();
    return (
      <UnstyledButton
        component="a"
        href={url}
        target="_blank"
        ref={ref}
        className={classes.day}
        {...props}
      />
    );
  }
);

Day.displayName = "Day";

export default Day;
