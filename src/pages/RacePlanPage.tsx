import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useWindowSize from "../hooks/useWindowSize";
import RaceSectionItem from "../components/RaceSectionItem";
import RaceOrderItem from "../components/RaceOrderItem";
import PlanBuilderModalButton from "../components/PlanBuilderModalButton";
import EmptyRacePlan from "../components/EmptyRacePlan";
import PlanViewSection from "../components/PlanViewSection";
import checkIcon from "../assets/icons/check.svg";
import clearIcon from "../assets/icons/cube-transparent.svg";
import shareIcon from "../assets/icons/share.svg";
import deleteWhiteIcon from "../assets/icons/delete-white-fill.svg";

//  imported libraries
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

interface PlanOrderData {
  id: string;
  section: string;
  sectionId: string;
}

interface RegattaSectionData {
  id: string;
  regattaName: string;
  regattaStartDate: Date;
  regattaEndDate: Date;
  regattaAddress: string;
  regattaContact: string;
  regattaEmail: string;
  regattaPhone: string;
}

interface LineupSectionData {
  id: string;
  lineupName: string;
  boatOrder: (string | null)[];
}

interface EventSectionData {
  id: string;
  eventName: string;
  eventDistance: string;
  eventLane: String;
  eventTime: Date;
}

interface NotesSectionData {
  id: string;
  notesName: string;
  notesBody: string;
}

