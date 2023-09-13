interface PlanOrderData {
  id: string;
  section: string;
}
interface PlanViewSectionProps {
  planOrder: PlanOrderData[];
}

const PlanViewSection = ({ planOrder }: PlanViewSectionProps) => {
  return (
    <div>
      {planOrder.map((planSection: PlanOrderData) => {
        switch (planSection.section) {
          //  Regatta Section
          case "Regatta":
            return <p>{planSection.section} under construction...</p>;
          //  Weather Section - Use External API
          case "Weather":
            return <p>{planSection.section} under construction...</p>;
          //  Map Section - Use External API
          case "Map":
            return <p>{planSection.section} under construction...</p>;
          //  Event Section
          case "Event":
            return <p>{planSection.section} under construction...</p>;
          //  Lineup Section
          case "Lineup":
            return <p>{planSection.section} under construction...</p>;
          //  Notes Section
          case "Notes":
            return <p>{planSection.section} under construction...</p>;
          default:
            break;
        }
      })}
    </div>
  );
};

export default PlanViewSection;
