import verticalDragIcon from "../assets/icons/vert-drag.svg";
import deleteIcon from "../assets/icons/delete.svg";
import deleteFilledIcon from "../assets/icons/delete-entity.svg";
import { useState } from "react";

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
    <div className="flex items-center justify-between px-2 border border-black my-1 rounded-md hover:bg-gray-border">
      <img src={verticalDragIcon} alt="Delete" className="h-4 cursor-grab" />
      <h2 className="text-lg">{section}</h2>
      <img
        src={isDeleteHovering ? deleteFilledIcon : deleteIcon}
        alt="Delete"
        className="h-4 cursor-pointer"
        onClick={handleDeleteOrderItem}
        onMouseEnter={handleHoverDelete}
        onMouseLeave={handleHoverDelete}
      />
    </div>
  );
};

export default RaceOrderItem;
