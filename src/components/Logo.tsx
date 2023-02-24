import { Box, BoxProps } from "@mantine/core";

const Logo = (props: BoxProps) => {
  return (
    <Box
      viewBox="0 0 72 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      component="svg"
      {...props}
    >
      <path
        d="M0.254883 68H32.2549V92C32.2549 96.4183 28.6732 100 24.2549 100H8.25488C3.8366 100 0.254883 96.4183 0.254883 92L0.254883 68Z"
        fill="#FF5454"
      />
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0L32 0L32 24C32 28.4183 28.4183 32 24 32L0 32L0 8Z"
        fill="#FF5454"
      />
      <path
        d="M34 0L40 0C57.6731 0 72 14.3269 72 32V32L42 32C37.5817 32 34 28.4183 34 24V0Z"
        fill="#FF5454"
      />
      <path
        d="M0.254883 34H24.2549C28.6732 34 32.2549 37.5817 32.2549 42V66H0.254883L0.254883 34Z"
        fill="#FF5454"
      />
      <path
        d="M34 42C34 37.5817 37.5817 34 42 34L72 34V34C72 51.6731 57.6731 66 40 66H34V42Z"
        fill="#FF5454"
      />
    </Box>
  );
};

export default Logo;
