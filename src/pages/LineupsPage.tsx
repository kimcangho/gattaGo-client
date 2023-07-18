import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import { LineupData, RosterData } from "../interfaces/EntityData";
import { CreateNewLineupFormData } from "../interfaces/FormData";
import DragonBoatSeating from "../components/DragonBoatSeating";

const LineupsPage = (): JSX.Element => {
  const [teamLineups, setTeamLineups] = useState<LineupData | {} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rosterAthletes, setRosterAthletes] = useState<RosterData[]>([]);
  const { teamId } = useParams<string>();
  const { width } = useWindowSize();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateNewLineupFormData>({
    defaultValues: {
      activeLineup: "",
      lineupName: "",
      boatOrder: [],
    },
  });

  useEffect(() => {
    const getLineups = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/lineups`);
        setTeamLineups(data);
      } catch (err: any) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    const getAthletes = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/athletes`);
        setRosterAthletes(data);
      } catch (err: any) {
        console.log(err);
      }
    };

    getLineups();
    getAthletes();
  }, []);

  const handleFormSubmit = async ({}: // activeLineup,
  // lineupName,
  // boatOrder,
  CreateNewLineupFormData) => {
    //  Return if no lineup name and no active lineup selected
    console.log("Save function");
    // const getLineupAthletes = async () => {
    //   try {
    //     const { data } = await axiosPrivate.get(`teams/${teamId}/athletes`);
    //     console.log(data);
    //   } catch (err) {
    //     console.log(err);
    //   }

    //   //  Create new lineup
    //   try {
    //     //  when a lineup is chosen in dropdown list, make api request to get all lineup athletes
    //     //  API POST Request
    //   } catch (err) {}

    //   //  Update existing lineup
    //   try {
    //     //  API PUT request
    //   } catch (err) {}
  };

  const handleLineupStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    // if (event.target.value === "select") {
    //   setValue("lineupName", "");
    //   setIsModalOpen(false);
    // } else
    if (event.target.value === "new") {
      setValue("lineupName", "");
    } else {
      setValue("lineupName", event.target.value);
    }
  };

  const handleToggleModal = (): void => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center desktop:max-w-[1280px] mx-auto mt-4 tablet:mb-0 overflow-hidden">
        <div className="mb-4">
          <h1>Lineups</h1>
          {/* @ts-ignore */}
          {teamLineups && teamLineups.lineups && (
            <p className="text-black">
              {/* @ts-ignore */}
              Total: {teamLineups.lineups.length} lineup
              {/* @ts-ignore */}
              {teamLineups.lineups.length !== 1 && `s`}
            </p>
          )}
        </div>
        <button
          onClick={handleSubmit(handleFormSubmit)}
          className="bg-green-light hover:bg-green-dark border-green-dark text-white p-2 rounded border"
        >
          Save Lineup
        </button>
      </div>

      <form className="flex flex-col midMobile:flex-row p-2 mb-2 tablet:p-6 midMobile:space-x-4 tablet:space-x-6 desktop:max-w-[1280px] mx-auto bg-white border border-gray-border rounded-t w-full">
        <div className="flex flex-col mb-4 midMobile:w-[50%]">
          <label htmlFor="activeLineup">
            <h3 className="text-blue-light">Active Lineup</h3>
          </label>
          <select
            {...register("activeLineup")}
            name="activeLineup"
            id="activeLineup"
            defaultValue={"select"}
            className="px-2 py-3 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
            onChange={handleLineupStatus}
          >
            <option disabled value="select">
              Select lineup
            </option>
            <option value="new">New lineup</option>
            {teamLineups &&
              // @ts-ignore
              teamLineups.lineups &&
              // @ts-ignore
              teamLineups.lineups.map((lineup) => {
                return (
                  <option key={lineup.id} value={lineup.name}>
                    {lineup.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="flex flex-col midMobile:w-[50%]">
          <label htmlFor="lineupName">
            <h3 className="text-blue-light">Lineup Name</h3>
          </label>
          <input
            {...register("lineupName", {
              required: {
                value: true,
                message: "Lineup name field can't be empty!",
              },
            })}
            type="text"
            id="lineupName"
            name="lineupName"
            placeholder="Input lineup name"
            className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          />
          {errors.lineupName && (
            <p className="text-red-500">{errors.lineupName.message}</p>
          )}
        </div>
      </form>

      <DragonBoatSeating
        width={width}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleToggleModal={handleToggleModal}
        rosterAthletes={rosterAthletes}
      />

      {/* To-do Part 2 - Mobile View Card */}
      {/* Modal with side tab - contains all team athletes */}
      {/* Modal will be drag + drop enabled with floating tab on bottom left, can also scroll independent from page */}
      {/* Athlete bars containg drag and drop tiles that can migrate from modal to dragonboat */}
      {/* When tile is moved outside of modal, collapse modal. */}
      {/* When tile is dropped into appropriate spot on dragonboat, uncollapse modal */}
      {/* Tab visible in mobile from 320px to 448px */}
      {/* Dragonboat and tiles expand from 320px to 448 px */}
      {/* From 448px to 768px, can now bring unhide modal and move to right side as column of tiles */}

      {/* To-do Part 3 - Tablet + Desktop Views */}
      {/* from 768px to 1280 px, show fixed dragonboat on left and roster list on right @ 50% width share */}
      {/* Dragonboat size expands up to a fixed width ~ 50% of container */}
      {/* Roster list starts off as single column of tiles, then double column of tiles, then list of athletes with tiles + stats */}
      {/* container max-width at 1280px, horizontal auto-margins */}
    </div>
  );
};

export default LineupsPage;
