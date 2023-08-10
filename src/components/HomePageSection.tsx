interface HomePageSectionProps {
  index: number;
  heading: string;
  body: string;
  imageURL: string;
  altText: string;
  backgroundColor: string;
}

const HomePageSection = ({
  index,
  heading,
  body,
  imageURL,
  altText,
  backgroundColor,
}: HomePageSectionProps) => {
  return (
    <div
      className={`w-full aspect-auto ${
        index !== 1 ? "bg-white" : ""
      } p-4 tablet:p-8`}
    >
      <div
        className={`mx-auto flex flex-col space-y-2 tablet:space-y-0 tablet:${
          index === 1 ? "flex-row-reverse" : "flex-row"
        } justify-center tablet:justify-between items-center desktop:max-w-[1280px]`}
      >
        <div
          className={`w-[20%] bg-${backgroundColor} rounded-full p-2 tablet:p-4`}
        >
          <img src={imageURL} alt={altText} />
        </div>
        <div className="flex flex-col space-y-4 items-center midMobile:w-[75%] desktop:max-w-[1280px]">
          <h1 className="text-blue-light font-bold text-center text-xl midMobile:text-2xl tablet:text-3xl desktop:text-4xl">
            {heading}
          </h1>
          <p className="text-center text-blue-light text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl w-full">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePageSection;
