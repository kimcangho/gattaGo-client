interface RegattaPlanSectionProps {
  section: string;
}

const RegattaPlanSection = ({ section }: RegattaPlanSectionProps) => {
  return <div>{section}</div>;
};

export default RegattaPlanSection;
