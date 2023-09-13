interface LineupPlanSectionProps {
  section: string;
  id: string;
}

const LineupPlanSection = ({ section }: LineupPlanSectionProps) => {
  return <div>{section}</div>;
};

export default LineupPlanSection;
