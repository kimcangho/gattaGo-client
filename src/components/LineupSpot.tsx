import { AthleteData } from "../interfaces/EntityData";
import LineupDroppableSpot from "./LineupDroppableSpot";
import { Active, Over } from "@dnd-kit/core";

interface LineupSpotProps {
  seat: number;
  position: number;
  athlete: AthleteData;
  overId: Over | string | number;
  activeId: Active | string | number;
  isSaving: boolean;
  isDeleting: boolean;
  isFetching: boolean;
}

const LineupSpot = ({
  seat,
  position,
  athlete,
  overId,
  activeId,
  isSaving,
  isDeleting,
  isFetching
}: LineupSpotProps) => {
  return (
    <div
      className={`py-2 mx-auto border-gray-border
        ${
          position > 0 && position < 21 && position % 2 === 0
            ? "border-l pl-2"
            : ""
        }
        ${
          position > 0 && position < 21 && position % 2 === 1
            ? "border-r pr-2"
            : ""
        }
        ${seat === 5 ? "border-b" : ""}
        ${seat === 6 ? "border-t" : ""}
      `}
    >
      <LineupDroppableSpot
        seat={seat}
        position={position}
        athlete={athlete}
        overId={overId}
        activeId={activeId}
        isSaving={isSaving}
        isDeleting={isDeleting}
        isFetching={isFetching}
      />
    </div>
  );
};

export default LineupSpot;
