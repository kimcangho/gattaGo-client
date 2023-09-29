import EventPlanSection from "./EventPlanSection";
import LineupPlanSection from "./LineupPlanSection";
import MapPlanSection from "./MapPlanSection";
import NotesPlanSection from "./NotesPlanSection";
import RegattaPlanSection from "./RegattaPlanSection";
import {
  PlanOrderData,
  RegattaSectionData,
  MapSectionData,
  EventSectionData,
  LineupSectionData,
  NotesSectionData,
} from "../../interfaces/RacePlanData";

interface PlanViewSectionProps {
  planOrder: PlanOrderData[];
  regattaSectionArr: RegattaSectionData[];
  setRegattaSectionArr: Function;
  mapSectionArr: MapSectionData[];
  setMapSectionArr: Function;
  eventSectionArr: EventSectionData[];
  setEventSectionArr: Function;
  lineupSectionArr: LineupSectionData[];
  setLineupSectionArr: Function;
  notesSectionArr: NotesSectionData[];
  setNotesSectionArr: Function;
}

const PlanViewSection = ({
  planOrder,
  regattaSectionArr,
  setRegattaSectionArr,
  mapSectionArr,
  setMapSectionArr,
  eventSectionArr,
  setEventSectionArr,
  lineupSectionArr,
  setLineupSectionArr,
  notesSectionArr,
  setNotesSectionArr,
}: PlanViewSectionProps) => {
  const filterSection = (sectionArr: any[], identifier: string) => {
    const foundSection = sectionArr.find((section) => {
      return identifier === section.id;
    });

    return foundSection;
  };

  return (
    <div className="flex flex-col space-y-4 rounded-lg">
      {planOrder.map((planSection: PlanOrderData) => {
        switch (planSection.section) {
          case "Regatta":
            return (
              <RegattaPlanSection
                key={planSection.id}
                id={planSection.id}
                regattaSection={filterSection(
                  regattaSectionArr,
                  planSection.sectionId
                )}
                setRegattaSectionArr={setRegattaSectionArr}
              />
            );

          case "Map":
            return (
              <MapPlanSection
                key={planSection.id}
                id={planSection.id}
                mapSection={filterSection(mapSectionArr, planSection.sectionId)}
                setMapSectionArr={setMapSectionArr}
              />
            );

          case "Event":
            return (
              <EventPlanSection
                key={planSection.id}
                id={planSection.id}
                eventSection={filterSection(
                  eventSectionArr,
                  planSection.sectionId
                )}
                setEventSectionArr={setEventSectionArr}
              />
            );

          case "Lineup":
            return (
              <LineupPlanSection
                key={planSection.id}
                id={planSection.id}
                lineupSection={filterSection(
                  lineupSectionArr,
                  planSection.sectionId
                )}
                setLineupSectionArr={setLineupSectionArr}
              />
            );

          case "Notes":
            return (
              <NotesPlanSection
                key={planSection.id}
                id={planSection.id}
                notesSection={filterSection(
                  notesSectionArr,
                  planSection.sectionId
                )}
                setNotesSectionArr={setNotesSectionArr}
              />
            );
          default:
            break;
        }
      })}
    </div>
  );
};

export default PlanViewSection;
