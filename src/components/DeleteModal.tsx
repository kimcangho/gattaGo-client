import useLogoutRedirect from "../hooks/useLogoutRedirect";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import { TeamData } from "../interfaces/EntityData";

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
        className="border border-black rounded-md bg-white absolute max-w-[768px] h-[30%] tablet:h-[30%] left-0 right-0 m-2 mt-[30%] midMobile:my-auto tablet:mx-auto top-0 bottom-0 
      flex flex-col items-center p-4"
      >
        <h1>Confirm Delete {entityType}</h1>
        <p>You are about to delete {entityName}.</p>

        <div className="flex">
          <div className="bg-orange-light" onClick={handleCloseModal}>
            Cancel
          </div>
          <div onClick={handleDeleteTeam} className="bg-red-dark">
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
