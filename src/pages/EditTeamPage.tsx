import { useState, useEffect, useContext } from "react";
import {
  NavigateFunction,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import useWindowSize from "../hooks/useWindowSize";
import teamIcon from "../assets/icons/roster.svg";
import { CreateNewTeamFormData } from "../interfaces/FormData";
import LoadingSpinner from "../components/LoadingSpinner";
import cancelFilledIcon from "../assets/icons/cancel-filled.svg";
import checkIcon from "../assets/icons/check.svg";

const EditTeamPage = (): JSX.Element => {
  const { userId, teamId } = useParams();
  const { setCurrentTeamDetails }: AuthContextTypes = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate: NavigateFunction = useNavigate();
  const logoutRedirect = useLogoutRedirect();
  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateNewTeamFormData>({
    defaultValues: {
      name: "",
      eligibility: "",
      level: "",
      division: "",
    },
  });

  useEffect(() => {
    const getTeamDetails = async (teamId: string) => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}`, {
          withCredentials: true,
        });

        setValue("name", data.team.name);
        setValue("eligibility", data.team.eligibility);
        setValue("level", data.team.level);
        setValue("division", data.team.division);
        setIsLoading(false);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getTeamDetails(teamId!);
  }, [reset]);

  const handleFormSubmit = async ({
    name,
    eligibility,
    level,
    division,
  }: CreateNewTeamFormData) => {
    if (isSending) return;
    if (!eligibility || !level || !division) return;

    try {
      setIsSending(true);
      await axiosPrivate.put(`/teams/${teamId}`, {
        name,
        eligibility,
        level,
        division,
      });
      setCurrentTeamDetails({ name: "", eligibility: "", division: "" });
      navigate(`../${userId}/team-overview`);
    } catch (err: unknown) {
      console.log(err);
      logoutRedirect("/login");
    }
  };

  const handleCancelRedirect = () => {
    setCurrentTeamDetails({ name: "", eligibility: "", division: "" });
    navigate(`../${userId}/team-overview`);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col items-center p-4 desktop:w-[1280px] desktop:mx-auto">
          <div className="flex justify-center items-center p-2 my-2.5 tablet:my-5 space-x-2 tablet:space-x-6 tablet:p-6 max-w-[448px] bg-white border border-gray-border rounded-t w-full">
            <img
              src={teamIcon}
              alt="Team Roster"
              className="h-12 tablet:h-16"
            />
            <div>
              <h3 className="text-blue-light">Edit Your Team</h3>
              <p>Edit your team's general information.</p>
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
                {...register("name", {
                  required: {
                    value: true,
                    message: "Team name field can't be empty!",
                  },
                })}
                type="text"
                id="name"
                name="name"
                placeholder="Input team name"
                className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
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
            </div>

            <div className="flex space-x-2 tablet:space-x-6">
              <Link
                to={`../${userId}/team-overview`}
                onClick={handleCancelRedirect}
                className="p-4 w-full text-center flex justify-center items-center text-white bg-orange-light hover:bg-orange-dark rounded"
              >
                {width! >= 768 && <p className="mr-2">Cancel</p>}
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
                    {width! >= 768 && <p className="mr-2">Save Changes</p>}
                    <img src={checkIcon} alt="Add Team" className="h-6" />
                  </div>
                ) : (
                  "Saving..."
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditTeamPage;
