import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import userIcon from "../assets/icons/user.svg";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import chevronUpIcon from "../assets/icons/chevron-up.svg";
import { convertPaddlerSkillToField } from "../utils/convertPaddlerSkillToField";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { transformPaddlerSkillsForRequest } from "../utils/transformPaddlerSkillsForRequest";
import { paddlerSkillsArr } from "../data/paddlerSkillsArr";
import { CreateNewAthleteFormData } from "../interfaces/FormData";

const EditAthletePage = () => {
  const { userId, teamId, athleteId } = useParams();
  const [athlete, setAthlete] = useState<any>([]);
  const [isPaddlerSkillsVisible, setIsPaddlerSkillsVisible] =
    useState<boolean>(false);
  const [isPaddlerNotesVisible, setIsPaddlerNotesVisible] =
    useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();
  const navigate = useNavigate();

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
      availability: null,
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
      try {
        const { data } = await axiosPrivate.get(`/athletes/${athleteId}`, {
          withCredentials: true,
        });

        const {
          eligibility,
          isAvailable,
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
          availability: isAvailable ? "available" : "unavailable",
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
        logoutRedirect("/login");
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
    availability,
    weight,
    paddlerSkills,
    notes,
  }: CreateNewAthleteFormData) => {
    const paddlerSkillsObj = transformPaddlerSkillsForRequest(paddlerSkills);

    if (
      !email ||
      !firstName ||
      !lastName ||
      !paddleSide ||
      !eligibility ||
      !availability
    )
      return;

    let numericWeight: number = 0;
    if (weight) parseInt(weight, 10);

    let isAvailable: boolean = false;
    if (availability === "available") isAvailable = true;

    try {
      await axiosPrivate.put(
        `/athletes/${athleteId}`,
        {
          teamId,
          email,
          firstName,
          lastName,
          paddleSide,
          eligibility,
          isAvailable,
          weight: numericWeight,
          paddlerSkillsObj,
          notes,
        },
        {
          withCredentials: true,
        }
      );
      navigate(`/${userId}/roster/${teamId}`);
    } catch (err) {
      console.log(err);
      logoutRedirect("/login");
    }
  };

  const handleCancelRedirect = () => {
    navigate(`../${userId}/roster/${teamId}/`);
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
          <div className="flex flex-col w-[50%] space-y-4">
            {/* Eligibility */}
            <div className="flex flex-col">
              <h3>Eligibility</h3>
              <div>
                <input
                  {...register("eligibility")}
                  type="radio"
                  name="eligibility"
                  id="eligibility-open"
                  value="O"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="eligibility-open">Open</label>
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
            {/* Availability */}
            <div className="flex flex-col">
              <h3>Availability</h3>
              <div>
                <input
                  {...register("availability")}
                  type="radio"
                  name="availability"
                  id="availability-available"
                  value="available"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="availability-available">Available</label>
              </div>
              <div>
                <input
                  {...register("availability")}
                  type="radio"
                  name="availability"
                  id="availability-unavailable"
                  value="unavailable"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="availability-unavailable">Unavailable</label>
              </div>
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
          <button
            // to={`../${userId}/roster/${teamId}/`}
            onClick={handleCancelRedirect}
            className="p-4 w-full text-center flex justify-center items-center text-white bg-orange-light hover:bg-orange-dark rounded"
          >
            <p>Cancel</p>
          </button>
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
