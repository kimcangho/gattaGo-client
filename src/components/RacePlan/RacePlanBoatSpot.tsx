import RacePlanBoatDroppableSpot from "./RacePlanBoatDroppableSpot";

interface RacePlanBoatSpotProps {
  seat: number;
  position: number;
  athlete: any;
  isWomenIneligible: boolean;
}

const RacePlanBoatSpot = ({
  seat,
  position,
  athlete,
  isWomenIneligible
}: RacePlanBoatSpotProps) => {
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
      <RacePlanBoatDroppableSpot
        seat={seat}
        position={position}
        athlete={athlete}
        isWomenIneligible={isWomenIneligible}
      />
    </div>
  );
};

export default RacePlanBoatSpot;