const RacePlanPage = () => {
  const planSections = [
    "Regatta",
    "Weather",
    "Map",
    "Event",
    "Lineup",
    "Notes",
  ];

  //  RHF states
  const [racePlans, setRacePlans] = useState<any[]>([]);
  const [selectDefaultValue, setSelectDefaultValue] = useState<string>("");
  const [planOrder, setPlanOrder] = useState<PlanOrderData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [racePlanName, setRacePlanName] = useState<string>("")

  const [regattaSectionArr, setRegattaSectionArr] = useState<
    RegattaSectionData[] | []
  >([]);
  const [eventSectionArr, setEventSectionArr] = useState<
    EventSectionData[] | []
  >([]);
  const [lineupSectionArr, setLineupSectionArr] = useState<
    LineupSectionData[] | []
  >([]);
  const [notesSectionArr, setNotesSectionArr] = useState<
    NotesSectionData[] | []
  >([]);

  //  Added hooks
  const { teamId } = useParams();
  const { width } = useWindowSize();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      activeRacePlanId: "new",
      racePlanName: "",
    },
  });
  const watchRacePlanName = watch("racePlanName");

  useEffect(() => {
    const getRacePlans = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/racePlans/`);
        setRacePlans(data);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getRacePlans();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPlanOrder((plans) => {
        const oldIndex = plans.map((plan) => plan.id).indexOf(active.id);
        const newIndex = plans.map((plan) => plan.id).indexOf(over.id);
        return [...arrayMove(plans, oldIndex, newIndex)];
      });
    }
  };

  const handleToggleModal = () => {
    // if (isSaving || isDeleting || isFetching) return;
    setIsModalOpen((prev) => !prev);
  };

  const handleGetSinglePlan = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectDefaultValue(event.target.value);
    if (event.target.value === "new") {
      try {
        handleClearPlan();
        setValue("racePlanName", "");
        setValue("activeRacePlanId", "new");
      } catch (err: unknown) {
        console.log(err);
      }
    } else {
      try {
        // setIsFetching(true);
        const { data } = await axiosPrivate.get(
          `/teams/${teamId}/racePlans/${event.target.value}`
        );

        console.log(data);

        setPlanOrder(
          data.planSections.sort((a: any, b: any) =>
            a.order > b.order ? 1 : -1
          )
        );
        setRegattaSectionArr(data.regattaSection);
        setEventSectionArr(data.eventSection);
        setNotesSectionArr(data.notesSection);
        setLineupSectionArr(data.lineupSection);
        setValue("racePlanName", data.name);
        setValue("activeRacePlanId", data.id);
        // setIsFetching(false);
      } catch (err: unknown) {
        console.log(err);
      }
    }
  };

  //  Save Plan Function - To-do for lineup / map / weather sections
  const handleSavePlan = async ({ racePlanName, activeRacePlanId }: any) => {
    // if (isSaving || isDeleting || isFetching) return;
    const createRacePlan = async () => {
      if (!racePlanName) return;
      const duplicatePlan = racePlans?.find(
        (racePlan) => racePlan.name === racePlanName
      );
      if (duplicatePlan) return;

      try {
        // setIsSaving(true);
        const { data } = await axiosPrivate.post(`teams/${teamId}/racePlans`, {
          name: racePlanName,
          planOrder,
          regattaArr: regattaSectionArr,
          eventArr: eventSectionArr,
          lineupArr: lineupSectionArr,
          notesArr: notesSectionArr,
        });

        setSelectDefaultValue(data.id);
        setRacePlans((prevRacePlans: any[] | null) => {
          return [...prevRacePlans!, data];
        });

        setValue("activeRacePlanId", data.id);
        setValue("racePlanName", data.name);
        // setIsSaving(false);
      } catch (err: unknown) {
        console.log(err);
      }
    };

    const updateRacePlan = async () => {
      if (!racePlanName) return;

      const duplicatePlan = racePlans?.find(
        (plan) => plan.name === racePlanName && plan.id !== activeRacePlanId
      );
      if (duplicatePlan) return;

      try {
        // setIsSaving(true);
        console.log(
          racePlanName,
          planOrder,
          regattaSectionArr,
          lineupSectionArr,
          eventSectionArr,
          notesSectionArr
        );
        const { data } = await axiosPrivate.put(
          `teams/${teamId}/racePlans/${getValues("activeRacePlanId")}`,
          {
            name: racePlanName,
            planOrder,
            regattaArr: regattaSectionArr,
            lineupArr: lineupSectionArr,
            eventArr: eventSectionArr,
            notesArr: notesSectionArr,
          }
        );

        setRacePlans((prevRacePlans) => {
          const updatedRacePlans = prevRacePlans;
          updatedRacePlans?.forEach((racePlan) => {
            if (racePlan.id === data.racePlanId) racePlan.name = data.name; //  double check if property is data.id or data.racePlanId
          });
          return [...updatedRacePlans];
        });

        setSelectDefaultValue(data.racePlanId); //  double check if property is data.id or data.racePlanId
        setValue("activeRacePlanId", data.racePlanId); //  double check if property is data.id or data.racePlanId
        setValue("racePlanName", data.name);
        // setIsSaving(false);
      } catch (err: unknown) {
        console.log(err);
      }
    };

    if (activeRacePlanId === "new") {
      createRacePlan();
    } else {
      updateRacePlan();
    }
  };

  const handleClearPlan = async () => {
    if (planOrder.length === 0) return;
    setPlanOrder([]);
    setRegattaSectionArr([]);
    setLineupSectionArr([]);
    setEventSectionArr([]);
    setNotesSectionArr([]);
  };

  //  Share Plan Function
  const handleSharePlan = async () => {
    //  Create or update plan
    console.log("sharing plan...");
  };

  const handleDeletePlan = async () => {
    if (!getValues("activeRacePlanId")) return;
    // if (isSaving || isDeleting || isFetching) return;

    const deleteSinglePlan = async (racePlanId: string) => {
      try {
        // setIsDeleting(true);
        await axiosPrivate.delete(`/teams/${teamId}/racePlans/${racePlanId}`, {
          withCredentials: true,
        });

        setRacePlans((prevRacePlans) =>
          prevRacePlans!.filter((racePlan: any) => racePlan.id !== racePlanId)
        );
        handleClearPlan();
        setValue("activeRacePlanId", "new");
        setValue("racePlanName", "");
        // setIsDeleting(false);
      } catch (err: unknown) {
        console.log(err);
      }
    };

    if (getValues().activeRacePlanId === "new") return;
    deleteSinglePlan(getValues().activeRacePlanId);
  };

  return (
    <>
      <div className="w-full h-[100%]">
        <div className="flex flex-wrap justify-between items-center desktop:max-w-[1280px] mx-auto my-2 overflow-hidden">
          <div className="mb-2">
            <h1>Race Plans</h1>
            <p className="text-black">
              {" "}
              {`Total: ${!racePlans ? "-" : racePlans?.length} plan${
                racePlans?.length !== 1 ? `s` : ""
              }`}
            </p>
          </div>
          <div className="flex space-x-2 tablet:space-x-4 text-center">
            {/* Save Plan Button  */}
            <div
              onClick={handleSubmit(handleSavePlan)}
              className={`flex items-center  text-white p-1 midMobile:p-2 rounded border
              ${
                watchRacePlanName
                  ? "hover:bg-green-dark bg-green-light cursor-pointer"
                  : "bg-gray-border cursor-not-allowed"
              }
               `}
            >
              {width! >= 768 && (
                <p className="mr-2 text-lg">Save {width! >= 1280 && "Plan"}</p>
              )}
              <img src={checkIcon} alt="Save Plan" className="h-6" />
            </div>

            {/* Clear Plan Button  */}
            <div
              onClick={handleClearPlan}
              className={`flex items-center  text-white p-1 midMobile:p-2 rounded border  
              ${
                planOrder.length === 0
                  ? "bg-gray-border cursor-not-allowed"
                  : "bg-orange-light hover:bg-orange-dark cursor-pointer"
              }`}
            >
              {width! >= 768 && (
                <p className="mr-2 text-lg">Clear {width! >= 1280 && "Plan"}</p>
              )}
              <img src={clearIcon} alt="Clear Plan" className="h-6" />
            </div>

            {/* Share Plan Button - To-do */}
            <div
              onClick={handleSharePlan}
              className={`flex items-center  text-white p-1 midMobile:p-2 rounded border ${
                planOrder.length === 0
                  ? "bg-gray-border cursor-not-allowed"
                  : "bg-blue-light hover:bg-blue-dark cursor-pointer"
              }`}
            >
              {width! >= 768 && (
                <p className="mr-2 text-lg">Share {width! >= 1280 && "Plan"}</p>
              )}
              <img src={shareIcon} alt="Share Plan" className="h-6" />
            </div>

            {/* Delete Plan Button  */}
            <div
              onClick={handleDeletePlan}
              className={`${
                getValues().activeRacePlanId === "new"
                  ? "bg-gray-border border-gray-border cursor-not-allowed"
                  : "bg-red-dark cursor-pointer"
              }  text-white p-1 midMobile:p-2 rounded border text-center flex items-center ${
                getValues().activeRacePlanId === "new"
                  ? "cursor-auto"
                  : "hover:bg-red-500"
              }`}
              // className="flex items-center bg-red-dark text-white p-1 midMobile:p-2 rounded border hover:bg-red-600 cursor-pointer"
            >
              {width! >= 768 && (
                <p className="mr-2 text-lg">
                  Delete {width! >= 1280 && "Plan"}
                </p>
              )}
              <img src={deleteWhiteIcon} alt="Share Plan" className="h-6" />
            </div>
          </div>
        </div>

        <form className="flex flex-col midMobile:flex-row p-2 midMobile:pb-0 mb-2 tablet:p-6 midMobile:space-x-4 tablet:space-x-6 desktop:max-w-[1280px] mx-auto bg-white border border-gray-border rounded-t w-full">
          <div className="flex flex-col mb-4 midMobile:w-[50%]">
            <label htmlFor="activeRacePlanId">
              <h3 className="text-blue-light">Active Plan</h3>
            </label>
            <select
              {...register("activeRacePlanId")}
              name="activeRacePlanId"
              id="activeRacePlanId"
              value={selectDefaultValue}
              className="px-2 py-3 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
              onChange={handleGetSinglePlan}
            >
              <option disabled>Select plan</option>
              <option value={"new"}>New plan</option>
              {racePlans &&
                racePlans.map((plan, index) => {
                  return (
                    <option key={index} value={plan.id}>
                      {plan.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="flex flex-col midMobile:w-[50%]">
            <label htmlFor="racePlanName">
              <h3 className="text-blue-light">Plan Name</h3>
            </label>
            <input
              {...register("racePlanName", {
                required: {
                  value: true,
                  message: "Plan name field can't be empty!",
                },
              })}
              onChange={(event) => {
                setValue("racePlanName", event.target.value);
              }}
              type="text"
              id="racePlanName"
              name="racePlanName"
              placeholder="Input plan name"
              className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
            />
            {errors.racePlanName && !watchRacePlanName && (
              <p className="text-red-500">{errors.racePlanName.message}</p>
            )}
          </div>
        </form>

        <div className="flex justify-between desktop:max-w-[1280px] tablet:mx-auto my-2 overflow-auto h-full">
          {/* Component Section - Side Panel in mobile, Visible in tablet onwards */}
          {(isModalOpen || width! >= 768) && (
            <div className="bg-slate-200 midMobile:min-w-[20rem] tablet:w-[30%] h-[75%] mr-2 px-2 z-30 overflow-auto fixed left-0 tablet:static w-[calc(100%-1.5rem)] border-gray-border border shadow-md">
              <h1>Plan Builder</h1>
              <h2 className="">
                {planOrder.length} Section{planOrder.length !== 1 && "s"}
              </h2>
              {/* Plan Components */}
              <div className="flex flex-col">
                <h2 className="mt-4 mb-1 text-center">
                  Click a section below to add to your plan!
                </h2>

                <div className="flex flex-col">
                  {planSections.map((planSection, index) => {
                    return (
                      <RaceSectionItem
                        key={index}
                        section={planSection}
                        setPlanOrder={setPlanOrder}
                        setRegattaSectionArr={setRegattaSectionArr}
                        setEventSectionArr={setEventSectionArr}
                        setLineupSectionArr={setLineupSectionArr}
                        setNotesSectionArr={setNotesSectionArr}
                      />
                    );
                  })}
                </div>
              </div>
              {planOrder.length === 0 ? (
                <h2 className="my-4 text-center">
                  Select a component above to start building your race plan!
                </h2>
              ) : (
                <>
                  <h2 className="mt-4 text-center">
                    Drag-and-drop to change plan order!
                  </h2>
                  <div className="overflow-auto">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[
                        restrictToParentElement,
                        restrictToVerticalAxis,
                      ]}
                    >
                      <SortableContext
                        items={planOrder}
                        strategy={verticalListSortingStrategy}
                      >
                        {planOrder.map((planSection) => {
                          return (
                            <RaceOrderItem
                              key={planSection.id}
                              id={planSection.id}
                              section={planSection.section}
                              planOrder={planOrder}
                              setPlanOrder={setPlanOrder}
                              setRegattaSectionArr={setRegattaSectionArr}
                              setEventSectionArr={setEventSectionArr}
                              setLineupSectionArr={setLineupSectionArr}
                              setNotesSectionArr={setNotesSectionArr}
                            />
                          );
                        })}
                      </SortableContext>
                    </DndContext>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Modal Overlay */}
          {isModalOpen && (
            <div
              className={`${
                width! < 768
                  ? "bg-black opacity-20 fixed top-0 left-0 w-screen h-screen"
                  : ""
              }`}
              onClick={() => {
                setIsModalOpen(false);
              }}
            ></div>
          )}

          {/* Plan Section - Viewable/Editable components */}
          <div className="bg-red-light w-full min-h-full">
            {planOrder.length === 0 ? (
              <EmptyRacePlan />
            ) : (
              <PlanViewSection
                planOrder={planOrder}
                regattaSectionArr={regattaSectionArr}
                setRegattaSectionArr={setRegattaSectionArr}
                eventSectionArr={eventSectionArr}
                setEventSectionArr={setEventSectionArr}
                lineupSectionArr={lineupSectionArr}
                setLineupSectionArr={setLineupSectionArr}
                notesSectionArr={notesSectionArr}
                setNotesSectionArr={setNotesSectionArr}
              />
            )}
          </div>
        </div>
      </div>
      <PlanBuilderModalButton
        width={width}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleToggleModal={handleToggleModal}
        // isSaving={isSaving}
        // isDeleting={isDeleting}
        // isFetching={isFetching}
      />
    </>
  );
};

export default RacePlanPage;
