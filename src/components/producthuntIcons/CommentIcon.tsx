import { Box, BoxProps } from "@mantine/core";

const CommentIcon = (props: BoxProps) => {
  return (
    <Box
      component="svg"
      viewBox="0 0 13 13"
      xmlns="http://www.w3.org/2000/svg"
      w={12}
      h={18}
      {...props}
    >
      <path
        d="M6.5.75c-3.31 0-6 2.362-6 5.267 0 2.905 2.69 5.266 6 5.266a6.8 6.8 0 0 0 1.036-.08l2.725 1.486a.5.5 0 0 0 .74-.44V9.46a4.893 4.893 0 0 0 1.5-3.443C12.5 3.112 9.81.75 6.5.75z"
        fill="currentColor"
        fill-rule="nonzero"
      ></path>
    </Box>
  );
};

export default CommentIcon;
