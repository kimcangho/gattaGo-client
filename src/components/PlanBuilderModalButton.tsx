import { useEffect } from "react";
import buildPlanIcon from "../assets/icons/build-plan.svg";
import chevronIconRight from "../assets/icons/chevron-right.svg";
import chevronIconLeft from "../assets/icons/chevron-left.svg";
import { motion } from "framer-motion";

interface PlanBuilderModalButtonProps {
  width: number | undefined;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  handleToggleModal: React.MouseEventHandler<HTMLDivElement> | undefined;
  //   isSaving: boolean;
  //   isDeleting: boolean;
  //   isFetching: boolean;
}

const PlanBuilderModalButton = ({
  width,
  isModalOpen,
  setIsModalOpen,
  handleToggleModal,
}: //   isSaving,
//   isDeleting,
//   isFetching,
PlanBuilderModalButtonProps) => {
  useEffect(() => {
    if (width! >= 768) {
      setIsModalOpen(false);
    }
  }, [width]);

  return (
    <>
      {(width! < 768 || (width! < 768 && !isModalOpen)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`z-50 ${
            isModalOpen || width! >= 768 ? "opacity-0" : ""
          } p-2 fixed bottom-[8.25%] cursor-pointer shadow-xl ${
            isModalOpen ? "right-0" : "left-0"
          } rounded-r-lg ${`bg-blue-wavy ${
            isModalOpen ? "hover:bg-orange-light" : "hover:bg-green-light"
          }`}`}
          onClick={handleToggleModal}
        >
          {!isModalOpen && (
            <img src={buildPlanIcon} alt="Roster Icon" className="w-8 inline" />
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

export default PlanBuilderModalButton;
