import rosterIcon from "../assets/icons/roster.svg";
import chevronIconRight from "../assets/icons/chevron-right.svg";
import chevronIconLeft from "../assets/icons/chevron-left.svg";

interface LineupModalButtonProps {
  isModalOpen: boolean;
  isLineupActive: boolean;
  handleToggleModal: any;
}

const LineupModalButton = ({
  isModalOpen,
  isLineupActive,
  handleToggleModal,
}: LineupModalButtonProps) => {
  return (
    <div
      className={`p-2 fixed bottom-[8.25%] ${
        isModalOpen ? "right-0" : "left-0"
      }  border border-black rounded-r-lg ${
        !isLineupActive
          ? `bg-gray-border cursor-not-allowed opacity-50`
          : `bg-blue-wavy ${
              isModalOpen ? "hover:bg-orange-light" : "hover:bg-green-light"
            } cursor-pointer`
      }`}
      onClick={handleToggleModal}
    >
      {!isModalOpen && (
        <img src={rosterIcon} alt="Roster Icon" className="w-8 inline" />
      )}
      <img
        src={isModalOpen ? chevronIconLeft : chevronIconRight}
        alt={`Chevron ${isModalOpen ? chevronIconLeft : chevronIconRight}`}
        className="w-4 h-8 inline"
      />
    </div>
  );
};

export default LineupModalButton;
