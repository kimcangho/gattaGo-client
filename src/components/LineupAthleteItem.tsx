import { AthleteData } from "../interfaces/EntityData";
import { convertPaddlerSkillToField } from "../utils/convertPaddlerSkillToField";
import dragRightIcon from "../assets/icons/drag-right.svg";
import dragLeftIcon from "../assets/icons/drag-left.svg";
import { useDraggable } from "@dnd-kit/core";

interface LineupAthleteItemProps {
  athleteId: string;
  athlete: AthleteData;
  width: number | undefined;
}

const LineupAthleteItem = ({
  athlete,
  athleteId,
  width,
}: LineupAthleteItemProps) => {
  //  useDraggable hook - each rosterAthleteItem image should be a draggable area
  // console.log(athlete, athleteId)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: athlete.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: "#1a6baf",
        zIndex: 20,
      }
    : undefined;

  return (
    <article
      id={athleteId}
      className={`flex justify-between p-2 border border-gray-border max-w-full ${
        !athlete.isAvailable && "bg-red-light"
      }`}
    >
      <div
        className={`flex items-center tablet:space-x-2 max-w-[calc(100%-3.5rem)] tablet:max-w-full text-black font-bold `}
      >
        {width! >= 768 && (
          <img
            src={dragLeftIcon}
            alt={"Drag Athlete Left"}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            // style={style}
            className={`flex justify-center items-center w-12 h-12 p-2 border border-gray-border rounded-lg cursor-grab ${
              athlete.isAvailable ? "hover:bg-blue-wavy" : "hover:bg-red-dark"
            } `}
          />
        )}
        <div className="flex-col">
          <h3 className="text-blue-light truncate max-w-full">
            {athlete?.firstName} {athlete?.lastName}
          </h3>
          <div className="flex space-x-2 items-center">
            <p className="inline-block bg-gray-border px-2 rounded-3xl my-2 text-center h-fit">
              {athlete.paddleSide}
            </p>
            <p className="inline-block bg-green-light px-2 rounded-3xl text-center h-fit">
              {athlete.eligibility}
            </p>
            <p className="inline-block bg-orange-light px-2 rounded-3xl text-center h-fit">
              {athlete.weight}
            </p>
          </div>
        </div>

        {width! >= 448 && (
          <div className="flex justify-start items-center overflow-auto">
            {athlete.paddlerSkills &&
              //  @ts-ignore
              Object.entries(athlete.paddlerSkills[0])
                .filter(([key, value]) => {
                  return value && key !== "id" && key !== "athleteId";
                })
                .map(([key], index) => {
                  return (
                    <p
                      key={index}
                      className="font-normal inline-block bg-blue-wavy px-2 py-1 rounded-3xl mx-2 text-center break-keep"
                    >
                      {convertPaddlerSkillToField(key, 2)}
                    </p>
                  );
                })}
          </div>
        )}
      </div>

      <div className="flex text-black font-bold items-center">
        {width! < 768 && (
          <div
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            style={style}
            className={`flex justify-center items-center w-12 h-12 p-2 border rounded-lg border-gray-border cursor-grab ${
              athlete.isAvailable ? "hover:bg-blue-wavy " : "hover:bg-red-dark"
            } `}
          >
            <img
              src={dragRightIcon}
              alt={"Drag Athlete Right"}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default LineupAthleteItem;
