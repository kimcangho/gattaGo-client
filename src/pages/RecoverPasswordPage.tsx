import { Link } from "react-router-dom";

const RecoverPasswordPage = (): JSX.Element => {
  return (
    <div className="w-full tablet:w-[448px] mx-auto">
      <h3 className="text-center my-4 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        Recover Your Password
      </h3>
      <p className="m-5 mt-2.5 tablet:mb-8">
        Enter the email you signed up with and we'll send a password reset!
      </p>
      <form className="max-w-[448px] m-auto p-6 bg-white border border-gray-border rounded">
        <div className="flex flex-col mb-2.5">
          <label htmlFor="email" className="mb-1 font-bold">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Input email address"
            className="mb-1 px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
            required
          />
          <p className="text-xs">Make sure this is the email you signed up with!</p>
        </div>
        <div className="flex flex-row space-x-2 tablet:space-x-3 mt-4">
          <button className="p-4 w-full text-white bg-green-light hover:bg-green-dark rounded">
            Reset Password
          </button>
          <Link
            to="../login"
            className="p-4 w-full text-center text-white bg-orange-light hover:bg-orange-dark rounded"
          >
            <div>Cancel</div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RecoverPasswordPage;
