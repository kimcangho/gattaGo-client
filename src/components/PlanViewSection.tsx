import EventPlanSection from "./RacePlanSections/EventPlanSection";
import LineupPlanSection from "./RacePlanSections/LineupPlanSection";
import MapPlanSection from "./RacePlanSections/MapPlanSection";
import NotesPlanSection from "./RacePlanSections/NotesPlanSection";
import RegattaPlanSection from "./RacePlanSections/RegattaPlanSection";
import WeatherPlanSection from "./RacePlanSections/WeatherPlanSection";

interface PlanOrderData {
  id: string;
  section: string;
}
interface PlanViewSectionProps {
  planOrder: PlanOrderData[];
}

const PlanViewSection = ({ planOrder }: PlanViewSectionProps) => {

  return (
    <div className="flex flex-col space-y-4">
      {planOrder.map((planSection: PlanOrderData) => {
        switch (planSection.section) {
          //  Regatta Section
          case "Regatta":
            return (
              <RegattaPlanSection
                id={planSection.id}
                section={planSection.section}
              />
            );
          //  Weather Section - Use External API
          case "Weather":
            return <WeatherPlanSection section={planSection.section} />;
          //  Map Section - Use External API
          case "Map":
            return <MapPlanSection section={planSection.section} />;
          //  Event Section
          case "Event":
            return <EventPlanSection section={planSection.section} />;
          //  Lineup Section
          case "Lineup":
            return <LineupPlanSection section={planSection.section} />;
          //  Notes Section
          case "Notes":
            return <NotesPlanSection section={planSection.section} />;
          //  Escape Hatch
          default:
            break;
        }
      })}
    </div>
  );
};

export default PlanViewSection;
