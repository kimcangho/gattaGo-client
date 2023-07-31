// import { useDroppable } from "@dnd-kit/core";

interface LineupSpotFilledProps {
  position: number;
  seat: number;
  athlete: any;
}

const LineupSpotFilled = ({ position, seat, athlete }: LineupSpotFilledProps) => {
  //  useDroppable hook - each position should be a droppable area
  // const { isOver, setNodeRef } = useDroppable({ id: athlete.id });
  console.log(athlete.id, position);
  return (
    //  Drummer and Steers
    seat === 0 || seat === 11 ? (
      <div
        //  target DOM node with ref={setNodeRef}
        className="flex flex-col justify-center items-center bg-blue-wavy text-black my-2 w-16 midMobile:w-20 h-16 midMobile:h-20 rounded-xl mx-auto relative cursor-grab"
      >
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
      // Paddlers - seats 1 to 10
      <div
        //  target DOM node with ref={setNodeRef}
        className={`${
          position % 2 ? "mx-auto border-r pr-2" : "mx-auto border-l pl-2"
        }  ${seat === 5 && "border-b"} ${
          seat === 6 && "border-t"
        } py-2 border-gray-border`}
      >
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
      </div>
    )
  );
};

export default LineupSpotFilled;
