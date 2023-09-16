interface LineupPlanSectionProps {
  id: string;
  section: string;
  setLineupSectionArr: Function;
}

const LineupPlanSection = ({
  id,
  section,
  setLineupSectionArr,
}: LineupPlanSectionProps) => {
  return <div>{section}</div>;
};

export default LineupPlanSection;
