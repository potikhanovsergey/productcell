import { Badge, BadgeProps, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  badge: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    color: theme.colors.gray[5],
    cursor: "pointer",
    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors[theme.primaryColor][5]
          : theme.colors[theme.primaryColor][1],
      color:
        theme.colorScheme === "dark"
          ? theme.white
          : theme.colors[theme.primaryColor][5],
    },
  },
}));

const BadgeLink = (props: BadgeProps & { href: string }) => {
  const { classes } = useStyles();
  return (
    <Badge target="_blank" className={classes.badge} component="a" {...props} />
  );
};

export default BadgeLink;
