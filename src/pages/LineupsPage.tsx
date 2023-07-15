import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import { LineupData } from "../interfaces/EntityData";
import { useForm } from "react-hook-form";
import { CreateNewLineupFormData } from "../interfaces/FormData";

const LineupsPage = (): JSX.Element => {
  const [teamLineups, setTeamLineups] = useState<LineupData | {}>({});
  const { teamId } = useParams<string>();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewLineupFormData>({
    defaultValues: {
      activeLineup: "",
      lineupName: "",
      boatOrder: [],
    },
  });

  useEffect(() => {
    //  get all lineups from team for dropdown list
    const getLineups = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/lineups`);
        setTeamLineups(data);
        console.log(data);
      } catch (err: any) {
        logoutRedirect("/login");
      }
    };

    //  get all athletesm from team to populate roster section
    const getAthletes = async () => {};

    getLineups();
    getAthletes();
  }, []);

  const handleFormSubmit = async ({
    activeLineup,
    lineupName,
    boatOrder,
  }: CreateNewLineupFormData) => {
    //  Return if no lineup name and no active lineup selected
    console.log(activeLineup);
    console.log(lineupName);

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

  return (
    <>
      <div className="flex flex-wrap justify-between items-center max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] mx-auto my-4 tablet:mb-0 overflow-hidden">
        <div className="mb-4">
          <h1>Lineups</h1>

          {teamLineups && teamLineups.lineups && (
            <p className="text-black" key={teamLineups.lineups.id}>
              Total: {teamLineups.lineups.length} lineup
              {teamLineups.lineups.length !== 1 && `s`}
            </p>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col p-2 tablet:p-6 max-w-[448px] bg-white border border-gray-border rounded-t w-full"
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="activeLineup">
            <h3 className="text-blue-light">Active Lineup</h3>
          </label>
          <select
            {...register("activeLineup")}
            name="activeLineup"
            id="activeLineup"
            defaultValue={"select"}
            className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
          >
            <option value="select">Select lineup</option>
            <option value="new">New lineup</option>
            {teamLineups &&
              teamLineups.lineups &&
              teamLineups.lineups.map((lineup) => {
                return <option value={lineup.id}>{lineup.name}</option>;
              })}
          </select>
        </div>

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

        <button
          type="submit"
          className="bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white"
        >
          Save Lineup
        </button>
      </form>

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
    </>
  );
};

export default LineupsPage;
