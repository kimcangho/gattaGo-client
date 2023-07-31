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
      {row &&
        row.map(({ athlete, position }: any) => {
          return athlete.isEmpty ? (
            <LineupSpotEmpty seat={seat} position={position} athlete={athlete}/>
          ) : (
            <LineupSpotFilled
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
