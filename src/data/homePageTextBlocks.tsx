interface TextBlock {
    heading: string;
    body: string;
    altText: string;
}

export const homePageTextBlocks: TextBlock[] = [
    {
        heading: "Ready, ready!",
        body: "Introducing gattaGo - a coaching tool for managing dragonboat teams, athletes and lineups!",
        altText: "",
    },
    {
        heading: "Setup your teams",
        body: "Setup your dragonboat teams based on level, eligibility, and division.",
        altText: "Team Boat",
    },
    {
        heading: "Manage your roster",
        body: "Populate and sift through team paddlers by skills, roles, traits, and more!",
        altText: "Roster",
    },
    {
        heading: "Prepare your lineups",
        body: "Drag and drop to add, remove and swap paddlers in and out of boat lineups.",
        altText: "Lineup",
    },
]