import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isInvalidInput, _setIsInvalidInput] = useState(false);
  const navigate = useNavigate();
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
    <div className="py-5 flex-col justify-center">
      <h3 className="text-center my-4 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        {email ? "Hey! You're already signed up!" : "Log In"}
      </h3>
      <p className="text-center m-5 mt-2.5 tablet:mb-8">
        Log in with your email and password!
      </p>
      <div className="max-w-[448px] m-auto p-6 pb-0 bg-white border border-gray-border rounded">
        {isInvalidInput && (
          <div className="mb-5 p-2.5 bg-red-light border border-red-dark rounded">
            <p className="font-bold text-red-500">
              Sorry, we didn't recognize that email or password.
            </p>
            <p className="font-bold">
              Can't remember your email or password?{" "}
              <Link to="../recover_password">
                <span className="text-blue-light hover:underline">
                  Retrieve them here!
                </span>
              </Link>
            </p>
          </div>
        )}
        <form
          onSubmit={handleSubmit(async ({ email, isLoggedIn }) => {
            await setEmail(email);
            await setIsLoggedIn(isLoggedIn);
            navigate("../");
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
