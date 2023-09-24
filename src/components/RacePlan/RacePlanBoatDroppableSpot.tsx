import RacePlanBoatDraggableSpot from "./RacePlanBoatDraggableSpot";

interface RacePlanBoatDroppableSpotProps {
  seat: number;
  position: number;
  athlete: any;
  isWomenIneligible: boolean;
}

const RacePlanBoatDroppableSpot = ({
  seat,
  position,
  athlete,
  isWomenIneligible
}: RacePlanBoatDroppableSpotProps) => {
  return (
    <div className="flex justify-center items-center bg-gray-border rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border relative z-10">
      <h5 className="text-center text-[2rem] midMobile:text-[2.5rem] absolute">
        {position === 0
          ? "D"
          : position === 21
          ? "S"
          : `${position % 2 === 1 ? "L" : "R"}${seat}`}
      </h5>

      {!athlete.isEmpty && (
        <RacePlanBoatDraggableSpot
          athlete={athlete}
          isWomenIneligible={isWomenIneligible}
          isPaddleSideIneligible={
            (athlete.paddleSide === "L" && position % 2 === 0) ||
            (athlete.paddleSide === "R" && position % 2 === 1) ||
            (athlete.paddleSide === "N" && position !== 0 && position !== 21)
              ? true
              : false
          }
        />
      )}
    </div>
  );
};

export default RacePlanBoatDroppableSpot;
