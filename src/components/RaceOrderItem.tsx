import verticalDragIcon from "../assets/icons/vert-drag.svg";
import deleteIcon from "../assets/icons/delete.svg";

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
  const handleDeleteOrderItem = () => {
    setPlanOrder((prevOrder) =>
      prevOrder.filter((item) => {
        return item.id !== id;
      })
    );
  };
  return (
    <div className="flex items-center justify-between px-2 border border-black my-1 rounded-md hover:bg-gray-border">
      <img src={verticalDragIcon} alt="Delete" className="h-4 cursor-grab" />
      <h2 className="text-lg">{section}</h2>
      <img
        src={deleteIcon}
        alt="Delete"
        className="h-4 cursor-pointer"
        onClick={handleDeleteOrderItem}
      />
    </div>
  );
};

export default RaceOrderItem;
