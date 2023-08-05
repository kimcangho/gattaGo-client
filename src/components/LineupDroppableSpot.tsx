import { useDroppable } from "@dnd-kit/core";
import LineupDraggableSpot from "./LineupDraggableSpot";

interface LineupDroppableSpotProps {
  athlete: any;
  position: number;
  seat: number;
  overId: any;
}

const LineupDroppableSpot = ({
  athlete,
  position,
  seat,
  overId,
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
      className="flex justify-center items-center bg-gray-border rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border relative"
    >
      <h5 className="text-center text-[2rem] midMobile:text-[2.5rem] absolute">
        {position === 0
          ? "D"
          : position === 21
          ? "S"
          : `${position % 2 === 1 ? "L" : "R"}${seat}`}
      </h5>

      {!athlete.isEmpty && (
        <LineupDraggableSpot athlete={athlete} overId={overId} />
      )}
    </div>
  );
};

export default LineupDroppableSpot;
