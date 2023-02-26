import {
  createStyles,
  UnstyledButton,
  UnstyledButtonProps,
  getStylesRef,
} from "@mantine/core";
import { FC, ForwardedRef, forwardRef } from "react";

import { ProductHuntApiResponse } from "@/store/types";
import {
  drawerOpened,
  hoveredRow,
  hoveredRowCell,
  productsHash,
} from "@/store/LegendStore";
import { observer } from "@legendapp/state/react";
import { batch } from "@legendapp/state";
import dayjs from "dayjs";
import { fetchProductAndSet } from "./Calendar";

const useStyles = createStyles(
  (theme, { product }: { product: ProductHuntApiResponse }) => ({
    box: {
      padding: 2,
      backgroundClip: "content-box",
      "&:hover, &:focus": {
        backgroundColor: !product ? theme.colors.orange[5] : undefined,
        outline: "none",
      },
      ref: getStylesRef("box"),
      aspectRatio: "1",
      backgroundColor: !!product ? "transparent" : theme.colors.gray[3],
      backgroundImage: product
        ? `url(${product.thumbnail.url}&width=100)`
        : undefined,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundOrigin: "content-box",
      position: "relative",
    },
  })
);

interface DayProps extends UnstyledButtonProps {
  cellIndex: number;
  rowIndex: number;
}

const Cell: FC<DayProps> = forwardRef(
  ({ cellIndex, rowIndex, ...props }, ref: ForwardedRef<HTMLButtonElement>) => {
    const onMouseEnter = () => {
      batch(() => {
        hoveredRowCell.set(cellIndex);
        hoveredRow.set(rowIndex);
      });
    };
    const onMouseLeave = () => {
      hoveredRowCell.set(null);
    };

    const onClick = () => {
      const index = `${rowIndex} ${cellIndex}`;
      if (productsHash.get()[index]) {
        batch(() => {
          drawerOpened.set(true);
        });
      } else {
        const date = dayjs()
          .startOf("month")
          .subtract(rowIndex, "month")
          .add(cellIndex, "day");
        fetchProductAndSet({
          index: `${rowIndex} ${cellIndex}`,
          date,
        });
      }
    };
    const index = `${rowIndex} ${cellIndex}`;
    const product = productsHash.get()[index];
    const { classes } = useStyles({ product });

    return (
      <UnstyledButton
        data-index={`${rowIndex} ${cellIndex}`}
        ref={ref}
        className={classes.box}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        {...props}
      />
    );
    {
      /* <Box className={classes.box} /> */
    }
    {
      /* </UnstyledButton> */
    }
    // );
  }
);

Cell.displayName = "Cell";

export default observer(Cell);
