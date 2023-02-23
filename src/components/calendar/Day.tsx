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
import { ProductHuntApiResponse } from "@/store/types";

const useStyles = createStyles(
  (theme, { product }: { product: ProductHuntApiResponse }) => ({
    hitbox: {
      padding: 2,
      "&:hover": {
        [`& .${getStylesRef("box")}`]: {
          backgroundColor: theme.colors.orange[5],
        },
      },
    },
    box: {
      ref: getStylesRef("box"),
      aspectRatio: "1",
      backgroundColor: !!product
        ? theme.colors.orange[5]
        : theme.colors.gray[3],
      backgroundImage: product
        ? `url(${product.thumbnail.url}&width=100)`
        : undefined,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      borderRadius: theme.radius.xs,
      position: "relative",
    },
  })
);

interface DayProps extends UnstyledButtonProps {
  url: string;
  dayIndex: number;
  rowIndex: number;
}

const Day: FC<DayProps> = forwardRef(
  (
    { dayIndex, rowIndex, url, ...props },
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const onMouseEnter = useCallback(() => {
      AppStore.setHoveredRowCell(dayIndex);
    }, [dayIndex]);

    const onMouseLeave = useCallback(() => {
      AppStore.setHoveredRowCell(null);
    }, []);

    const product = AppStore.productsHash[`${rowIndex} ${dayIndex}`];
    const { classes } = useStyles({ product });

    return (
      <UnstyledButton
        data-index={`${rowIndex} ${dayIndex}`}
        component="a"
        href={product?.url}
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

export default observer(Day);
