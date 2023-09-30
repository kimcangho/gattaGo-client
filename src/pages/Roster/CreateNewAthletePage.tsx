import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext, { AuthContextTypes } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import useLogoutRedirect from "../../hooks/useLogoutRedirect";
import useAxiosPrivate from "../../hooks/usePrivateInterceptors";
import useWindowSize from "../../hooks/useWindowSize";
import { convertPaddlerSkillToField } from "../../utils/convertPaddlerSkillToField";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { transformPaddlerSkillsForRequest } from "../../utils/transformPaddlerSkillsForRequest";
import { paddlerSkillsArr } from "../../data/paddlerSkillsArr";
import { paddlerSkillsDefault } from "../../data/paddlerSkillsDefault";
import { CreateNewAthleteFormData } from "../../interfaces/FormData";
import userIcon from "../../assets/icons/user.svg";
import userFilledIcon from "../../assets/icons/user-filled.svg";
import chevronDownIcon from "../../assets/icons/chevron-down.svg";
import chevronUpIcon from "../../assets/icons/chevron-up.svg";
import cancelFilledIcon from "../../assets/icons/cancel-filled.svg";

const CreateNewAthletePage = (): JSX.Element => {
  const { teamId } = useParams();
  const { currentTeamDetails }: AuthContextTypes = useContext(AuthContext)!;
  const [isPaddlerSkillsVisible, setIsPaddlerSkillsVisible] =
    useState<boolean>(false);
  const [isPaddlerNotesVisible, setIsPaddlerNotesVisible] =
    useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logoutRedirect = useLogoutRedirect();
  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateNewAthleteFormData>({
    defaultValues: {
      teamId,
      email: "",
      firstName: "",
      lastName: "",
      weight: "",
      paddleSide: null,
      eligibility: null,
      availability: null,
      notes: "",
      paddlerSkills: paddlerSkillsDefault,
    },
  });

  const redirectPreviousPage = () => {
    navigate(-1);
  };

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
    if (isSending) return;
    //@ts-ignore
    const paddlerSkillsObj = transformPaddlerSkillsForRequest(paddlerSkills);

    if (!email) {
      setError("email", {
        type: "custom",
        message: `Please include email!`,
      });
    }
    if (!firstName) {
      setError("firstName", {
        type: "custom",
        message: `Please include first name!`,
      });
    }
    if (!lastName) {
      setError("lastName", {
        type: "custom",
        message: `Please include last name!`,
      });
    }
    if (!paddleSide) {
      setError("paddleSide", {
        type: "custom",
        message: `Please select paddle side!`,
      });
    }
    if (!eligibility) {
      setError("eligibility", {
        type: "custom",
        message: `Please select eligibility!`,
      });
    } else if (
      currentTeamDetails.eligibility === "Women" &&
      eligibility !== "W"
    ) {
      setError("eligibility", {
        type: "custom",
        message: `Athletes in ${currentTeamDetails.name} are restricted to women for eligibility!`,
      });
    }

    if (!availability) {
      setError("availability", {
        type: "custom",
        message: `Please select availability!`,
      });
    }

    if (
      !email ||
      !firstName ||
      !lastName ||
      !paddleSide ||
      !eligibility ||
      (currentTeamDetails.eligibility === "Women" && eligibility !== "W") ||
      !availability
    )
      return;

    let numericWeight: number = 0;
    if (weight) numericWeight = parseInt(weight, 10);

    let isAvailable: boolean = false;
    if (availability === "available") isAvailable = true;

    try {
      setIsSending(true);
      await axiosPrivate.post("/athletes", {
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
      });
      redirectPreviousPage();
    } catch (err: any) {
      if (err?.response?.status === 400) {
        setError("email", {
          type: "custom",
          message: `Email ${email} already in use!`,
        });
        setIsSending(false);
        return;
      }
      console.log(err);
      logoutRedirect("/login");
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
            information, optional paddler skills and notes!
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
            {...register("email")}
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
            {...register("firstName")}
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
            {...register("lastName")}
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
            {errors.paddleSide && (
              <p className="text-red-500">{errors.paddleSide.message}</p>
            )}
          </div>

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
              {errors.eligibility && (
                <p className="text-red-500">{errors.eligibility.message}</p>
              )}
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
              {errors.availability && (
                <p className="text-red-500">{errors.availability.message}</p>
              )}
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
        <div className="flex space-x-2 tablet:space-x-6 ">
          <div
            onClick={redirectPreviousPage}
            className="p-4 w-full text-center flex justify-center items-center text-white bg-orange-light hover:bg-orange-dark rounded cursor-pointer"
          >
            {width! >= 768 && <p className="mr-2 text-lg">Cancel</p>}
            <img src={cancelFilledIcon} alt="Cancel" className="h-6" />
          </div>
          <button
            type="submit"
            className={`py-4 px-2 w-full text-center flex items-center justify-center text-white bg-green-light rounded ${
              isSending ? "opacity-50 cursor-wait" : "hover:bg-green-dark"
            }`}
          >
            {!isSending ? (
              <div className="flex items-center">
                {width! >= 768 && (
                  <p className="mr-2 text-lg">
                    Create{width! >= 1280 && " Paddler"}
                  </p>
                )}
                <p className="font-bold">+</p>
                <img src={userFilledIcon} alt="Add Team" className="h-6" />
              </div>
            ) : (
              "Creating..."
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewAthletePage;
