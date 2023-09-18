import { useState } from "react";

//  Notes section not displaying notes name nor body!

interface NotesSectionData {
  id: string;
  notesName: string;
  notesBody: string;
}

interface NotesPlanSectionProps {
  id: string;
  notesSection?: NotesSectionData;
  setNotesSectionArr: Function;
}

const NotesPlanSection = ({
  id,
  notesSection,
  setNotesSectionArr,
}: NotesPlanSectionProps) => {
  const [notesName, setNotesName] = useState<string>(
    notesSection?.notesName || ""
  );
  const [notesBody, setNotesBody] = useState<string>(
    notesSection?.notesBody || ""
  );

  const handleSetNotesSection = () => {
    setNotesSectionArr((currentArr: NotesSectionData[]) => {
      const filteredArr = currentArr.filter(
        (notesSection: NotesSectionData) => notesSection.id !== id
      );
      return [
        ...filteredArr,
        {
          id,
          notesName,
          notesBody,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col border border-black rounded-md p-2">
      <input
        placeholder="Type notes title here"
        value={notesName}
        onChange={(event) => {
          setNotesName(event.target.value);
          handleSetNotesSection();
        }}
        className={`bg-inherit text-2xl p-2 ${notesName ? "text-black" : ""}`}
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
              value={notesBody}
              onChange={(event) => {
                setNotesBody(event.target.value);
                handleSetNotesSection();
              }}
              className={`bg-inherit p-2 w-full ${
                notesBody ? "text-black" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPlanSection;
