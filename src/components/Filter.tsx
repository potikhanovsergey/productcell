import { filterBy } from "@/store/LegendStore";
import { observer } from "@legendapp/state/react";
import { Select } from "@mantine/core";

const items = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Productivity",
    value: "productivity",
  },
  {
    label: "Artificial Intelligence",
    value: "artificial-intelligence",
  },
  {
    label: "SaaS",
    value: "saas",
  },
  {
    label: "Developer Tools",
    value: "developer-tools",
  },
  {
    label: "Marketing",
    value: "marketing",
  },
  {
    label: "Analytics",
    value: "analytics",
  },
  {
    label: "Books",
    value: "books",
  },
  {
    label: "Web Design",
    value: "web-design",
  },
  {
    label: "Web App",
    value: "web-app",
  },
  {
    label: "Bots",
    value: "bots",
  },
  {
    label: "Games",
    value: "games",
  },
  {
    label: "Mac",
    value: "mac",
  },
  {
    label: "Health & Fitness",
    value: "health-fitness",
  },
  {
    label: "Education",
    value: "education",
  },
  {
    label: "API",
    value: "api-1",
  },
  {
    label: "Writing",
    value: "writing",
  },
  {
    label: "Notion",
    value: "notion",
  },
  {
    label: "Chrome Extensions",
    value: "chrome-extensions",
  },
  {
    label: "Social Network",
    value: "social-network",
  },
  {
    label: "Travel",
    value: "travel",
  },
  {
    label: "E-Commerce",
    value: "e-commerce",
  },
  {
    label: "SEO",
    value: "seo",
  },
  {
    label: "Calendar",
    value: "calendar",
  },
  {
    label: "Freelance",
    value: "freelance",
  },
  {
    label: "Fintech",
    value: "fintech",
  },
  {
    label: "Art",
    value: "art",
  },
  {
    label: "Crowdfunding",
    value: "crowdfunding",
  },
  {
    label: "Search",
    value: "search",
  },
  {
    label: "Career",
    value: "career",
  },
  {
    label: "Fashion",
    value: "fashion",
  },
  {
    label: "Android",
    value: "android",
  },
  {
    label: "User Experience",
    value: "user-experience",
  },
  {
    label: "Design Tools",
    value: "design-tools",
  },
];

const Filter = () => {
  const onChange = (value: string) => {
    filterBy.set(value);
  };
  return (
    <Select
      searchable
      withinPortal
      value={filterBy.get()}
      onChange={onChange}
      label="Filter by topic"
      data={items}
      size="xs"
    />
  );
};

export default observer(Filter);
