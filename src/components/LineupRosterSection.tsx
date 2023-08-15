import LineupAthleteItem from "./LineupAthleteItem";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import { RosterData } from "../interfaces/EntityData";
import { Active, Over } from "@dnd-kit/core";
import { useParams } from "react-router-dom";
import EmptyAthlete from "./EmptyAthlete";

interface LineupRosterSectionProps {
  rosterAthletes: RosterData[];
  width: number | undefined;
  activeId: Active | string | number;
  overId: Over | string | number;
  isLoading: boolean;
}

const LineupRosterSection = ({
  rosterAthletes,
  width,
  activeId,
  isLoading,
}: LineupRosterSectionProps) => {
  const { userId, teamId } = useParams();
  const isPresent = useIsPresent();

  return (
    <div
      onClick={(event) => {
        event?.stopPropagation();
      }}
      className={`bg-white flex-1 inline-block border tablet:border-none border-gray-border shadow-md tablet:shadow-lg fixed top-[7rem] left-0 tablet:static w-[calc(100%-1.5rem)] tablet:w-full h-[calc(90%-4rem-0.5px)] overflow-auto max-h-[80rem] p-2 z-30 ${
        width! < 768 && activeId && "opacity-0"
      }`}
    >
      <div className="flex flex-col tablet:flex-row justify-between tablet:items-center">
        <div className="text-black mb-2">
          <h1>Roster</h1>
          {!isLoading && rosterAthletes.length !== 0 && (
            <p className="text-black">
              Total: {rosterAthletes.length} paddler
              {rosterAthletes.length !== 1 && `s`}
            </p>
          )}
        </div>
        <div className="flex space-x-2 w-auto text-black font-bold mb-4">
          <p className="h-fit bg-gray-border rounded-3xl w-24 tablet:mt-2 text-center">
            Side
          </p>
          <p className="bg-green-light px-2 rounded-3xl tablet:mt-2 text-center h-fit">
            Eligibility
          </p>
          <p className="bg-orange-light px-2 rounded-3xl tablet:mt-2 text-center h-fit">
            Weight
          </p>
          {width! >= 448 && (
            <p className="bg-blue-wavy px-2 rounded-3xl tablet:mt-2 text-center h-fit">
              Skill
            </p>
          )}
        </div>
      </div>
      <AnimatePresence>
        {rosterAthletes.length === 0 ? (
          <EmptyAthlete userId={userId} teamId={teamId} />
        ) : (
          rosterAthletes &&
          rosterAthletes.map(({ athlete }: RosterData) => {
            return (
              <motion.div
                layout
                style={{ position: isPresent ? "static" : "absolute" }}
                key={athlete.id}
                initial={{ opacity: 0 }}
                animate={isPresent ? { opacity: 1 } : { opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 50,
                  mass: 1,
                }}
              >
                <LineupAthleteItem
                  key={athlete.id}
                  width={width}
                  athlete={athlete}
                  athleteId={athlete.id}
                />
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
};

export default LineupRosterSection;
