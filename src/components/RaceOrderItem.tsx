import verticalDragIcon from "../assets/icons/vert-drag.svg";
import deleteIcon from "../assets/icons/delete.svg";
import deleteFilledIcon from "../assets/icons/delete-entity.svg";
import { useState } from "react";

//  dnd-kit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PlanOrderData {
  id: string;
  section: string;
}

interface RaceOrderItemProps {
  id: string;
  section: string;
  setPlanOrder: React.Dispatch<React.SetStateAction<PlanOrderData[]>>;
}

const RaceOrderItem = ({ id, section, setPlanOrder }: RaceOrderItemProps) => {
  const [isDeleteHovering, setIsDeleteHovering] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteOrderItem = () => {
    setPlanOrder((prevOrder) =>
      prevOrder.filter((item) => {
        return item.id !== id;
      })
    );
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
