import { useState, useContext } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import visiblePassword from "../assets/icons/visible-password.svg";
import hiddenPassword from "../assets/icons/hidden-password.svg";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { LoginFormData } from "../interfaces/FormData";

const LoginPage = (): JSX.Element => {
  const { setAccessToken, email, setEmail, setIsLoggedIn }: AuthContextTypes =
    useContext(AuthContext)!;
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email,
      password: "",
    },
  });

  const handleFormSubmit = async ({ email, password }: LoginFormData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:7777/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      await setAccessToken(data.accessToken);
      await setEmail(email);
      await setIsLoggedIn(true);
      navigate("../userId/overview");
    } catch (error) {
      await setEmail(email);
      setIsInvalidInput(true);
    }
  };

  const handlePasswordToggle = () => {
    setIsPassVisible((isPassVisible) => !isPassVisible);
  };

  return (
    <div className="py-5 flex-col justify-center">
      <h3 className="text-center my-4 tablet:my-5 tablet:text-2xl px-2.5 tablet:px-5">
        {email && !isInvalidInput ? "Hey! You're already signed up!" : "Log In"}
      </h3>
      <p className="text-center m-5 mt-2.5 tablet:mb-8">
        Log in with your email and password!
      </p>
      <div className="max-w-[448px] m-auto px-2.5 tablet:px-5 pt-6 pb-0 bg-white border border-gray-border rounded">
        {isInvalidInput && (
          <div className="mb-5 p-2.5 bg-red-light border border-red-dark rounded">
            <p className="font-bold text-red-500">
              Sorry, we didn't recognize that email or password.
            </p>
            <p className="font-bold">
              Can't remember your email or password?{" "}
              <Link to="../reset_password">
                <span className="text-blue-light hover:underline">
                  Reset them here!
                </span>
              </Link>
            </p>
          </div>
        )}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
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
          <div className="flex-col mb-2.5">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <div className="w-full flex items-center bg-white-dark rounded border border-gray-border">
              <input
                type={isPassVisible ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password field can't be empty!",
                  },
                })}
                id="password"
                placeholder="Input password"
                className="px-2 py-2.5 bg-white-dark rounded w-full outline-blue-light"
              />
              <img
                src={isPassVisible ? visiblePassword : hiddenPassword}
                alt={isPassVisible ? "Visible Password" : "Hidden Password"}
                className="w-6 mx-2 cursor-pointer"
                onClick={handlePasswordToggle}
              />
            </div>
            <p className="text-red-500 text-left">{errors.password?.message}</p>
          </div>

          <div className="flex justify-end mb-2.5">
            <Link to="../reset_password">
              <p>
                <span className="text-blue-light hover:underline">
                  Forgot Password?
                </span>
              </p>
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
