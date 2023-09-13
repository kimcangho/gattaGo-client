interface EventPlanSectionProps {
  section: string;
  id: string;
}

const EventPlanSection = ({ section }: EventPlanSectionProps) => {
  return <div>{section}</div>;
};

export default EventPlanSection;
