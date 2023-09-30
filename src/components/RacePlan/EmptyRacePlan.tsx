import soldOutIcon from "../../assets/icons/sold-out.svg";

const EmptyRacePlan = () => {
  return (
    <div className="flex flex-col items-center tablet:max-w-[448px] mx-auto tablet:my-10">
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:text-2xl">
        We're fresh out of race plan sections...
      </h3>
      <img
        src={soldOutIcon}
        alt="Low Level"
        className="max-w-[240px] opacity-75"
      />
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:text-2xl">
        ...so let's find some in the sidebar!
      </h3>
    </div>
  );
};

export default EmptyRacePlan;
