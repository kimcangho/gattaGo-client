import LineupDroppableSpot from "./LineupDroppableSpot";

interface LineupSpotProps {
  seat: number;
  position: number;
  athlete: any;
}

const LineupSpot = ({ seat, position, athlete }: LineupSpotProps) => {
  console.log(athlete);
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
      <LineupDroppableSpot seat={seat} position={position} athlete={athlete} />
    </div>
  );
};

export default LineupSpot;
