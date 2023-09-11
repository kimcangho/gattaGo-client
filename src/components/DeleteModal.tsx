import useLogoutRedirect from "../hooks/useLogoutRedirect";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useWindowSize from "../hooks/useWindowSize";
import { TeamData } from "../interfaces/EntityData";
import deleteWhiteIcon from "../assets/icons/delete-white-fill.svg";
import cancelFilledIcon from "../assets/icons/cancel-filled.svg";

interface DeleteModalProps {
  entityName: string;
  entityType: string;
  entityId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  entityArray: TeamData[];
  setEntityArray: React.Dispatch<React.SetStateAction<TeamData[]>>;
  isSending: boolean;
  setIsSending: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({
  entityName,
  entityType,
  entityId,
  setShowModal,
  entityArray,
  setEntityArray,
  isSending,
  setIsSending,
}: DeleteModalProps) => {
  const { width } = useWindowSize();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteTeam = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (isSending) return;

    setShowModal((prev) => !prev);
    try {
      setIsSending(true);
      await axiosPrivate.delete(`/teams/${entityId}`);
      const currentEntityArray = entityArray.filter((entity: TeamData) => {
        return entity.id !== entityId;
      });
      setEntityArray(currentEntityArray);
      setShowModal(false);
      setIsSending(false);
    } catch (err: unknown) {
      console.log(err);
      logoutRedirect("/login");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen">
      <div
        className="w-screen h-screen absolute bg-gray-border opacity-50 z-0"
        onClick={handleCloseModal}
      ></div>

      <div
        className="border border-black rounded-md bg-white absolute max-w-[768px] h-[40%] tablet:h-[30%] left-0 right-0 m-2 mt-[30%] midMobile:my-auto tablet:mx-auto top-0 bottom-0 
      flex flex-col justify-between items-center p-4"
      >
        <h1>Confirm Delete {entityType}</h1>
        <h2 className="text-xl text-center">
          Please confirm if you wish to delete the {entityType}:
        </h2>
        <h2 className="text-3xl text-center">{entityName}</h2>

        <div className="flex w-full">
          <div className="flex space-x-2 tablet:space-x-6 w-full">
            <div
              onClick={handleCloseModal}
              className="p-4 w-full text-center flex justify-center items-center text-white bg-orange-light hover:bg-orange-dark rounded cursor-pointer"
            >
              {width! >= 768 && <p className="mr-2 text-lg">Cancel</p>}
              <img src={cancelFilledIcon} alt="Cancel" className="h-6" />
            </div>

            <div
              onClick={handleDeleteTeam}
              className={`p-4 w-full text-center flex justify-center items-center text-white bg-red-dark rounded ${
                isSending
                  ? "opacity-50 cursor-wait"
                  : "hover:bg-red-600 cursor-pointer"
              }`}
            >
              {width! >= 768 && (
                <p className="mr-2 text-lg">
                  Delete {width! >= 1280 && `${entityType}`}
                </p>
              )}
              <img src={deleteWhiteIcon} alt="Delete Team" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
