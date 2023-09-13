// import { useState } from "react";
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
  setRegattaSectionArr: Function;
}

const PlanViewSection = ({
  planOrder,
  setRegattaSectionArr,
}: PlanViewSectionProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {planOrder.map((planSection: PlanOrderData) => {
        switch (planSection.section) {
          //  Regatta Section
          case "Regatta":
            return (
              <RegattaPlanSection
                key={planSection.id}
                id={planSection.id}
                section={planSection.section}
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
          //  Event Section
          case "Event":
            return (
              <EventPlanSection
                key={planSection.id}
                id={planSection.id}
                section={planSection.section}
              />
            );
          //  Lineup Section
          case "Lineup":
            return (
              <LineupPlanSection
                key={planSection.id}
                id={planSection.id}
                section={planSection.section}
              />
            );
          //  Notes Section
          case "Notes":
            return (
              <NotesPlanSection
                key={planSection.id}
                id={planSection.id}
                section={planSection.section}
              />
            );
          //  Escape Hatch
          default:
            break;
        }
      })}
    </div>
  );
};

export default PlanViewSection;
