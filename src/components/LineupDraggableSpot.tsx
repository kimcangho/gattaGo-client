import { useDraggable } from "@dnd-kit/core";

interface LineupDraggableSpotProps {
  athlete: any;
}

const LineupDraggableSpot = ({ athlete }: LineupDraggableSpotProps) => {
  //  useDraggable hook - each filled seat is a draggable element
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: athlete.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: "#1a6baf",
      }
    : undefined;

  // console.log(athlete.id, position);
  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className="flex relative justify-center items-center bg-blue-wavy rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border text-black cursor-grab z-10"
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
