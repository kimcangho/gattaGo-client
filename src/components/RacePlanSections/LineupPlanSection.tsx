interface LineupPlanSectionProps {
  section: string;
}

const LineupPlanSection = ({ section }: LineupPlanSectionProps) => {
  return <div>{section}</div>;
};

export default LineupPlanSection;
