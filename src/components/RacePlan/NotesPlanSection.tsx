import { useForm } from "react-hook-form";
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
  const { register, setValue, getValues, watch } = useForm({
    defaultValues: {
      notesName: notesSection?.notesName || "",
      notesBody: notesSection?.notesBody || "",
    },
  });
  const watchNotesName = watch("notesName");
  const watchNotesBody = watch("notesBody");

  const handleSetNotesSection = () => {
    setNotesSectionArr((currentArr: NotesSectionData[]) => {
      const filteredArr = currentArr.filter(
        (notesSection: NotesSectionData) => notesSection.id !== id
      );
      return [
        ...filteredArr,
        {
          id,
          notesName: getValues("notesName"),
          notesBody: getValues("notesBody"),
        },
      ];
    });
  };

  return (
    <form className="flex flex-col bg-white shadow-md rounded-md p-2">
      <input
        {...register("notesName")}
        placeholder="Type notes title here"
        onChange={(event) => {
          event.preventDefault();
          setValue("notesName", event.target.value);
          handleSetNotesSection();
        }}
        className={`bg-inherit text-2xl p-2 ${
          watchNotesName ? "text-black" : ""
        }`}
      />
      <div className="flex flex-col tablet:flex-row">
        <div className="mx-2 w-full">
          <div className="flex flex-col my-2">
            <textarea
              {...register("notesBody")}
              rows={4}
              placeholder="Type notes here"
              name="notes"
              id="notes"
              onChange={(event) => {
                event.preventDefault();
                setValue("notesBody", event.target.value);
                handleSetNotesSection();
              }}
              className={`bg-inherit p-2 w-full ${
                watchNotesBody ? "text-black" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default NotesPlanSection;
