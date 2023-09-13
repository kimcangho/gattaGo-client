interface WeatherPlanSectionProps {
  id: string;
  section: string;
}

const WeatherPlanSection = ({ section }: WeatherPlanSectionProps) => {
  return <div>{section}</div>;
};

export default WeatherPlanSection;
