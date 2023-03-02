import { hoveredRowCell } from "@/store/LegendStore";
import { createStyles, Box, keyframes, Center, Tooltip } from "@mantine/core";


export const pulseOrange = keyframes({
  "0%": {
    transform: "scale(0.9)",
    boxShadow: "0 0 0 0 rgba(255, 121, 63, 0.7)",
  },
  "70%": {
    transform: "scale(1)",
    boxShadow: "0 0 0 6px rgba(255, 121, 63, 0)",
  },
  "100%": {
    transform: "scale(0.9)",
    boxShadow: "0 0 0 0 rgba(255, 121, 63, 0)",
  },
});

const useStyles = createStyles((theme) => ({
  circle: {
    borderRadius: 1000,
    width: "40%",
    aspectRatio: "1/1",
    transform: "scale(1)",
    animation: `${pulseOrange} 2s infinite`,
    background: theme.colors.orange[5],
  },
}));

const PulsatingCircle = () => {
  const { classes } = useStyles();
  return (
    <Tooltip label="To be discovered today, click to vote">
      <Center
        component="a"
        target="_blank"
        href="https://producthunt.com"
        h="100%"
      >
        <Box className={classes.circle} />
      </Center>
    </Tooltip>
  );
};

export default PulsatingCircle;
