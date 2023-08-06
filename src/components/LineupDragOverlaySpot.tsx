interface LineupDragOverlaySpotProps {
  athlete: any;
}

const LineupDragOverlaySpot = ({ athlete }: LineupDragOverlaySpotProps) => {
  return (
    athlete && (
      <div
        className={`flex relative justify-center items-center 
      rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border text-black cursor-grab z-10 ${
        athlete.athlete.isAvailable ? "bg-blue-dark" : "bg-red-dark"
      }`}
      >
        <div className="bg-gray-border w-4 h-4 absolute top-1 left-1 flex items-center justify-center rounded-full">
          <p>
            {athlete?.athlete.paddleSide === "N/A"
              ? "N"
              : athlete?.athlete.paddleSide}
          </p>
        </div>
        <div className="bg-green-light w-4 h-4 absolute top-1 right-1 flex items-center justify-center rounded-full">
          <p>{athlete?.athlete.eligibility}</p>
        </div>
        <h5 className="text-center text-[1.5rem] midMobile:text-[2.5rem]">
          {athlete?.athlete.firstName.charAt(0) +
            athlete?.athlete.lastName.charAt(0)}
        </h5>
        <div className="bg-orange-light w-fit h-fit px-2 absolute bottom-0.5 flex items-center justify-center rounded-full text-xs">
          <p>{athlete?.athlete.weight}</p>
        </div>
      </div>
    )
  );
};

export default LineupDragOverlaySpot;
