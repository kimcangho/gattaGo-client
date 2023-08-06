import { useEffect } from "react";
import rosterIcon from "../assets/icons/roster.svg";
import chevronIconRight from "../assets/icons/chevron-right.svg";
import chevronIconLeft from "../assets/icons/chevron-left.svg";

interface LineupModalButtonProps {
  width: number | undefined;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  handleToggleModal: any;
  activeId: any;
}

const LineupModalButton = ({
  width,
  isModalOpen,
  setIsModalOpen,
  handleToggleModal,
  activeId,
}: LineupModalButtonProps) => {
  useEffect(() => {
    if (width! >= 768) {
      setIsModalOpen(false);
    }
  }, [width]);

  return (
    <>
      {((width! < 768 && !isModalOpen) ||
        isModalOpen ||
        activeId ||
        (activeId && !isModalOpen)) && (
        <div
          className={`${
            isModalOpen && activeId ? "opacity-0" : ""
          } p-2 fixed bottom-[8.25%] cursor-pointer shadow-xl ${
            isModalOpen ? "right-0" : "left-0"
          } rounded-r-lg ${`bg-blue-wavy ${
            isModalOpen ? "hover:bg-orange-light" : "hover:bg-green-light"
          }`}`}
          onClick={handleToggleModal}
        >
          {!isModalOpen && (
            <img src={rosterIcon} alt="Roster Icon" className="w-8 inline" />
          )}
          <img
            src={isModalOpen ? chevronIconLeft : chevronIconRight}
            alt={`Chevron ${isModalOpen ? chevronIconLeft : chevronIconRight}`}
            className="w-2 h-8 inline"
          />
        </div>
      )}
    </>
  );
};

export default LineupModalButton;
