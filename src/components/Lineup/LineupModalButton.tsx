import { useEffect } from "react";
import { Active } from "@dnd-kit/core";
import { motion } from "framer-motion";
import rosterIcon from "../../assets/icons/roster.svg";
import chevronIconRight from "../../assets/icons/chevron-right.svg";
import chevronIconLeft from "../../assets/icons/chevron-left.svg";

interface LineupModalButtonProps {
  width: number | undefined;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  handleToggleModal: React.MouseEventHandler<HTMLDivElement> | undefined;
  activeId: Active | string | number;
  isSaving: boolean;
  isDeleting: boolean;
  isFetching: boolean;
}

const LineupModalButton = ({
  width,
  isModalOpen,
  setIsModalOpen,
  handleToggleModal,
  activeId,
  isSaving,
  isDeleting,
  isFetching,
}: LineupModalButtonProps) => {
  useEffect(() => {
    if (width! >= 768) {
      setIsModalOpen(false);
    }
  }, [width]);

  return (
    <>
      {((width! < 768 && !activeId) ||
        (width! < 768 && activeId && !isModalOpen)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`z-50 ${
            (isModalOpen && activeId) || width! >= 768 ? "opacity-0" : ""
          } p-2 fixed bottom-[8.25%] cursor-pointer shadow-xl ${
            isModalOpen ? "right-0" : "left-0"
          } rounded-r-lg ${`bg-blue-wavy ${
            isSaving || isDeleting || isFetching
              ? "cursor-wait"
              : isModalOpen
              ? "hover:bg-orange-light"
              : "hover:bg-green-light"
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
        </motion.div>
      )}
    </>
  );
};

export default LineupModalButton;
