import LineupSpotFilled from "./LineupSpotFilled";
import LineupSpotEmpty from "./LineupSpotEmpty";

interface LineupSeatProps {
  seat: number;
  row?: any[];
}

const LineupSeat = ({ seat, row }: LineupSeatProps) => {
  return (
    <div className="flex mx-auto w-fit">
      {/* Handle filled seats */}
      {row ? (
        row.map(({ athlete, position }: any) => {
          return (
            <LineupSpotFilled
              position={position}
              seat={seat}
              athlete={athlete}
            />
          );
        })
      ) : (
        //  Handle empty seats
        <LineupSpotEmpty seat={seat} />
      )}
    </div>
  );
};

export default LineupSeat;
