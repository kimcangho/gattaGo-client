import { useState, useContext } from "react";
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import userIcon from "../assets/icons/user.svg";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { convertPaddlerStatToField } from "../utils/convertPaddlerStatToField";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const paddlerStatsArr = [
  {
    category: "roles",
    fields: ["isSteers", "isDrummer", "isStroker", "isCaller", "isBailer"],
  },
  {
    category: "raceDistances",
    fields: ["is200m", "is500m", "is1000m", "is2000m"],
  },
  {
    category: "strengths",
    fields: [
      "isVeteran",
      "isSteadyTempo",
      "isVocal",
      "isTechnicallyProficient",
      "isLeader",
    ],
  },
  {
    category: "weaknesses",
    fields: [
      "isNewbie",
      "isRushing",
      "isLagging",
      "isTechnicallyPoor",
      "isInjuryProne",
      "isLoadManaged",
    ],
  },
  { category: "sections", fields: ["isPacer", "isEngine", "isRocket"] },
];

interface CreateNewAthleteFormData {
  email: string;
  firstName: string;
  lastName: string;
  eligibility: "O" | "W" | null;
  paddleSide: "L" | "R" | "B" | "N" | null;
  weight: number | null;
  paddlerStats: PaddlerStats;
}

interface PaddlerStats {
  //  Roles
  isSteers: boolean;
  isDrummer: boolean;
  isStroker: boolean;
  isCaller: boolean;
  isBailer: boolean;
  //  Section
  isPacer: boolean;
  isEngine: boolean;
  isRocket: boolean;
  //  Race Distances
  is200m: boolean;
  is500m: boolean;
  is1000m: boolean;
  is2000m: boolean;
  //  Strengths
  isVeteran: boolean;
  isSteadyTempo: boolean;
  isVocal: boolean;
  isTechnicallyProficient: boolean;
  isLeader: boolean;
  //  Weaknesses
  isNewbie: boolean;
  isRushing: boolean;
  isLagging: boolean;
  isTechnicallyPoor: boolean;
  isInjuryProne: boolean;
  isLoadManaged: boolean;
}

