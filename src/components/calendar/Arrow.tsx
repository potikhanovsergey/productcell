import { Box, BoxProps, useMantineTheme } from "@mantine/core";

const Arrow = (props: BoxProps) => {
  const theme = useMantineTheme();
  return (
    <Box
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="120px"
      height="22px"
      viewBox="0 0 120 22"
      version="1.1"
      component="svg"
      {...props}
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="square"
      >
        <g
          id="Group"
          transform="translate(1.000000, 3.000000)"
          stroke={theme.other.primaryColor}
          strokeWidth="3"
        >
          <path d="M0.5,7.5 L115.5,7.5" id="Line" />
          <path d="M108,0 L116.5,7.5" id="Line" />
          <path d="M109,16 L116.5,7.5" id="Line" />
        </g>
      </g>
    </Box>
  );
};

export default Arrow;
