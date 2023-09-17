import { nanoid } from "nanoid";

interface PlanOrderData {
  id: string;
  section: string;
}

interface RegattaSectionData {
  id: string;
  regattaName: string;
  regattaStartDate: Date;
  regattaEndDate: Date;
  regattaAddress: string;
  regattaContact: string;
  regattaEmail: string;
  regattaPhone: string;
}

interface EventSectionData {
  id: string;
  eventName: string;
  eventDistance: string;
  eventLane: string;
  eventTime: Date;
}

interface LineupSectionData {
  id: string;
  lineupName: string;
  boatOrder: (string | null)[];
}

interface NotesSectionData {
  id: string;
  notes: string;
}

interface RaceSectionItemProps {
  section: string;
  setPlanOrder: React.Dispatch<React.SetStateAction<PlanOrderData[]>>;
  setRegattaSectionArr: Function;
  setEventSectionArr: Function;
  setLineupSectionArr: Function;
  setNotesSectionArr: Function;
}

const RaceSectionItem = ({
  section,
  setPlanOrder,
  setRegattaSectionArr,
  setEventSectionArr,
  setLineupSectionArr,
  setNotesSectionArr,
}: RaceSectionItemProps) => {
  const handleSetPlanOrder = () => {
    const id = nanoid();
    setPlanOrder((planOrder) => [...planOrder, { id, section }]);

    console.log(section)
    switch (section) {
      case "Regatta":
        console.log('switch regattas racesectionitem')
        setRegattaSectionArr((regattaSections: RegattaSectionData[]) => {
          return [
            ...regattaSections,
            {
              id,
              regattaName: "",
              regattaStartDate: null,
              regattaEndDate: null,
              regattaAddress: "",
              regattaContact: "",
              regattaEmail: "",
              regattaPhone: "",
            },
          ];
        });
        break;
      case "Event":
        setEventSectionArr((eventSections: EventSectionData[]) => {
          return [
            ...eventSections,
            {
              id,
              eventName: "",
              eventDistance: "",
              eventLane: "",
              eventLineup: "",
              eventTime: "",
            },
          ];
        });
        break;
      case "Lineup":
        setLineupSectionArr((lineupSections: LineupSectionData[]) => {
          return [
            ...lineupSections,
            {
              id,
              lineupName: "",
              boatOrder: []
            },
          ];
        });
        break;
      case "Notes":
        setNotesSectionArr((noteSections: NotesSectionData[]) => {
          return [
            ...noteSections,
            {
              id,
              notes: "",
            },
          ];
        });
        break;

      default:
        break;
    }
  };

  return (
    <div
      onClick={handleSetPlanOrder}
      className="flex justify-center px-2 border border-black rounded-md my-1 p-1 cursor-pointer hover:bg-gray-border"
    >
      <h2 className="text-lg">{section}</h2>
    </div>
  );
};

export default RaceSectionItem;
