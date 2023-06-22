import { Link } from "react-router-dom";
import constructionCrane from "../assets/images/construction-crane.svg";

const HomePage = (): JSX.Element => {
  return (
    <div className="flex flex-col mx-auto items-center max-w-[448px] text-center">
      <p className="mb-4">
        gattaGo homepage under construction...
        <br />
        Please check back soon!
      </p>
      <img
        src={constructionCrane}
        alt="Under Construction Crane"
        className="w-[70%] opacity-75"
      />

      <div className="flex w-full space-x-4 m-4">
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
    </div>
  );
};

export default HomePage;
