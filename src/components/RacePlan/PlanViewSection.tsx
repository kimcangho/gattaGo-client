import EventPlanSection from "./EventPlanSection";
import LineupPlanSection from "./LineupPlanSection";
import MapPlanSection from "./MapPlanSection";
import NotesPlanSection from "./NotesPlanSection";
import RegattaPlanSection from "./RegattaPlanSection";
import WeatherPlanSection from "./WeatherPlanSection";
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
      // console.log(section.id, identifier);
      return identifier === section.id;
    });

    return foundSection;
  };

  return (
    <div className="flex flex-col space-y-4 rounded-lg shadow-lg">
      {planOrder.map((planSection: PlanOrderData) => {
        switch (planSection.section) {
          //  Regatta Section - OK
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
          //  Weather Section - Use External API
          case "Weather":
            return (
              <WeatherPlanSection
                key={planSection.id}
                id={planSection.id}
                section={planSection.section}
              />
            );
          //  Map Section - Use External API
          case "Map":
            return (
              <MapPlanSection
                key={planSection.id}
                id={planSection.id}
                mapSection={filterSection(mapSectionArr, planSection.sectionId)}
                setMapSectionArr={setMapSectionArr}
              />
            );
          //  Event Section - OK
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
          //  Lineup Section - Suspended
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
          //  Notes Section - OK
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
