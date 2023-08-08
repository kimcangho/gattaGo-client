import { Link } from "react-router-dom";
import constructionCrane from "../assets/images/construction-crane.svg";

const HomePage = (): JSX.Element => {
  return (
    <div className="mx-auto">
      <div className="flex flex-col mx-2 items-center max-w-[448px] text-center my-6">
        <h2 className="mb-4">
          Attention! Our homepage is under construction.
          <br />
          Please check back soon...
        </h2>

        <img
          src={constructionCrane}
          alt="Under Construction Crane"
          className="w-[70%] opacity-75"
        />
        <h2 className="mt-6">
          ...but wait! You can still sign up and login below!
        </h2>
        <div className="flex w-full space-x-2 midMobile:space-x-4 m-4">
          <Link
            to="../signup"
            className="p-4 w-full text-center flex justify-center items-center text-white bg-green-light hover:bg-green-dark  rounded"
          >
            <p>Sign Up</p>
          </Link>
          <Link
            to="../login"
            className="p-4 w-full text-center flex justify-center items-center text-white bg-blue-light hover:bg-blue-dark rounded"
          >
            <p>Log In</p>
          </Link>
        </div>
        <div className="bg-blue-light text-white mt-4 mb-2.5">
          <h2>
            gattaGo is an online dragonboat team manager used to organize
            regattas, race progressions, lineups and athletes.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
