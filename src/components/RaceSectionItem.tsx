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

interface RaceSectionItemProps {
  section: string;
  setPlanOrder: React.Dispatch<React.SetStateAction<PlanOrderData[]>>;
  setRegattaSectionArr: Function;
}

const RaceSectionItem = ({
  section,
  setPlanOrder,
  setRegattaSectionArr,
}: RaceSectionItemProps) => {
  const handleSetPlanOrder = () => {
    const id = nanoid();
    setPlanOrder((planOrder) => [...planOrder, { id, section }]);
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
