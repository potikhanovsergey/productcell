import { Badge, BadgeProps, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  badge: {
    background: theme.colors.gray[1],
    color: theme.colors.gray[5],
    cursor: "pointer",
    "&:hover": {
      background: theme.colors[theme.primaryColor][1],
      color: theme.colors[theme.primaryColor][5],
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
