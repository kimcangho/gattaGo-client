import { nanoid } from "nanoid";
import {
  PlanOrderData,
  RegattaSectionData,
  MapSectionData,
  EventSectionData,
  LineupSectionData,
  NotesSectionData,
} from "../../interfaces/RacePlanData";

interface RaceSectionItemProps {
  section: string;
  setPlanOrder: React.Dispatch<React.SetStateAction<PlanOrderData[]>>;
  setRegattaSectionArr: Function;
  setMapSectionArr: Function;
  setEventSectionArr: Function;
  setLineupSectionArr: Function;
  setNotesSectionArr: Function;
}

const RaceSectionItem = ({
  section,
  setPlanOrder,
  setRegattaSectionArr,
  setMapSectionArr,
  setEventSectionArr,
  setLineupSectionArr,
  setNotesSectionArr,
}: RaceSectionItemProps) => {
  const handleSetPlanOrder = () => {
    const id = nanoid();
    setPlanOrder((planOrder) => [
      ...planOrder,
      { id, section, sectionId: id, index: planOrder.length },
    ]);

    switch (section) {
      case "Regatta":
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
      case "Map":
        setMapSectionArr((mapSections: MapSectionData[]) => {
          return [
            ...mapSections,
            {
              id,
              mapName: "",
              mapLongitude: 0,
              mapLatitude: 0,
              mapZoom: 10,
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
              eventTime: null,
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
              lineupId: "",
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
              notesName: "",
              notesBody: "",
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
