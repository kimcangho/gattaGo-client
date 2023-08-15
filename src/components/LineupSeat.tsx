import { Active, Over } from "@dnd-kit/core";
import LineupSpot from "./LineupSpot";
import { ActiveLineupData } from "../interfaces/EntityData";

interface LineupSeatProps {
  seat: number;
  row?: ActiveLineupData[];
  overId: Over | string | number;
  activeId: Active | string | number;
  isSaving: boolean;
  isDeleting: boolean;
  isFetching: boolean;
}

const LineupSeat = ({ seat, row, overId, activeId, isSaving, isDeleting, isFetching }: LineupSeatProps) => {
  return (
    <div className="flex mx-auto w-fit">
      {row?.map(({ athlete, position }: ActiveLineupData) => {
        return (
          <LineupSpot
            key={athlete.id}
            seat={seat}
            position={position}
            athlete={athlete}
            overId={overId}
            activeId={activeId}
            isSaving={isSaving}
            isDeleting={isDeleting}
            isFetching={isFetching}
          />
        );
      })}
    </div>
  );
};

export default LineupSeat;
