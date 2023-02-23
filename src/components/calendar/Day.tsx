import { AppStore } from "@/store/AppStore";
import {
  Box,
  createStyles,
  UnstyledButton,
  Text,
  UnstyledButtonProps,
  getStylesRef,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC, ForwardedRef, forwardRef, memo, useCallback } from "react";

const useStyles = createStyles((theme) => ({
  hitbox: {
    padding: 2,
    "&:hover": {
      [`& .${getStylesRef("box")}`]: {
        background: theme.colors.orange[5],
      },
    },
  },
  box: {
    ref: getStylesRef("box"),
    aspectRatio: "1",
    background: theme.colors.gray[3],
    borderRadius: theme.radius.xs,
  },
}));

interface DayProps extends UnstyledButtonProps {
  index: number;
  url: string;
  dayIndex: number;
}

const Day: FC<DayProps> = forwardRef(
  (
    { index, dayIndex, url, ...props },
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const { classes } = useStyles();
    const onMouseEnter = useCallback(() => {
      AppStore.setHoveredRowCell(dayIndex);
    }, [dayIndex]);

    const onMouseLeave = useCallback(() => {
      AppStore.setHoveredRowCell(null);
    }, []);
    return (
      <UnstyledButton
        component="a"
        href={url}
        target="_blank"
        ref={ref}
        className={classes.hitbox}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        <Box className={classes.box} />
      </UnstyledButton>
    );
  }
);

Day.displayName = "Day";

export default memo(Day);
