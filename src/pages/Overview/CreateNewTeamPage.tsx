import { useState } from "react";
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../../hooks/useLogoutRedirect";
import useWindowSize from "../../hooks/useWindowSize";
import { CreateNewTeamFormData } from "../../interfaces/FormData";
import teamIcon from "../../assets/icons/roster.svg";
import rosterFilledIcon from "../../assets/icons/roster-filled.svg";
import cancelFilledIcon from "../../assets/icons/cancel-filled.svg";

const CreateNewTeamPage = (): JSX.Element => {
  const { userId } = useParams();
  const [isSending, setIsSending] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate: NavigateFunction = useNavigate();
  const logoutRedirect = useLogoutRedirect();
  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateNewTeamFormData>({
    defaultValues: {
      name: "",
      eligibility: "",
      level: "",
      division: "",
    },
  });

  const handleFormSubmit = async ({
    name,
    eligibility,
    level,
    division,
  }: CreateNewTeamFormData) => {
    if (isSending) return;

    if (!name) {
      setError("name", {
        type: "custom",
        message: `Please include team name!`,
      });
    }
    if (!eligibility) {
      setError("eligibility", {
        type: "custom",
        message: `Please include team eligibility!`,
      });
    }
    if (!level) {
      setError("level", {
        type: "custom",
        message: `Please include team level!`,
      });
    }
    if (!division) {
      setError("division", {
        type: "custom",
        message: `Please include team division!`,
      });
    }

    if (!name || !eligibility || !level || !division) return;
    try {
      setIsSending(true);
      await axiosPrivate.post(`/teams/user/${userId}`, {
        name,
        eligibility,
        level,
        division,
      });
      navigate(`../${userId}/team-overview`);
    } catch (err: unknown) {
      console.log(err);
      logoutRedirect("/login");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 desktop:w-[1280px] desktop:mx-auto">
      <div className="flex justify-between items-center p-2 my-2.5 tablet:my-5 space-x-2 tablet:space-x-6 tablet:p-6 max-w-[448px] bg-white border border-gray-border rounded-t w-full">
        <img src={teamIcon} alt="Team Roster" className="h-12 tablet:h-16" />
        <div>
          <h3 className="text-blue-light">Create a New Team</h3>
          <p>
            Let's create your dragonboat team by adding some basic information!
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col p-2 tablet:p-6 max-w-[448px] bg-white border border-gray-border rounded-t w-full"
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="name">
            <h3 className="text-blue-light">Team Name</h3>
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            name="name"
            placeholder="Input team name"
            className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex w-full mb-4 justify-between">
          <div className="flex flex-col row-auto w-[50%]">
            <h3 className="text-blue-light">Eligibility</h3>
            <div>
              <input
                type="radio"
                {...register("eligibility")}
                name="eligibility"
                id="open"
                value="open"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="open">Open</label>
            </div>
            <div>
              <input
                {...register("eligibility")}
                type="radio"
                name="eligibility"
                id="women"
                value="women"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="women">Women</label>
            </div>
            <div>
              <input
                {...register("eligibility")}
                type="radio"
                name="eligibility"
                id="mixed"
                value="mixed"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="mixed">Mixed</label>
            </div>
            {errors.eligibility && (
              <p className="text-red-500">{errors?.eligibility?.message}</p>
            )}
          </div>

          <div className="flex flex-col w-[50%]">
            <h3 className="text-blue-light">Level</h3>
            <div>
              <input
                {...register("level")}
                type="radio"
                id="level-community"
                value="community"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="level-community">Community</label>
            </div>
            <div>
              <input
                {...register("level")}
                type="radio"
                id="level-sport"
                value="sport"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="level-sport">Sport</label>
            </div>
            {errors.level && (
              <p className="text-red-500">{errors.level.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="division">
            <h3 className="text-blue-light">Division</h3>
          </label>
          <select
            {...register("division")}
            name="division"
            id="division"
            defaultValue={"select"}
            className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          >
            <option value="select">Select division</option>
            <option value="junior">Under 18</option>
            <option value="u24">Under 24</option>
            <option value="premier">Premier</option>
            <option value="seniora">Senior A</option>
            <option value="seniorb">Senior B</option>
            <option value="seniorc">Senior C</option>
            <option value="para">Para</option>
          </select>
          {errors.division && (
            <p className="text-red-500">{errors?.division?.message}</p>
          )}
        </div>

        <div className="flex space-x-2 tablet:space-x-6">
          <Link
            to={`../${userId}/team-overview`}
            className="p-4 w-full text-center flex justify-center items-center text-white bg-orange-light hover:bg-orange-dark rounded"
          >
            {width! >= 768 && <p className="mr-2 text-lg">Cancel</p>}
            <img src={cancelFilledIcon} alt="Cancel" className="h-6" />
          </Link>
          <button
            type="submit"
            className={`p-4 w-full text-center flex justify-center text-white bg-green-light rounded ${
              isSending ? "opacity-50 cursor-wait" : "hover:bg-green-dark"
            }`}
          >
            {!isSending ? (
              <div className="flex items-center">
                {width! >= 768 && <p className="mr-2 text-lg">Create{width! >= 1280 && " Team"}</p>}
                <p className="font-bold">+</p>
                <img src={rosterFilledIcon} alt="Add Team" className="h-6" />
              </div>
            ) : (
              "Creating Team..."
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTeamPage;
