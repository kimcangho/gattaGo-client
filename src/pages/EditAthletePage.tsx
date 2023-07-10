import { useState, useContext, useEffect } from "react";
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import userIcon from "../assets/icons/user.svg";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import chevronUpIcon from "../assets/icons/chevron-up.svg";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { convertPaddlerSkillToField } from "../utils/convertPaddlerSkillToField";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { transformPaddlerSkillsForRequest } from "../utils/transformPaddlerSkillsForRequest";
import { paddlerSkillsArr } from "../data/paddlerSkillsArr";
import { PaddlerSkills } from "../interfaces/PaddlerSkills";

interface CreateNewAthleteFormData {
  teamId: string;
  email: string;
  firstName: string;
  lastName: string;
  eligibility: "O" | "W" | null;
  paddleSide: "L" | "R" | "B" | "N" | null;
  weight: string | null;
  paddlerSkills: PaddlerSkills;
  notes: string;
}

const EditAthletePage = () => {
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  const { teamId, athleteId } = useParams();
  const [athlete, setAthlete]: any = useState(null);
  const [isPaddlerSkillsVisible, setIsPaddlerSkillsVisible] =
    useState<boolean>(false);
  const [isPaddlerNotesVisible, setIsPaddlerNotesVisible] =
    useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNewAthleteFormData>({
    defaultValues: {
      teamId,
      email: athlete?.email,
      firstName: "",
      lastName: "",
      weight: null,
      paddleSide: null,
      eligibility: null,
      notes: "",
      paddlerSkills: {
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

  useEffect(() => {
    const getAthleteDetails = async (athleteId: string) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      try {
        const { data } = await axios.get(
          `http://localhost:8888/athletes/${athleteId}`,

          {
            headers,
            withCredentials: true,
          }
        );

        const {
          eligibility,
          email,
          firstName,
          lastName,
          notes,
          paddleSide,
          paddlerSkills,
          weight,
        } = data;

        reset({
          teamId,
          eligibility,
          email,
          firstName,
          lastName,
          paddleSide,
          paddlerSkills: paddlerSkills[0],
          notes,
          weight,
        });
        await setAthlete(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAthleteDetails(athleteId!);
  }, [reset]);

  const handleTogglePaddlerSkills = () => {
    setIsPaddlerSkillsVisible((prev) => !prev);
  };

  const handleTogglePaddlerNotes = () => {
    setIsPaddlerNotesVisible((prev) => !prev);
  };

  const handleFormSubmit = async ({
    teamId,
    email,
    firstName,
    lastName,
    paddleSide,
    eligibility,
    weight,
    paddlerSkills,
    notes,
  }: CreateNewAthleteFormData) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const paddlerSkillsObj = transformPaddlerSkillsForRequest(paddlerSkills);

    if (!email || !firstName || !lastName || !paddleSide || !eligibility)
      return;

    let numericWeight: number;
    if (!weight) numericWeight = 0;
    else numericWeight = parseInt(weight, 10);

    try {
      await axios.put(
        `http://localhost:8888/athletes/${athleteId}`,
        {
          teamId,
          email,
          firstName,
          lastName,
          paddleSide,
          eligibility,
          weight: numericWeight,
          paddlerSkillsObj,
          notes,
        },
        {
          headers,
          withCredentials: true,
        }
      );
      navigate(`/:userId/roster/${teamId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 desktop:w-[1280px] desktop:mx-auto">
      <div className="flex justify-start items-center p-2 my-2.5 tablet:my-5 space-x-2 tablet:space-x-6 tablet:p-6 max-w-[448px] bg-white border border-gray-border rounded-t w-full">
        <img src={userIcon} alt="New Athlete" className="h-12 tablet:h-16" />
        <div>
          <h3 className="text-blue-light">Edit Athlete Details</h3>
          <p>
            Edit your athlete's general information, optional paddler skills and
            notes!
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

        {/* Optional Paddler Skill Set */}

        <div className="border-y">
          <label
            htmlFor="weight"
            onClick={handleTogglePaddlerSkills}
            className="flex space-x-2 my-4"
          >
            <h3 className="text-blue-light">Skill Set (Optional)</h3>
            {isPaddlerSkillsVisible ? (
              <img src={chevronDownIcon} alt="Chevron Down" className="w-4" />
            ) : (
              <img src={chevronUpIcon} alt="Chevron Up" className="w-4" />
            )}
          </label>
          {isPaddlerSkillsVisible && (
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

              {/* Optional Paddler Skills */}
              {paddlerSkillsArr.map(({ category, fields }, index) => {
                return (
                  <div className="w-[50%] mb-4" key={index}>
                    <h3 className="w-full">
                      {capitalizeFirstLetter(
                        convertPaddlerSkillToField(category, 0)
                      )}
                    </h3>
                    {fields.map((skill, index) => {
                      return (
                        <div key={index} className="mr-2">
                          <input
                            type="checkbox"
                            {...register(`paddlerSkills`)}
                            id={`paddlerSkills-${skill}`}
                            value={skill}
                            defaultChecked={!!athlete.paddlerSkills[0][skill]}
                            className="mr-2 tablet:mr-4"
                          />
                          <label htmlFor={`paddlerSkills-${skill}`}>
                            {convertPaddlerSkillToField(skill, 2)}
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

        {/* Optional Paddler Notes */}

        <div className="border-b mb-4">
          <label
            htmlFor="notes"
            onClick={handleTogglePaddlerNotes}
            className="my-4 flex space-x-2"
          >
            <h3 className="text-blue-light">Notes (Optional)</h3>
            {isPaddlerNotesVisible ? (
              <img src={chevronDownIcon} alt="Chevron Down" className="w-4" />
            ) : (
              <img src={chevronUpIcon} alt="Chevron Up" className="w-4" />
            )}
          </label>
          {isPaddlerNotesVisible && (
            <div className="flex flex-col mb-4 w-full">
              <textarea
                {...register("notes")}
                rows={3}
                id="notes"
                name="notes"
                placeholder="Input notes here"
                className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light resize-none"
              />
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
            Confirm Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAthletePage;