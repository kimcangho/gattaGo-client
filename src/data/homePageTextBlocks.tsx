interface TextBlock {
  heading: string;
  body: string;
  imageURL: string;
  altText: string;
  backgroundColor: string;
}

export const homePageTextBlocks: TextBlock[] = [
  {
    heading: "Track your teams",
    body: "Setup your dragonboat teams and access high-level overviews via dashboard.",
    imageURL: "/src/assets/icons/dashboard-chart.svg",
    altText: "Dashboard",
    backgroundColor: "green-light",
  },
  {
    heading: "Manage your roster",
    body: "Populate and sift through team paddlers by skills, roles, traits, and more!",
    imageURL: "/src/assets/icons/roster.svg",
    altText: "Roster",
    backgroundColor: "orange-light",
  },
  {
    heading: "Prepare your lineups",
    body: "Drag and drop to add, remove and swap paddlers in and out of boat lineups.",
    imageURL: "/src/assets/icons/lineups.svg",
    altText: "Lineup",
    backgroundColor: "blue-wavy",
  },
  {
    heading: "Build your race plans",
    body: "Craft race plans by selecting from an array of sections, then export them to share with your crew.",
    imageURL: "/src/assets/icons/calendar.svg",
    altText: "Race Plan",
    backgroundColor: "red-light",
  },
];
