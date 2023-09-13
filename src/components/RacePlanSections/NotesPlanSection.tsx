interface NotesPlanSectionProps {
  section: string;
}

const NotesPlanSection = ({ section }: NotesPlanSectionProps) => {
  return <div>{section}</div>;
};

export default NotesPlanSection;
