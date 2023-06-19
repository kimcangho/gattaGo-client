import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="tablet:w-[448px] mx-auto mb-20">
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        Oops! Page does not exist!
      </h3>

      <Link
        to="../"
        className="flex justify-center text-center max-w-[448px] p-4 mx-4 text-white bg-orange-light hover:bg-orange-dark rounded"
      >
        Back to Home Page
      </Link>
    </div>
  );
};

export default ErrorPage;
