import { useDraggable, Active, Over } from "@dnd-kit/core";
import { AthleteData } from "../interfaces/EntityData";
import userIcon from "../assets/icons/user-filled.svg";

interface LineupDraggableSpotProps {
  athlete: AthleteData;
  activeId: Active | string | number;
  overId: Over | string | number;
  isSaving: boolean;
  isDeleting: boolean;
  isFetching: boolean;
  isWomenIneligible: boolean;
  isPaddleSideIneligible: boolean;
}

const LineupDraggableSpot = ({
  athlete,
  overId,
  activeId,
  isSaving,
  isDeleting,
  isFetching,
  isWomenIneligible,
  isPaddleSideIneligible,
}: LineupDraggableSpotProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: athlete.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <>
      {activeId !== athlete.id && (
        <div
          {...listeners}
          {...attributes}
          ref={setNodeRef}
          style={style}
          className={`flex relative justify-center items-center rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border text-black 
          ${
            isSaving || isDeleting || isFetching ? "cursor-wait" : "cursor-grab"
          }
           z-30
      ${
        athlete.id === overId
          ? "bg-green-light"
          : athlete.isAvailable
          ? `bg-blue-wavy ${
              isSaving || isDeleting || isFetching ? "" : "hover:bg-blue-dark"
            }`
          : `bg-red-light ${
              isSaving || isDeleting || isFetching ? "" : "hover:bg-red-dark"
            }`
      } `}
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
      )}
    </>
  );
};

export default LineupDraggableSpot;
