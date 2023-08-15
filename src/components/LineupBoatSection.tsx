import { useState } from "react";
import { nanoid } from "nanoid";
import LineupRosterSection from "./LineupRosterSection";
import LineupModalButton from "./LineupModalButton";
import LineupSeat from "./LineupSeat";
import { ActiveLineupData, RosterData } from "../interfaces/EntityData";
import { transformLineupsToSeats } from "../utils/transformLineupsToSeats";
import { calculateBoatWeights } from "../utils/calculateBoatWeights";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  DragOverlay,
  Active,
  Over,
} from "@dnd-kit/core";
import { filterOutBoatAthletes } from "../utils/filterOutBoatAthletes";
import LineupDragOverlaySpot from "./LineupDragOverlaySpot";

interface LineupBoatSectionProps {
  width?: number;
  rosterAthletes: RosterData[];
  activeLineup: ActiveLineupData[];
  setActiveLineup: React.Dispatch<React.SetStateAction<ActiveLineupData[]>>;
  lineupId: string;
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  isFetching: boolean;
}

const LineupBoatSection = ({
  width,
  rosterAthletes,
  activeLineup,
  setActiveLineup,
  lineupId,
  isLoading,
  isSaving,
  isDeleting,
  isFetching,
}: LineupBoatSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<Active | string | number>("");
  const [overId, setOverId] = useState<Over | string | number>("");

  const handleToggleModal = () => {
    if (isSaving || isDeleting || isFetching) return;
    setIsModalOpen((prev) => !prev);
  };

  const boatWeight = calculateBoatWeights(activeLineup);
  const { frontWeight, backWeight, leftWeight, rightWeight } = boatWeight;

  const handleDragStart = (event: DragStartEvent): void => {
    if (isSaving || isDeleting || isFetching) return;
    const { active } = event;
    setActiveId(active.id);
  };

  const handleWhileDrag = (event: DragMoveEvent): void => {
    if (isSaving || isDeleting || isFetching) return;
    const { over } = event;
    if (over) setOverId(over.id);
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    if (isSaving || isDeleting || isFetching) return;
    const { over, active } = event;
    setActiveId("");
    setOverId("");

    const foundAthleteInActiveLineup = activeLineup.find(
      (paddler) => paddler.athleteId == event.active.id
    );

    if (foundAthleteInActiveLineup) {
      const foundActive = activeLineup.find(
        (athlete) => athlete.athlete.id === active.id
      );

      const foundOver = activeLineup.find(
        (athlete) => athlete.athlete.id === over?.id
      );

      if (!foundOver) {
        setActiveLineup((prevLineup: ActiveLineupData[]) => {
          const newLineup = prevLineup;

          newLineup.forEach((athlete: ActiveLineupData) => {
            if (athlete.athleteId === active.id) {
              newLineup[athlete.position] = {
                athlete: { isEmpty: true, id: nanoid() },
                athleteId: nanoid(),
                id: nanoid(),
                position: athlete.position,
                updatedAt: new Date(),
              };
            }
          });

          return [...newLineup];
        });
        return;
      } else if (active.id === over?.id) return;
      else {
        setActiveLineup((prevLineup: ActiveLineupData[]) => {
          const newLineup: ActiveLineupData[] = prevLineup;

          const tempPosition = foundActive!.position;
          newLineup[foundActive!.position].position = foundOver.position;
          newLineup[foundOver.position].position = tempPosition;

          newLineup.sort(
            (
              initialAthlete: ActiveLineupData,
              nextAthlete: ActiveLineupData
            ) => {
              if (initialAthlete.position < nextAthlete.position) return -1;
              else return 1;
            }
          );

          return [...newLineup];
        });
      }
    } else {
      const foundActive = rosterAthletes.find(
        (athlete) => athlete.athlete.id === active.id
      );
      const foundOver = activeLineup.find(
        (athlete) => athlete.athlete.id === over?.id
      );

      if (!foundOver) return;

      if (foundOver.athlete.isEmpty) {
        setActiveLineup((prevLineup: ActiveLineupData[]) => {
          const newLineup = prevLineup;
          //@ts-ignore
          newLineup[foundOver.position] = {
            ...foundActive,
            position: foundOver.position,
            lineupId,
          };
          delete newLineup[foundOver.position].teamId;

          newLineup.sort(
            (
              initialAthlete: ActiveLineupData,
              nextAthlete: ActiveLineupData
            ) => {
              if (initialAthlete.position < nextAthlete.position) return -1;
              else return 1;
            }
          );

          return [...newLineup];
        });
      } else {
        setActiveLineup((prevLineup: ActiveLineupData[]) => {
          const newLineup = prevLineup;
          //@ts-ignore
          newLineup[foundOver.position] = {
            ...foundActive,
            position: foundOver.position,
            lineupId,
          };
          delete newLineup[foundOver.position].teamId;

          return [...newLineup];
        });
      }
    }
  };

  const selectDraggableAthlete = (
    rosterAthletes: RosterData[],
    activeId: Active | string | number
  ) => {
    const foundAthlete = rosterAthletes.find(
      (athlete) => athlete.athleteId === activeId
    );
    return foundAthlete;
  };

  return (
    <div
      className={`flex justify-center max-w-full desktop:max-w-[1280px] max-h-[84rem] mx-auto bg-white border rounded-md border-gray-border flex-2 ${
        isSaving || isDeleting || isFetching ? "cursor-wait opacity-50" : ""
      }`}
    >
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleWhileDrag}
      >
        <div className="flex flex-col max-w-[448px] midMobile:max-w-full tablet:w-[408px] my-2 overflow-auto">
          <h1 className="text-center mb-2">
            Total Weight -{` `} {frontWeight + backWeight} lbs
          </h1>

          <h3 className="text-center">Front</h3>
          <h4 className="text-center">{frontWeight} lbs</h4>
          <div className="flex flex-row justify-center items-center max-w-[448px] space-x-2">
            <div className="w-12">
              <h3 className="text-center flex flex-col items-center">Left</h3>
              <h4 className="text-center">{leftWeight}</h4>
              <h4 className="text-center">lbs</h4>
            </div>

            <DragOverlay dropAnimation={null}>
              {activeId ? (
                <LineupDragOverlaySpot
                  athlete={selectDraggableAthlete(rosterAthletes, activeId)}
                  isSaving={isSaving}
                  isDeleting={isDeleting}
                  isFetching={isFetching}
                />
              ) : null}
            </DragOverlay>

            <div className="mx-auto">
              {activeLineup &&
                activeLineup.length &&
                transformLineupsToSeats(activeLineup).map(
                  (row: ActiveLineupData[], index: number) => {
                    return (
                      <LineupSeat
                        key={index}
                        seat={index}
                        row={row}
                        activeId={activeId}
                        overId={overId}
                        isSaving={isSaving}
                        isDeleting={isDeleting}
                        isFetching={isFetching}
                      />
                    );
                  }
                )}
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-center">Right</h3>
              <h4 className="text-center">{rightWeight}</h4>
              <h4 className="text-center">lbs</h4>
            </div>
          </div>
          <h3 className="text-center">Back</h3>
          <h4 className="text-center">{backWeight} lbs</h4>
        </div>

        {(isModalOpen || width! >= 768) && (
          <LineupRosterSection
            rosterAthletes={filterOutBoatAthletes(rosterAthletes, activeLineup)}
            width={width}
            activeId={activeId}
            overId={overId}
            isLoading={isLoading}
            isSaving={isSaving}
            isDeleting={isDeleting}
            isFetching={isFetching}
          />
        )}
      </DndContext>

      <LineupModalButton
        width={width}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleToggleModal={handleToggleModal}
        activeId={activeId}
        isSaving={isSaving}
        isDeleting={isDeleting}
        isFetching={isFetching}
      />
    </div>
  );
};

export default LineupBoatSection;
