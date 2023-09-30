import { useEffect, useState } from "react";
import { NotesSectionData } from "../../interfaces/RacePlanData";

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

  useEffect(() => {
    handleSetNotesSection();
  }, [notesName, notesBody]);

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
    <div className="flex flex-col bg-white shadow-md rounded-md p-2">
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
        <div className="mx-2 w-full">
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
