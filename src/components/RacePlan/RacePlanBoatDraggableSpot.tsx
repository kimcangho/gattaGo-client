import userIcon from "../../assets/icons/user-filled.svg";

interface RacePlanBoatDraggableSpotProps {
  athlete: any;
  isWomenIneligible: boolean;
  isPaddleSideIneligible: boolean;
}

const RacePlanBoatDraggableSpot = ({
  athlete,
  isWomenIneligible,
  isPaddleSideIneligible,
}: RacePlanBoatDraggableSpotProps) => {
  return (
    <>
      <div
        className={`flex relative justify-center items-center rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border text-black z-30  ${
          athlete.isAvailable ? "bg-blue-wavy " : "bg-red-light"
        }`}
      >
        <div
          className={`bg-gray-border ${
            isPaddleSideIneligible ? "bg-red-dark" : "bg-gray-border"
          } w-4 h-4 absolute top-1 left-1 flex items-center justify-center rounded-full`}
        >
          <p>{athlete.paddleSide === "N/A" ? "N" : athlete.paddleSide}</p>
        </div>
        <div
          className={` w-4 h-4 absolute top-1 right-1 flex items-center justify-center rounded-full ${
            isWomenIneligible ? "bg-red-dark" : "bg-green-light"
          }`}
        >
          <p>{athlete.eligibility}</p>
        </div>
        <div className="w-fit h-fit px-2 absolute top-1 flex items-center justify-center text-xs">
          <p>
            {athlete.firstName?.charAt(0)}
            {athlete.lastName?.charAt(0)}
          </p>
        </div>
        <img
          src={userIcon}
          alt="User Avatar Placeholder"
          className="h-6 midMobile:h-10"
        />
        <div className="bg-orange-light w-fit h-fit px-2 absolute bottom-0.5 flex items-center justify-center rounded-full text-xs">
          <p>{athlete.weight}</p>
        </div>
      </div>
    </>
  );
};

export default RacePlanBoatDraggableSpot;
