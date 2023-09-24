import { useState } from "react";
import { convertPaddlerSkillToField } from "../../utils/convertPaddlerSkillToField";
import userProfileIcon from "../../assets/icons/user-profile.svg";
import checkCircleIcon from "../../assets/icons/check-circle.svg";
import xCircleIcon from "../../assets/icons/x-circle.svg";
import leftHandUnhighlightIcon from "../../assets/icons/left-hand-unhighlight.svg";
import leftHandHighlightIcon from "../../assets/icons/left-hand-highlight.svg";
import rightHandUnhighlightIcon from "../../assets/icons/right-hand-unhighlight.svg";
import rightHandHighlightIcon from "../../assets/icons/right-hand-highlight.svg";
import editFilledIcon from "../../assets/icons/edit-entity.svg";
import editUnfilledIcon from "../../assets/icons/edit.svg";
import deleteFilledIcon from "../../assets/icons/delete-entity.svg";
import deleteUnfilledIcon from "../../assets/icons/delete.svg";
import notesFilledIcon from "../../assets/icons/notes-filled.svg";
import notesUnfilledIcon from "../../assets/icons/notes-unfilled.svg";
import skillsFilledIcon from "../../assets/icons/skills-filled.svg";
import skillsUnfilledIcon from "../../assets/icons/skills-unfilled.svg";

interface RosterItemProps {
  athleteId: string;
  editAthlete: any;
  width: number | undefined;
  athlete: any;
  currentTeamDetails: {
    name?: string;
    eligibility?: string;
    division?: string;
  };
  isWomenIneligible: boolean;
  setShowModal: any;
  setAthleteName: any;
  setAthleteId: any;
}

