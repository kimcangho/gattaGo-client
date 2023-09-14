import { useState } from "react";

interface NotesSectionData {
  id: string;
  notes: string;
}

interface NotesPlanSectionProps {
  id: string;
  setNotesSectionArr: Function;
}

const NotesPlanSection = ({
  id,
  setNotesSectionArr,
}: NotesPlanSectionProps) => {
  const [notesTitle, setNotesTitle] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSetNotesSection = () => {
    setNotesSectionArr((currentArr: NotesSectionData[]) => {
      const filteredArr = currentArr.filter(
        (notesSection: NotesSectionData) => notesSection.id !== id
      );
      return [
        ...filteredArr,
        {
          id,
          notes,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col border border-black rounded-md p-2">
      <input
        placeholder="Type notes title here"
        onChange={(event) => {
          setNotesTitle(event.target.value);
          handleSetNotesSection();
        }}
        className={`bg-inherit text-2xl p-2 ${notesTitle ? "text-black" : ""}`}
      />
      <div className="flex flex-col tablet:flex-row">
        {/* Notes */}
        <div className="mx-2 w-full">
          {/* Notes */}
          <div className="flex flex-col my-2">
            <textarea
              rows={4}
              placeholder="Type notes here"
              name="notes"
              id="notes"
              value={notes}
              onChange={(event) => {
                setNotes(event.target.value);
                handleSetNotesSection();
              }}
              className={`bg-inherit p-2 w-full ${notes ? "text-black" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPlanSection;
