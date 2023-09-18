import EventPlanSection from "./RacePlanSections/EventPlanSection";
import LineupPlanSection from "./RacePlanSections/LineupPlanSection";
import MapPlanSection from "./RacePlanSections/MapPlanSection";
import NotesPlanSection from "./RacePlanSections/NotesPlanSection";
import RegattaPlanSection from "./RacePlanSections/RegattaPlanSection";
import WeatherPlanSection from "./RacePlanSections/WeatherPlanSection";

interface PlanOrderData {
  id: string;
  section: string;
  sectionId: string;
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

interface PlanViewSectionProps {
  planOrder: PlanOrderData[];
  setRegattaSectionArr: Function;
  eventSectionArr: EventSectionData[];
  setEventSectionArr: Function;
  setLineupSectionArr: Function;
  notesSectionArr: NotesSectionData[];
  setNotesSectionArr: Function;
}

const PlanViewSection = ({
  planOrder,
  setRegattaSectionArr,
  eventSectionArr,
  setEventSectionArr,
  setLineupSectionArr,
  notesSectionArr,
  setNotesSectionArr,
}: PlanViewSectionProps) => {
  //  Filter correct section
  const filterSection = (sectionArr: any[], identifier: string) => {
    const foundSection = sectionArr.find((section) => {
      return identifier === section.id;
    });

    return foundSection;
  };

  return (
    <div className="flex flex-col space-y-4">
      {planOrder.map((planSection: PlanOrderData) => {
        switch (planSection.section) {
          //  Regatta Section - OK
          case "Regatta":
            return (
              <RegattaPlanSection
                key={planSection.id}
                id={planSection.id}
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
                section={planSection.section}
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
