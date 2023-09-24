import { Link } from "react-router-dom";
import { homePageTextBlocks } from "../../data/homePageTextBlocks";
import HomePageSection from "../../components/Home/HomePageSection";

const HomePage = (): JSX.Element => {
  return (
    <div className="h-full">
      <div
        className="flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center w-full h-[80vw] tablet:h-[60vw] bg-gray-border"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/di7kiyj3y/image/upload/v1691605926/dragonboat-racing_gyey8x.jpg)`,
        }}
      >
        <div className="flex flex-col space-y-4 tablet:space-y-8 items-center midMobile:w-[75%] desktop:max-w-[1280px]">
          <h1 className="text-white font-bold text-center text-xl midMobile:text-2xl tablet:text-3xl desktop:text-4xl">
            Ready, ready!
          </h1>
          <p className="text-white text-center text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl w-full">
            Introducing gattaGo - a coaching tool for managing dragonboat teams,
            athletes and lineups!
          </p>
          <Link
            to="../signup"
            className="bg-white shadow-lg text-gray-dark hover:bg-blue-light hover:text-white p-4 rounded-xl text-xl midMobile:text-2xl tablet:text-3xl desktop:text-4xl"
          >
            Sign me up
          </Link>
        </div>
      </div>

      {homePageTextBlocks.map((section, index: number) => {
        return (
          <HomePageSection
            key={index}
            index={index}
            heading={section.heading}
            body={section.body}
            imageURL={section.imageURL}
            altText={section.altText}
            backgroundColor={section.backgroundColor}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
