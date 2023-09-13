interface NotesPlanSectionProps {
  section: string;
  id: string;
}

const NotesPlanSection = ({ section }: NotesPlanSectionProps) => {
  return <div>{section}</div>;
};

export default NotesPlanSection;
