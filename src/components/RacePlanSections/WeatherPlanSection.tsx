interface WeatherPlanSectionProps {
  section: string;
}

const WeatherPlanSection = ({ section }: WeatherPlanSectionProps) => {
  return <div>{section}</div>;
};

export default WeatherPlanSection;
