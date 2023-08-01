import LineupSpot from "./LineupSpot";

interface LineupSeatProps {
  seat: number;
  row?: any[];
}

const LineupSeat = ({ seat, row }: LineupSeatProps) => {
  return (
    <div className="flex mx-auto w-fit">
      {row?.map(({ athlete, position }: any) => {
        return (
          <LineupSpot
            key={athlete.id}
            seat={seat}
            position={position}
            athlete={athlete}
          />
        );
      })}
    </div>
  );
};

export default LineupSeat;
