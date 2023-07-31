import { useDraggable } from "@dnd-kit/core";

interface LineupSpotFilledProps {
  position: number;
  seat: number;
  athlete: any;
}

const LineupSpotFilled = ({
  position,
  seat,
  athlete,
}: LineupSpotFilledProps) => {
  //  useDraggable hook - each filled seat is a draggable element
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: athlete.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // console.log(athlete.id, position);
  return (
    //  Drummer and Steers
    seat === 0 || seat === 11 ? (
      <div className="my-2 border rounded-xl bg-gray-border">
        <div
          style={style}
          {...listeners}
          {...attributes}
          ref={setNodeRef}
          className="flex flex-col justify-center items-center bg-blue-wavy text-black  w-16 midMobile:w-20 h-16 midMobile:h-20 rounded-xl mx-auto relative cursor-grab"
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
      </div>
    ) : (
      // Paddlers - seats 1 to 10
      // <div className="border rounded-xl bg-gray-border">
        <div
          className={`${
            position % 2 ? "mx-auto border-r pr-2" : "mx-auto border-l pl-2"
          }  ${seat === 5 && "border-b"} ${
            seat === 6 && "border-t"
          } py-2 border-gray-border`}
        >
          <div
            style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            className="flex relative justify-center items-center bg-blue-wavy rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border text-black cursor-grab"
          >
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
      // </div>
    )
  );
};

export default LineupSpotFilled;