const RosterItem = ({
  athleteId,
  athlete,
  width,
  // deleteAthlete,
  editAthlete,
  isWomenIneligible,
  // showModal,
  setShowModal,
  setAthleteName,
  setAthleteId,
}: RosterItemProps): JSX.Element => {
  const [isNotesVisible, setIsNotesVisible] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isNotesHovering, setIsNotesHovering] = useState<boolean>(false);
  const [isSkillsHovering, setIsSkillsHovering] = useState<boolean>(true);
  const [isEditHovering, setIsEditHovering] = useState<boolean>(false);
  const [isDeleteHovering, setIsDeleteHovering] = useState<boolean>(false);

  const handleToggleNotes = () => {
    setIsNotesVisible((isNotesVisible) => !isNotesVisible);
  };

  const handleNotesHover = () => {
    setIsNotesHovering((prev) => !prev);
  };

  const handleSkillsHover = () => {
    setIsSkillsHovering((prev) => !prev);
  };
  const handleEditHover = () => {
    setIsEditHovering((prev) => !prev);
  };
  const handleDeleteHover = () => {
    setIsDeleteHovering((prev) => !prev);
  };

  const handleModalVisibility = async () => {
    if (isSending) return;
    console.log(athlete);
    setAthleteName(`${athlete.firstName} ${athlete.lastName}`);
    setAthleteId(athleteId);
    setShowModal((prev: boolean) => !prev);
  };

  const handleEditAthlete = async (athleteId: string) => {
    if (isSending) return;
    setIsSending(true);
    await editAthlete(athleteId);
  };

  return (
    <>
      {athlete && (
        <>
          <article
            key={athlete.id}
            className={`shadow-lg tablet:shadow-none tablet:flex mx-auto tablet:mx-0 max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] border tablet:border-0 tablet:border-t border-black mb-4 tablet:mb-0 pb-2 tablet:pb-0 rounded-md tablet:rounded-none items-center hover:bg-gray-border`}
          >
            <div className="flex justify-between bg-gray-border tablet:bg-inherit border-b border-black tablet:border-none rounded-t-md">
              <div className="flex items-center tablet:justify-between m-2 space-x-2 tablet:w-[200px]">
                <img
                  src={athlete?.isAvailable ? checkCircleIcon : xCircleIcon}
                  alt={athlete?.isAvailable ? "Available" : "Unavailable"}
                  className="w-6 tablet:w-8 tablet:mr-1"
                />
                <h3 className="text-blue-light tablet:order-first">
                  {athlete?.firstName} {athlete?.lastName.slice(0, 1)}.{" "}
                </h3>
              </div>
              <div className="flex m-3 w-12">
                <img
                  src={
                    athlete?.paddleSide === "L" || athlete?.paddleSide === "B"
                      ? leftHandHighlightIcon
                      : leftHandUnhighlightIcon
                  }
                  alt={
                    athlete?.paddleSide === "L" || athlete?.paddleSide === "B"
                      ? "Left Side Filled"
                      : "Left Side Unfilled"
                  }
                  className="w-6"
                />
                <img
                  src={
                    athlete?.paddleSide === "R" || athlete?.paddleSide === "B"
                      ? rightHandHighlightIcon
                      : rightHandUnhighlightIcon
                  }
                  alt={
                    athlete?.paddleSide === "R" || athlete?.paddleSide === "B"
                      ? "Right Side Filled"
                      : "Right Side Unfilled"
                  }
                  className="w-6"
                />
              </div>
              <div className="hidden tablet:flex items-center tablet:w-[100px]">
                <h3 className="m-2.5 text-center w-4 text-black">
                  {athlete.eligibility}
                </h3>
                <h3 className="text-center w-8 ml-[26px] text-black">
                  {athlete.weight}
                </h3>
              </div>
            </div>

            <img
              src={userProfileIcon}
              alt="Placeholder Profile Picture"
              className="inline-block tablet:order-first w-20 tablet:w-10 tablet:ml-2 align-top mt-4 tablet:mt-2 mb-2"
            />

            <div className="inline-block justify-start tablet:flex tablet:flex-wrap mt-3.5 tablet:mt-0 p-2 text-black w-[calc(100%-80px)] tablet:w-full">
              {isNotesVisible && width! > 768 ? (
                <p className="hidden tablet:flex text-black mx-2">
                  {athlete?.notes}
                </p>
              ) : (
                <>
                  <h3 className="inline-block tablet:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
                    {athlete?.eligibility === "O" ? "Open" : "Women"}
                  </h3>
                  {athlete.weight ? (
                    <h3 className="inline-block tablet:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
                      {athlete.weight}
                    </h3>
                  ) : (
                    <></>
                  )}
                  {athlete?.paddlerSkills.length !== 0 &&
                    Object.entries(athlete.paddlerSkills[0]).map(
                      (skill, index) => {
                        if (
                          skill[0] !== "id" &&
                          skill[0] !== "athleteId" &&
                          skill[1]
                        )
                          return (
                            <p
                              key={index}
                              className="inline-block bg-blue-wavy px-2 py-1 rounded-3xl mx-2 mb-2 tablet:mt-2 text-center"
                            >
                              {convertPaddlerSkillToField(skill[0], 2)}
                            </p>
                          );
                      }
                    )}
                  {isWomenIneligible && (
                    <p className="inline-block bg-red-dark px-2 py-1 rounded-3xl mx-2 mb-2 tablet:mt-2 text-center">
                      Ineligible
                    </p>
                  )}
                </>
              )}
            </div>

            <div
              className={`flex pl-2 rounded-b-xl tablet:w-auto justify-center ${
                !isNotesVisible ? `justify-between` : `flex-col tablet:flex-row`
              } `}
            >
              <div
                className={`flex space-x-1 items-center tablet:w-[84px] ${
                  !isSending ? "tablet:w-[108px]" : ""
                }`}
              >
                {!!athlete?.notes &&
                  (isNotesVisible ? (
                    <img
                      src={
                        isSkillsHovering ? skillsFilledIcon : skillsUnfilledIcon
                      }
                      alt="Notes"
                      onClick={handleToggleNotes}
                      onMouseEnter={handleSkillsHover}
                      onMouseLeave={handleSkillsHover}
                      className={`tablet:ml-2 mr-1 ${
                        isNotesVisible ? `mt-1 tablet:mt-0` : ``
                      } w-6 cursor-pointer`}
                    />
                  ) : (
                    <img
                      src={
                        isNotesHovering ? notesFilledIcon : notesUnfilledIcon
                      }
                      alt="Notes"
                      onClick={handleToggleNotes}
                      onMouseEnter={handleNotesHover}
                      onMouseLeave={handleNotesHover}
                      className={`ml-2 mr-1 ${
                        isNotesVisible ? `mt-1 tablet:mt-0` : ``
                      } w-6 cursor-pointer`}
                    />
                  ))}
              </div>

              {isNotesVisible &&
                (!isSending || (isSending && width! < 768)) && (
                  <>
                    <p className="tablet:hidden text-black">{athlete?.notes}</p>
                  </>
                )}

              <div className="flex justify-end">
                {!isSending ? (
                  <>
                    <img
                      src={isEditHovering ? editFilledIcon : editUnfilledIcon}
                      alt="Edit"
                      onClick={() => handleEditAthlete(athleteId)}
                      onMouseEnter={handleEditHover}
                      onMouseLeave={handleEditHover}
                      className={`ml-2 mr-1 ${
                        isNotesVisible ? `mt-1 tablet:mt-0` : ``
                      } w-6 cursor-pointer`}
                    />
                    <img
                      src={
                        isDeleteHovering ? deleteFilledIcon : deleteUnfilledIcon
                      }
                      alt="Delete"
                      id={athlete?.id}
                      // onClick={() => handleDeleteAthlete(athleteId)}
                      onClick={handleModalVisibility}
                      onMouseEnter={handleDeleteHover}
                      onMouseLeave={handleDeleteHover}
                      className={`ml-1 mr-2 ${
                        isNotesVisible && `mt-1 tablet:mt-0`
                      } w-6 cursor-pointer`}
                    />
                  </>
                ) : (
                  <div className="flex justify-end">
                    <h2 className="mr-2 tablet:mr-[30px]">Deleting...</h2>
                  </div>
                )}
              </div>
            </div>
          </article>
          {/* {showModal && (
            <DeleteModal
              entityType="athlete"
              entityName={`${athlete.firstName} ${athlete.lastName}`}
              entityId={athlete.id}
              setShowModal={setShowModal}
              handleDeleteAthlete={handleDeleteAthlete}
              isSending={isSending}
              setIsSending={setIsSending}
            />
          )} */}
        </>
      )}
    </>
  );
};

export default RosterItem;
