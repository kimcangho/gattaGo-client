import soldOutIcon from "../assets/icons/sold-out.svg";

const EmptyRaceDay = () => {
  return (
    <div className="flex flex-col items-center tablet:max-w-[448px] mx-auto">
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        We're fresh out of race day plans...
      </h3>
      <img
        src={soldOutIcon}
        alt="Low Level"
        className="max-w-[240px] opacity-75 mt-4 tablet:mt-8"
      />
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        ...so let's create a new race day plan in the sidebar!
      </h3>
    </div>
  );
};

export default EmptyRaceDay;
