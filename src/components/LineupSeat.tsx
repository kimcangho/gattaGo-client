import LineupSpotFilled from "./LineupSpotFilled";
import LineupSpotEmpty from "./LineupSpotEmpty";
// import TestSpotFilled from "./TestSpotFilled";

interface LineupSeatProps {
  seat: number;
  row?: any[];
}

const LineupSeat = ({ seat, row }: LineupSeatProps) => {
  return (
    <div className="flex mx-auto w-fit">
      {/* Handle filled seats */}
      {row &&
        row.map(({ athlete, position }: any) => {
          return athlete.isEmpty ? (
            <LineupSpotEmpty
              key={athlete.id}
              seat={seat}
              position={position}
              athlete={athlete}
            />
          ) : (
            <LineupSpotFilled
              key={athlete.id}
              position={position}
              seat={seat}
              athlete={athlete}
            />
          );
        })}
    </div>
  );
};

export default LineupSeat;
