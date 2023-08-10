import { Link } from "react-router-dom";
import boatIcon from "../assets/icons/boat-home-page.svg";
import rosterIcon from "../assets/icons/roster.svg";
import lineupIcon from "../assets/icons/lineups.svg";
import { homePageTextBlocks } from "../data/HomePageTextBlocks";

const HomePage = (): JSX.Element => {
  return (
    <div className="h-full">
      <div
        className="flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center w-full h-[80vw] tablet:h-[60vw]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/di7kiyj3y/image/upload/v1691605926/dragonboat-racing_gyey8x.jpg)`,
        }}
      >
        <div className="flex flex-col space-y-4 tablet:space-y-8 items-center midMobile:w-[75%] desktop:max-w-[1280px]">
          <h1 className="text-white font-bold text-center text-xl midMobile:text-2xl tablet:text-3xl desktop:text-4xl">
            {homePageTextBlocks[0].heading}
          </h1>
          <p className="text-white text-center text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl w-full">
            {homePageTextBlocks[0].body}
          </p>
          <Link
            to="../signup"
            className="bg-white shadow-lg text-gray-dark hover:bg-blue-light hover:text-white p-4 rounded-xl text-xl midMobile:text-2xl tablet:text-3xl desktop:text-4xl"
          >
            Sign me up
          </Link>
        </div>
      </div>

      {/* Create Teams */}
      <div className="w-full aspect-auto bg-white p-4 tablet:p-8">
        <div className="mx-auto flex flex-col space-y-2 tablet:space-y-0 tablet:flex-row justify-center tablet:justify-between items-center desktop:max-w-[1280px]">
          <div className="w-[20%] bg-green-light rounded-full p-2 tablet:p-4">
            <img src={boatIcon} alt={homePageTextBlocks[1].altText} />
          </div>
          <div className="flex flex-col space-y-4 items-center midMobile:w-[75%] desktop:max-w-[1280px]">
            <h1 className="text-blue-light font-bold text-center text-xl midMobile:text-2xl tablet:text-3xl desktop:text-4xl">
              {homePageTextBlocks[1].heading}
            </h1>
            <p className="text-center text-blue-light text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl w-full">
              {homePageTextBlocks[1].body}
            </p>
          </div>
        </div>
      </div>
      {/* Add Athletes */}
      <div className="w-full aspect-auto bg-white-dark p-4 tablet:p-8">
        <div className="mx-auto flex flex-col space-y-2 tablet:space-y-0 tablet:flex-row-reverse justify-center tablet:justify-between items-center desktop:max-w-[1280px]">
          <div className="w-[20%] bg-orange-light rounded-full p-2 tablet:p-4">
            <img src={rosterIcon} alt={homePageTextBlocks[2].altText} />
          </div>
          <div className="flex flex-col space-y-4 items-center midMobile:w-[75%] desktop:max-w-[1280px]">
            <h1 className="text-blue-light font-bold text-center text-xl midMobile:text-2xl tablet:text-3xl desktop:text-4xl">
              {homePageTextBlocks[2].heading}
            </h1>
            <p className="text-center text-blue-light text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl w-full">
              {homePageTextBlocks[2].body}
            </p>
          </div>
        </div>
      </div>
      {/* Prepare Lineups */}
      <div className="w-full aspect-auto bg-white p-4 tablet:p-8">
        <div className="mx-auto flex flex-col space-y-2 tablet:space-y-0 tablet:flex-row justify-center tablet:justify-between items-center desktop:max-w-[1280px]">
          <div className="w-[20%] bg-blue-wavy rounded-full p-2 tablet:p-4">
            <img src={lineupIcon} alt={homePageTextBlocks[3].altText} />
          </div>
          <div className="flex flex-col space-y-4 items-center midMobile:w-[75%] desktop:max-w-[1280px]">
            <h1 className="text-blue-light font-bold text-center text-xl midMobile:text-2xl tablet:text-3xl desktop:text-4xl">
              {homePageTextBlocks[3].heading}
            </h1>
            <p className="text-center text-blue-light text-lg midMobile:text-xl tablet:text-2xl desktop:text-3xl w-full">
              {homePageTextBlocks[3].body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
