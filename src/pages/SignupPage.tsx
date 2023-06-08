import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface SignupProps {
  email: string;
  setEmail: Function;
}

const SignupPage = ({ email, setEmail }: SignupProps): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email,
    },
  });

  return (
    <div className="flex-col text-center items-center w-full max-w-[448px] mx-auto mb-10 py-5 tablet:py-6">
      <h3 className="my-4 tablet:mt-10 tablet:mb-5 tablet:text-2xl mx-2.5 tablet:mx-5">
        Enter your email address
      </h3>
      <p className="mx-2.5 my-5 mt-2.5 tablet:mb-8">
        To begin the sign-up process, please provide your email address below!
      </p>

      <form
        onSubmit={handleSubmit(async (data) => {
          await setEmail(data?.email);
          navigate("../login");
        })}
        className="bg-white flex flex-col space-y-2 tablet:space-y-4 mb-5 px-2.5 tablet:px-5 py-5 border border-gray-border tablet:rounded"
      >
        <div className="w-full">
          <input
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Field can't be empty!",
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Field needs to be an email!",
              },
            })}
            id="email"
            placeholder="Input email address"
            className="w-full bg-white-dark text-yellow border border-gray-border outline-1 focus:outline-blue-light rounded px-2 py-4"
          />
          <p className="text-red-500 text-left ">{errors.email?.message}</p>
        </div>
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
