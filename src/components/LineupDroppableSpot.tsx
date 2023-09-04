import { Active, Over, useDroppable } from "@dnd-kit/core";
import LineupDraggableSpot from "./LineupDraggableSpot";
import { AthleteData } from "../interfaces/EntityData";

interface LineupDroppableSpotProps {
  athlete: AthleteData;
  position: number;
  seat: number;
  activeId: Active | string | number;
  overId: Over | string | number;
  isSaving: boolean;
  isDeleting: boolean;
  isFetching: boolean;
  isWomenIneligible: boolean;
}

const LineupDroppableSpot = ({
  athlete,
  position,
  seat,
  overId,
  activeId,
  isSaving,
  isDeleting,
  isFetching,
  isWomenIneligible,
}: LineupDroppableSpotProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: athlete.id,
  });

  const style = {
    backgroundColor: isOver ? "#7fc243" : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex justify-center items-center bg-gray-border rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border relative z-10"
    >
      <h5 className="text-center text-[2rem] midMobile:text-[2.5rem] absolute">
        {position === 0
          ? "D"
          : position === 21
          ? "S"
          : `${position % 2 === 1 ? "L" : "R"}${seat}`}
      </h5>

      {!athlete.isEmpty && (
        <LineupDraggableSpot
          athlete={athlete}
          overId={overId}
          activeId={activeId}
          isSaving={isSaving}
          isDeleting={isDeleting}
          isFetching={isFetching}
          isWomenIneligible={isWomenIneligible}
          isPaddleSideIneligible={
            (athlete.paddleSide === "L" && position % 2 === 0) ||
            (athlete.paddleSide === "R" && position % 2 === 1) ||
            (athlete.paddleSide === "N" && position !== 0 && position !== 21)
              ? true
              : false
          }
        />
      )}
    </div>
  );
};

export default LineupDroppableSpot;
