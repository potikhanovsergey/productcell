import {
  createStyles,
  UnstyledButton,
  UnstyledButtonProps,
  getStylesRef,
} from "@mantine/core";
import { FC, ForwardedRef, forwardRef } from "react";

import { ProductHuntApiResponse } from "@/store/types";
import {
  drawerDetails,
  hoveredRow,
  hoveredRowCell,
  productsHash,
} from "@/store/LegendStore";
import { observer } from "@legendapp/state/react";
import { batch } from "@legendapp/state";
import dayjs from "dayjs";
import { fetchProductAndSet } from "./Calendar";
import { getDateByIndexes } from "@/helpers";

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
      const products = productsHash.get()[index];
      const date = getDateByIndexes({ rowIndex, cellIndex });
      if (products) {
        batch(() => {
          drawerDetails.opened.set(true);
          drawerDetails.set({
            opened: true,
            products,
            date,
          });
        });
      } else {
        fetchProductAndSet({
          index: `${rowIndex} ${cellIndex}`,
          date,
        });
      }
    };
    const index = `${rowIndex} ${cellIndex}`;
    const product = productsHash.get()[index]?.[0];
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
  }
);

Cell.displayName = "Cell";

export default observer(Cell);
