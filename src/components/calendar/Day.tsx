import { AppStore } from "@/store/AppStore";
import {
  Box,
  createStyles,
  UnstyledButton,
  UnstyledButtonProps,
  getStylesRef,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC, ForwardedRef, forwardRef, useCallback } from "react";

import Image from "next/image";

const useStyles = createStyles(
  (theme, { discovered }: { discovered: boolean }) => ({
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
      background: discovered ? theme.colors.orange[5] : theme.colors.gray[3],
      borderRadius: theme.radius.xs,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
  })
);

interface DayProps extends UnstyledButtonProps {
  index: number;
  url: string;
  dayIndex: number;
  rowIndex: number;
}

const Day: FC<DayProps> = forwardRef(
  (
    { index, dayIndex, rowIndex, url, ...props },
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const onMouseEnter = useCallback(() => {
      AppStore.setHoveredRowCell(dayIndex);
    }, [dayIndex]);

    const onMouseLeave = useCallback(() => {
      AppStore.setHoveredRowCell(null);
    }, []);

    const product = AppStore.productsHash[`${rowIndex} ${dayIndex}`];
    const { classes } = useStyles({ discovered: !!product });

    return (
      <UnstyledButton
        component="a"
        href={product?.url}
        target="_blank"
        ref={ref}
        className={classes.hitbox}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        <Box className={classes.box}>
          <Box display={product ? undefined : "none"}>
            <Image
              alt={product ? `${product.url} preview` : ""}
              fill
              src={product ? `${product?.thumbnail?.url}&width=100` : "/"}
            />
          </Box>
        </Box>
      </UnstyledButton>
    );
  }
);

Day.displayName = "Day";

export default observer(Day);
