import {
  createStyles,
  UnstyledButton,
  UnstyledButtonProps,
  getStylesRef,
  useMantineTheme,
} from "@mantine/core";
import { FC, ForwardedRef, forwardRef } from "react";

import { ProductHuntApiResponse } from "@/store/types";
import {
  drawerDetails,
  filterBy,
  hoveredRow,
  hoveredRowCell,
  mode,
  productsHash,
} from "@/store/LegendStore";
import { observer, useComputed } from "@legendapp/state/react";
import { batch } from "@legendapp/state";
import { getDateByIndexes } from "@/helpers";
import { fetchProductAndSet } from "@/queries/getProduct";

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
      backgroundColor: !!product
        ? "transparent"
        : theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],
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
      const products = productsHash[filterBy.get()][mode.get()][index].get();
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
    const product = productsHash[filterBy.get()][mode.get()][index].get()?.[0];
    const { classes } = useStyles({ product });

    const ariaLabel = useComputed(() =>
      getDateByIndexes({ rowIndex, cellIndex }).format("MMMM D, YYYY")
    );

    return (
      <UnstyledButton
        data-index={`${rowIndex} ${cellIndex}`}
        ref={ref}
        aria-label={ariaLabel}
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
