import { useDraggable } from "@dnd-kit/core";

interface LineupDraggableSpotProps {
  athlete: any;
  overId: any;
}

const LineupDraggableSpot = ({ athlete, overId }: LineupDraggableSpotProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: athlete.id,
  });

  console.log(transform)

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: athlete.isAvailable ? "#1a6baf" : "#c55a5a",
        zIndex: 20,
      }
    : undefined;

  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className={`flex relative justify-center items-center 
      ${
        athlete.id === overId
          ? "bg-green-light"
          : athlete.isAvailable
          ? "bg-blue-wavy"
          : "bg-red-light"
      } 
      rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border text-black cursor-grab z-15 
      
      `}
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
  );
};

export default LineupDraggableSpot;
