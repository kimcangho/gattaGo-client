import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PlanOrderData,
  RegattaSectionData,
  MapSectionData,
  EventSectionData,
  LineupSectionData,
  NotesSectionData,
} from "../../interfaces/RacePlanData";
import verticalDragIcon from "../../assets/icons/vert-drag.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import deleteFilledIcon from "../../assets/icons/delete-entity.svg";

interface RaceOrderItemProps {
  id: string;
  section: string;
  planOrder: PlanOrderData[];
  setPlanOrder: React.Dispatch<React.SetStateAction<PlanOrderData[]>>;
  setRegattaSectionArr: Function;
  setMapSectionArr: Function;
  setEventSectionArr: Function;
  setLineupSectionArr: Function;
  setNotesSectionArr: Function;
}

const RaceOrderItem = ({
  id,
  section,
  planOrder,
  setPlanOrder,
  setRegattaSectionArr,
  setMapSectionArr,
  setEventSectionArr,
  setLineupSectionArr,
  setNotesSectionArr,
}: RaceOrderItemProps) => {
  const [isDeleteHovering, setIsDeleteHovering] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteOrderItem = async () => {
    const foundSectionType = planOrder.find((plan: PlanOrderData) => {
      return plan.id === id;
    });

    setPlanOrder((prevOrder) =>
      prevOrder.filter((item) => {
        return item.id !== id;
      })
    );

    switch (foundSectionType?.section) {
      case "Regatta":
        setRegattaSectionArr((prevArr: RegattaSectionData[]) => {
          return prevArr.filter((item: RegattaSectionData) => {
            return item.id !== id;
          });
        });
        break;

      case "Map":
        setMapSectionArr((prevArr: MapSectionData[]) => {
          return prevArr.filter((item: MapSectionData) => {
            return item.id !== id;
          });
        });
        break;

      case "Event":
        setEventSectionArr((prevArr: EventSectionData[]) => {
          return prevArr.filter((item: EventSectionData) => {
            return item.id !== id;
          });
        });
        break;

      case "Lineup":
        setLineupSectionArr((prevArr: LineupSectionData[]) => {
          return prevArr.filter((item: LineupSectionData) => {
            return item.id !== id;
          });
        });
        break;

      case "Notes":
        setNotesSectionArr((prevArr: NotesSectionData[]) => {
          return prevArr.filter((item: NotesSectionData) => {
            return item.id !== id;
          });
        });
        break;

      default:
        break;
    }
  };

  const handleHoverDelete = () => {
    setIsDeleteHovering((prev) => !prev);
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="flex items-center justify-between px-1 py-1 border border-black my-2 rounded-md hover:bg-gray-border"
    >
      <img
        src={verticalDragIcon}
        alt="Delete"
        {...attributes}
        {...listeners}
        className="h-6 cursor-grab"
      />
      <h2 className="text-lg">{section}</h2>
      <img
        src={isDeleteHovering ? deleteFilledIcon : deleteIcon}
        alt="Delete"
        className="h-6 cursor-pointer"
        onClick={handleDeleteOrderItem}
        onMouseEnter={handleHoverDelete}
        onMouseLeave={handleHoverDelete}
      />
    </div>
  );
};

export default RaceOrderItem;
