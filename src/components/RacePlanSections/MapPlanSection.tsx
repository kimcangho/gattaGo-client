interface MapPlanSectionProps {
  section: string;
  id: string;
}

const MapPlanSection = ({ section }: MapPlanSectionProps) => {
  return <div>{section}</div>;
};

export default MapPlanSection;
