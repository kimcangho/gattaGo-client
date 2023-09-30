import { useContext } from "react";
import AuthContext, { AuthContextTypes } from "../../contexts/AuthContext";
import RacePlanBoatSpot from "./RacePlanBoatSpot";

interface RacePlanBoatSeatProps {
  seat: number;
  row?: any;
}

const RacePlanBoatSeat = ({ seat, row }: RacePlanBoatSeatProps) => {
  const { currentTeamDetails }: AuthContextTypes = useContext(AuthContext)!;
  return (
    <div className="flex mx-auto w-fit">
      {row?.map(({ athlete, position }: any) => {
        return (
          <RacePlanBoatSpot
            key={athlete.id}
            seat={seat}
            position={position}
            athlete={athlete}
            isWomenIneligible={
              currentTeamDetails.eligibility === "Women" &&
              athlete.eligibility !== "W"
                ? true
                : false
            }
          />
        );
      })}
    </div>
  );
};

export default RacePlanBoatSeat;
