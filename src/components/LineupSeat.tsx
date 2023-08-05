import LineupSpot from "./LineupSpot";

interface LineupSeatProps {
  seat: number;
  row?: any[];
  overId: any;
}

const LineupSeat = ({ seat, row, overId }: LineupSeatProps) => {
  return (
    <div className="flex mx-auto w-fit">
      {row?.map(({ athlete, position }: any) => {
        return (
          <LineupSpot
            key={athlete.id}
            seat={seat}
            position={position}
            athlete={athlete}
            overId={overId}
          />
        );
      })}
    </div>
  );
};

export default LineupSeat;
