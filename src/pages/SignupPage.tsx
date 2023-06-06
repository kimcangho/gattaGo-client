import { Link } from "react-router-dom";

interface SignupProps {
  email: string;
  setEmail: Function;
}

const SignupPage = ({}: SignupProps): JSX.Element => {
  return (
    <div className="flex-col text-center items-center w-full tablet:w-[768px] mx-auto py-5 tablet:py-6">
      <h3 className="my-4 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        Enter your email address
      </h3>
      <p className="m-5 mt-2.5 tablet:mb-8">
        To begin the sign-up process, please provide your email address below!
      </p>

      <form className="bg-white flex flex-col space-y-2 tablet:space-y-4 mb-5 p-2.5 tablet:p-6 border border-gray-border tablet:rounded">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Input email address"
          className="bg-white-dark text-yellow border border-gray-border outline-1 focus:outline-blue-light rounded px-2 py-4"
        />
        <button
          type="submit"
          className="bg-green-light text-white rounded hover:bg-green-dark p-4"
        >
          Continue
        </button>
      </form>

      <p className="mb-2.5">
        <b>Already have an account? </b>
        <span className="text-blue-light hover:underline">
          <Link to="../login">Log in here!</Link>
        </span>
      </p>
      <p className="mt-4 mb-2.5">
        gattaGo is an online dragonboat team manager used to organize regattas,
        race progressions, lineups and athletes.
      </p>
    </div>
  );
};

export default SignupPage;
