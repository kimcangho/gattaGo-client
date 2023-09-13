interface EventPlanSectionProps {
  section: string;
}

const EventPlanSection = ({ section }: EventPlanSectionProps) => {
  return <div>{section}</div>;
};

export default EventPlanSection;
