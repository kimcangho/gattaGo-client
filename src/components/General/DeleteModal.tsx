import { useState } from "react";
import useLogoutRedirect from "../../hooks/useLogoutRedirect";
import useAxiosPrivate from "../../hooks/usePrivateInterceptors";
import useWindowSize from "../../hooks/useWindowSize";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { TeamData } from "../../interfaces/EntityData";
import deleteWhiteIcon from "../../assets/icons/delete-white-fill.svg";
import cancelFilledIcon from "../../assets/icons/cancel-filled.svg";
import checkIcon from "../../assets/icons/check.svg";

interface DeleteModalProps {
  entityName: string;
  entityType: string;
  entityId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  entityArray?: TeamData[];
  setEntityArray?: React.Dispatch<React.SetStateAction<TeamData[]>>;
  handleDeleteAthlete?: Function;
  handleDeleteLineup?: Function;
}

const DeleteModal = ({
  entityName,
  entityType,
  entityId,
  setShowModal,
  entityArray,
  setEntityArray,
  handleDeleteAthlete,
  handleDeleteLineup,
}: DeleteModalProps) => {
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const { width } = useWindowSize();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteEntity = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (isSending) return;

    try {
      setIsSending(true);
      if (entityType === "team")
        await axiosPrivate.delete(`/teams/${entityId}`);
      if (entityType === "athlete" && handleDeleteAthlete)
        await handleDeleteAthlete(entityId);
      if (entityType === "lineup" && handleDeleteLineup)
        await handleDeleteLineup();
      if (entityArray && setEntityArray) {
        const currentEntityArray = entityArray?.filter((entity: TeamData) => {
          return entity.id !== entityId;
        });
        setEntityArray(currentEntityArray);
      }

      setIsDeleteConfirmed(true);
      setIsSending(false);
    } catch (err: unknown) {
      console.log(err);
      logoutRedirect("/login");
    }
  };

  return (
    <div className="top-0 left-0 w-full h-full fixed z-50">
      <div
        className="w-full h-full fixed bg-gray-border opacity-50 z-0"
        onClick={handleCloseModal}
      ></div>

      <div
        className="border border-black rounded-md bg-white fixed max-w-[768px] h-[40%] tablet:h-[30%] left-0 right-0 m-2 mt-[30%] midMobile:my-auto tablet:mx-auto top-0 bottom-0 
      flex flex-col justify-between items-center p-4"
      >
        <h1>
          {isDeleteConfirmed
            ? `${capitalizeFirstLetter(entityType)} Deleted!`
            : `Confirm Delete ${capitalizeFirstLetter(entityType)}`}
        </h1>
        <h2 className="text-xl text-center">
          {isDeleteConfirmed
            ? `You have successfully deleted:`
            : `Please confirm if you wish to delete the ${entityType}:`}
        </h2>
        <h2 className="text-3xl text-center">{entityName}</h2>

        <div className="flex w-full">
          <div className="flex space-x-2 tablet:space-x-6 w-full">
            {!isDeleteConfirmed && (
              <div
                onClick={handleCloseModal}
                className="p-4 w-full text-center flex justify-center items-center text-white bg-orange-light hover:bg-orange-dark rounded cursor-pointer"
              >
                {width! >= 768 && <p className="mr-2 text-lg">Cancel</p>}
                <img src={cancelFilledIcon} alt="Cancel" className="h-6" />
              </div>
            )}

            <div
              onClick={
                isDeleteConfirmed ? handleCloseModal : handleDeleteEntity
              }
              className={`p-4 w-full text-center flex justify-center items-center text-white  rounded ${
                isDeleteConfirmed ? "bg-green-light" : "bg-red-dark"
              } ${
                isSending
                  ? "opacity-50 cursor-wait"
                  : `${
                      isDeleteConfirmed
                        ? "hover:bg-green-dark"
                        : "hover:bg-red-600"
                    } cursor-pointer`
              }`}
            >
              {width! >= 768 && (
                <p className="mr-2 text-lg">
                  {isDeleteConfirmed
                    ? `Close ${width! >= 1280 ? `Modal` : ""}`
                    : `Delete ${width! >= 1280 ? `${entityType}` : ""}`}
                </p>
              )}
              <img
                src={isDeleteConfirmed ? checkIcon : deleteWhiteIcon}
                alt={isDeleteConfirmed ? "Confirm" : "Delete"}
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