const CreateNewAthletePage = (): JSX.Element => {
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  const { teamId } = useParams();
  const [isPaddlerStatsVisible, setIsPaddlerStatsVisible] =
    useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewAthleteFormData>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      weight: null,
      paddleSide: null,
      eligibility: null,
      paddlerStats: {
        //  Roles
        isSteers: false,
        isDrummer: false,
        isStroker: false,
        isCaller: false,
        isBailer: false,
        //  Section
        isPacer: false,
        isEngine: false,
        isRocket: false,
        //  Race Distances
        is200m: false,
        is500m: false,
        is1000m: false,
        is2000m: false,
        //  Strengths
        isVeteran: false,
        isSteadyTempo: false,
        isVocal: false,
        isTechnicallyProficient: false,
        isLeader: false,
        //  Weaknesses
        isNewbie: false,
        isRushing: false,
        isLagging: false,
        isTechnicallyPoor: false,
        isInjuryProne: false,
        isLoadManaged: false,
      },
    },
  });

  const handleTogglePaddlerStats = () => {
    setIsPaddlerStatsVisible((prev) => !prev);
  };

  const handleFormSubmit = async ({
    email,
    firstName,
    lastName,
    paddleSide,
    eligibility,
    paddlerStats,
  }: CreateNewAthleteFormData) => {
    console.log("Submitting athlete details!");
    const headers = { Authorization: `Bearer ${accessToken}` };

    console.log(
      email,
      firstName,
      lastName,
      paddleSide,
      eligibility,
      paddlerStats
    );

    if (!email || !firstName || !lastName || !paddleSide || !eligibility)
      return;

    try {
      await axios.post(
        "http://localhost:8888/",
        {
          email,
          firstName,
          lastName,
          paddleSide,
          eligibility,
          paddlerStats,
        },
        {
          headers,
          withCredentials: true,
        }
      );
      navigate(`../:userId/roster/${teamId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 desktop:w-[1280px] desktop:mx-auto">
      <div className="flex justify-start items-center p-2 my-2.5 tablet:my-5 space-x-2 tablet:space-x-6 tablet:p-6 max-w-[448px] bg-white border border-gray-border rounded-t w-full">
        <img src={userIcon} alt="New Athlete" className="h-12 tablet:h-16" />
        <div>
          <h3 className="text-blue-light">Create a New Athlete</h3>
          <p>
            Let's add a new athlete to your dragonboat team with some general
            information and optional paddler stats!
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col p-2 tablet:p-6 max-w-[448px] bg-white border border-gray-border rounded-t w-full"
      >
        <h3 className="text-blue-light mb-4">General Information</h3>

        {/* Email */}
        <div className="flex flex-col mb-4">
          <label htmlFor="email">
            <h3>Email</h3>
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email field can't be empty!",
              },
            })}
            type="text"
            id="email"
            name="email"
            placeholder="Input email address"
            className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* First Name */}
        <div className="flex flex-col mb-4">
          <label htmlFor="firstName">
            <h3>First Name</h3>
          </label>
          <input
            {...register("firstName", {
              required: {
                value: true,
                message: "First name field can't be empty!",
              },
            })}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Input first name"
            className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col mb-4">
          <label htmlFor="lastName">
            <h3>Last Name</h3>
          </label>
          <input
            {...register("lastName", {
              required: {
                value: true,
                message: "Last name field can't be empty!",
              },
            })}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Input last name"
            className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex w-full mb-4 justify-between">
          {/* Paddle Side */}
          <div className="flex flex-col w-[50%]">
            <h3>Paddle Side</h3>
            <div>
              <input
                {...register("paddleSide")}
                type="radio"
                id="side-left"
                value="L"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="side-left">Left</label>
            </div>
            <div>
              <input
                {...register("paddleSide")}
                type="radio"
                id="side-right"
                value="R"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="side-right">Right</label>
            </div>
            <div>
              <input
                {...register("paddleSide")}
                type="radio"
                id="side-both"
                value="B"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="side-both">Both</label>
            </div>
            <div>
              <input
                {...register("paddleSide")}
                type="radio"
                id="side-none"
                value="N"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="side-none">Neither</label>
            </div>
          </div>

          {/* Eligibility */}
          <div className="flex flex-col w-[50%]">
            <h3>Eligibility</h3>
            <div>
              <input
                type="radio"
                {...register("eligibility")}
                name="eligibility"
                id="eligibility-open"
                value="O"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="elibigility-open">Open</label>
            </div>
            <div>
              <input
                {...register("eligibility")}
                type="radio"
                name="eligibility"
                id="eligibility-women"
                value="W"
                className="mr-2 tablet:mr-4"
              />
              <label htmlFor="eligibility-women">Women</label>
            </div>
          </div>
        </div>

        {/* Optional Paddler Stats */}

        <div className="border-y mb-4">
          <div onClick={handleTogglePaddlerStats} className="my-4">
            <h3 className="text-blue-light">Paddler Stats (Optional)</h3>
          </div>
          {isPaddlerStatsVisible && (
            <div className="flex flex-wrap">
              {/* Weight */}
              <div className="flex flex-col mb-4 w-full">
                <label htmlFor="weight">
                  <h3>Weight</h3>
                </label>
                <input
                  {...register("weight")}
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Input weight"
                  className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
                />
              </div>

              {/* Optional Paddler Stats */}
              {paddlerStatsArr.map(({ category, fields }, index) => {
                return (
                  <div className="w-[50%] mb-4" key={index}>
                    <h3 className="w-full">
                      {capitalizeFirstLetter(
                        convertPaddlerStatToField(category, 0)
                      )}
                    </h3>
                    {fields.map((stat, index) => {
                      return (
                        <div key={index} className="mr-2">
                          <input
                            type="checkbox"
                            {...register(`paddlerStats`)}
                            id={`paddlerStats-${stat}`}
                            value={stat}
                            className="mr-2 tablet:mr-4"
                          />
                          <label htmlFor={`paddlerStats-${stat}`}>
                            {convertPaddlerStatToField(stat, 2)}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex space-x-2 tablet:space-x-6">
          <Link
            to={`../:userId/roster/${teamId}/`}
            className="p-4 w-full text-center flex justify-center items-center text-white bg-orange-light hover:bg-orange-dark rounded"
          >
            <p>Cancel</p>
          </Link>
          <button
            type="submit"
            className="p-4 w-full text-center flex justify-center text-white bg-green-light hover:bg-green-dark rounded"
          >
            Create Athlete
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewAthletePage;
