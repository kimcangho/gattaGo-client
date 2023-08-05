import { useState } from "react";
import { nanoid } from "nanoid";
import LineupRosterSection from "./LineupRosterSection";
import LineupModalButton from "./LineupModalButton";
import LineupSeat from "./LineupSeat";
import { RosterData } from "../interfaces/EntityData";
import { transformLineupsToSeats } from "../utils/transformLineupsToSeats";
import { calculateBoatWeights } from "../utils/calculateBoatWeights";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { filterOutBoatAthletes } from "../utils/filterOutBoatAthletes";

interface DragonBoatSeatingProps {
  width: number | undefined;
  rosterAthletes: RosterData[];
  activeLineup: any[];
  setActiveLineup: any;
  lineupId: string;
}

const LineupBoatSection = ({
  width,
  rosterAthletes,
  activeLineup,
  setActiveLineup,
  lineupId,
}: DragonBoatSeatingProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<any>("");

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const boatWeight = calculateBoatWeights(activeLineup);
  const { frontWeight, backWeight, leftWeight, rightWeight } = boatWeight;

  const handleDragStart = (event: DragStartEvent): void => {
    const foundAthleteInActiveLineup = activeLineup.find(
      (paddler) => paddler.athleteId == event.active.id
    );
    if (!foundAthleteInActiveLineup) {
      setActiveId(event.active.id);
    }
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { over, active } = event;
    setActiveId("");

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
        setActiveLineup((prevLineup: any) => {
          const newLineup = prevLineup;

          newLineup.forEach((athlete: any) => {
            if (athlete.athleteId === active.id) {
              newLineup[athlete.position] = {
                athlete: { isEmpty: true, id: nanoid() },
                athleteId: nanoid(),
                id: nanoid(),
                position: athlete.position,
                updatedAt: null,
              };
            }
          });

          return [...newLineup];
        });
        return;
      } else if (active.id === over?.id) {
        return;
      } else {
        setActiveLineup((prevLineup: any) => {
          const newLineup = prevLineup;

          const tempPosition = foundActive.position;
          newLineup[foundActive.position].position = foundOver.position;
          newLineup[foundOver.position].position = tempPosition;

          newLineup.sort((a: any, b: any) => {
            if (a.position < b.position) return -1;
            else return 1;
          });

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
        setActiveLineup((prevLineup: any) => {
          const newLineup = prevLineup;
          newLineup[foundOver.position] = {
            ...foundActive,
            position: foundOver.position,
            lineupId,
          };
          delete newLineup[foundOver.position].teamId;

          newLineup.sort((a: any, b: any) => {
            if (a.position < b.position) return -1;
            else return 1;
          });

          return [...newLineup];
        });
      } else {
        setActiveLineup((prevLineup: any) => {
          const newLineup = prevLineup;

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

  return (
    <div className="flex justify-center max-w-full desktop:max-w-[1280px] max-h-[84rem] mx-auto bg-white border rounded-md border-gray-border flex-2">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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

            <div className="mx-auto">
              {activeLineup &&
                activeLineup.length &&
                transformLineupsToSeats(activeLineup).map(
                  (row: any, index: number) => {
                    return <LineupSeat key={index} seat={index} row={row} />;
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
          />
        )}
      </DndContext>

      <LineupModalButton
        width={width}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleToggleModal={handleToggleModal}
      />
    </div>
  );
};

export default LineupBoatSection;
