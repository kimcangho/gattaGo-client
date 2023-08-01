import { useDroppable } from "@dnd-kit/core";

interface LineupDroppableSpotProps {
  athlete: any;
  position: number;
  seat: number;
}

const LineupDroppableSpot = ({
  athlete,
  position,
  seat,
}: LineupDroppableSpotProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: athlete.id,
  });

  const style = {
    backgroundColor: isOver ? "#7fc243" : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex justify-center items-center bg-gray-border rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border relative"
    >
      <h5 className="text-center text-[2rem] midMobile:text-[2.5rem] absolute">
        {position === 0
          ? "D"
          : position === 21
          ? "S"
          : `${position % 2 === 1 ? "L" : "R"}${seat}`}
      </h5>

      {!athlete.isEmpty && (
        <>
          {seat === 0 || seat === 11 ? (
            <div className="flex flex-col justify-center items-center bg-blue-wavy text-black  w-16 midMobile:w-20 h-16 midMobile:h-20 rounded-xl mx-auto cursor-grab">
              <div className="bg-gray-border w-4 h-4 absolute top-1 left-1 flex items-center justify-center rounded-full">
                <p>
                  {athlete.paddleSide && athlete.paddleSide === "N/A"
                    ? "N"
                    : athlete.paddleSide && athlete.paddleSide}
                </p>
              </div>
              <div className="bg-green-light w-4 h-4 absolute top-1 right-1 flex items-center justify-center rounded-full">
                <p>{athlete.eligibility}</p>
              </div>
              <h5 className="text-center text-[1.5rem] midMobile:text-[2.5rem]">
                {athlete.firstName.charAt(0) + athlete.lastName.charAt(0)}
              </h5>
              <div className="bg-orange-light w-fit h-fit px-2 absolute bottom-0.5 flex items-center justify-center rounded-full text-xs">
                <p>{athlete.weight}</p>
              </div>
            </div>
          ) : (
            <div className="flex relative justify-center items-center bg-blue-wavy rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border text-black cursor-grab">
              <div className="bg-gray-border w-4 h-4 absolute top-1 left-1 flex items-center justify-center rounded-full">
                <p>{athlete.paddleSide === "N/A" ? "N" : athlete.paddleSide}</p>
              </div>
              <div className="bg-green-light w-4 h-4 absolute top-1 right-1 flex items-center justify-center rounded-full">
                <p>{athlete.eligibility}</p>
              </div>
              <h5 className="text-center text-[1.5rem] midMobile:text-[2.5rem]">
                {athlete.firstName.charAt(0) + athlete.lastName.charAt(0)}
              </h5>
              <div className="bg-orange-light w-fit h-fit px-2 absolute bottom-0.5 flex items-center justify-center rounded-full text-xs">
                <p>{athlete.weight}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LineupDroppableSpot;
