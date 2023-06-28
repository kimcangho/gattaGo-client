import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import teamIcon from "../assets/icons/roster.svg";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";

interface CreateNewTeamFormData {
  name: string;
  division: string;
  level: string;
  gender: string;
}

const CreateNewTeamPage = (): JSX.Element => {
  const { accessToken }: AuthContextTypes = useContext(AuthContext)!;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewTeamFormData>({
    defaultValues: {
      name: "",
      gender: "",
      level: "",
      division: "",
    },
  });

  const handleFormSubmit = async ({
    name,
    gender,
    level,
    division,
  }: CreateNewTeamFormData) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    console.log(name, gender, level, division);
    if (!gender || !level || !division) {
      //  To-do: validation for empty fields
      return;
    }

    try {
      await axios.post(
        "http://localhost:8888/teams",
        {
          name,
          gender,
          level,
          division,
        },
        {
          headers,
          withCredentials: true,
        }
      );
      navigate("../:userId/overview");
    } catch (err) {
      console.log(err);
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
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex w-full mb-4 justify-between">
          <div className="flex flex-col row-auto">
            <h3 className="text-blue-light">Gender</h3>
            <div>
              <input
                type="radio"
                {...register("gender")}
                name="gender"
                id="open"
                value="open"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="open">Open</label>
            </div>
            <div>
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                id="women"
                value="women"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="women">Women</label>
            </div>
            <div>
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                id="mixed"
                value="mixed"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="mixed">Mixed</label>
            </div>
          </div>

          <div className="flex flex-col">
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
            to="../user/overview"
            className="p-4 w-full text-center flex justify-center items-center text-white bg-orange-light hover:bg-orange-dark rounded"
          >
            <p>Cancel</p>
          </Link>
          <button
            type="submit"
            className="p-4 w-full text-center flex justify-center text-white bg-green-light hover:bg-green-dark rounded"
          >
            Create Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTeamPage;
