import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface LoginProps {
  email: String;
  setEmail: Function;
  isLoggedIn: Boolean;
  setIsLoggedIn: Function;
}

const LoginPage = ({
  email,
  setEmail,
  isLoggedIn,
  setIsLoggedIn,
}: LoginProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email,
      password: "",
      isLoggedIn,
    },
  });

  return (
    <div className="py-5">
      <div className="max-w-[448px] m-auto p-6 pb-0 bg-white border border-gray-border rounded">
        <form
          onSubmit={handleSubmit(({ email, isLoggedIn }) => {
            setEmail(email);
            setIsLoggedIn(isLoggedIn);
          })}
          className="flex flex-col "
        >
          <div className="flex flex-col mb-2.5">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email field can't be empty!",
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Field needs to be an email!",
                },
              })}
              id="email"
              placeholder="Input email address"
              className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
            />
            <p className="text-red-500 text-left">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col mb-2.5">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password field can't be empty!",
                },
              })}
              id="password"
              placeholder="Input password"
              className="px-2 py-2.5 bg-white-dark border border-gray-border rounded focus:outline-blue-light"
            />
            <p className="text-red-500 text-left">{errors.password?.message}</p>
          </div>

          <div className="flex justify-between mb-5">
            <div className="flex space-x-1">
              <input
                type="checkbox"
                {...register("isLoggedIn")}
                id="isLoggedIn"
              />
              <span>Stay logged in</span>
            </div>
            <Link to="../recover_password">
              <span className="text-blue-light hover:underline">
                Forgot Password?
              </span>
            </Link>
          </div>

          <button className="p-4 w-full text-white bg-green-light hover:bg-green-dark rounded">
            Log In
          </button>
        </form>
        <div className="my-2.5 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="../signup">
              <span className="text-blue-light hover:underline">
                Sign up here!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
