import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../../contexts/AuthContext";
import { axiosAuth } from "../../services/axios.service";
import { useForm } from "react-hook-form";
import visiblePassword from "../../assets/icons/visible-password.svg";
import hiddenPassword from "../../assets/icons/hidden-password.svg";

const SignupPage = (): JSX.Element => {
  const { email, setEmail }: AuthContextTypes = useContext(AuthContext)!;
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email,
      password: "",
      confirmPassword: "",
    },
  });

  const handlePasswordToggle = () => {
    setIsPassVisible((isPassVisible) => !isPassVisible);
  };

  const handleConfirmToggle = () => {
    setIsConfirmVisible((isConfirmVisible) => !isConfirmVisible);
  };

  return (
    <div className="flex-col text-center items-center w-full max-w-[448px] mx-auto py-5">
      <h3 className="my-4 tablet:my-5 tablet:text-2xl mx-2.5 tablet:mx-5">
        Sign up
      </h3>
      <p className="mx-2.5 my-5 mt-2.5 tablet:mb-8">
        To sign-up, please provide your email address and password!
      </p>

      <form
        onSubmit={handleSubmit(async ({ email, password }) => {
          if (isSending) return;
          try {
            setIsSending(true);
            await axiosAuth.post("/register", {
              email,
              password,
            });
            navigate("../login");
          } catch (err: unknown) {
            console.log(err);
            setEmail(email)
            navigate("../login");
          }
          return;
        })}
        className="bg-white flex flex-col space-y-2 tablet:space-y-4 mb-5 px-2.5 tablet:px-5 py-2.5 tablet:py-5 border border-gray-border rounded"
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
            className="w-full bg-white-dark border border-gray-border outline-1 focus:outline-blue-light rounded px-2 py-2.5"
          />
          <p className="text-red-500 text-left ">{errors.email?.message}</p>
        </div>
        <div className="w-full">
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
              className="w-full bg-white-dark rounded px-2 py-2.5 outline-blue-light"
            />

            <img
              src={isPassVisible ? visiblePassword : hiddenPassword}
              alt={isPassVisible ? "Visible Password" : "Hidden Password"}
              className="w-6 mx-2 cursor-pointer"
              onClick={handlePasswordToggle}
            />
          </div>
          <p className="text-red-500 text-left ">{errors.password?.message}</p>
        </div>
        <div className="w-full">
          <div className="w-full flex items-center bg-white-dark rounded border border-gray-border">
            <input
              type={isConfirmVisible ? "text" : "password"}
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please confirm password!",
                },
                validate: (confirmPassword: string) => {
                  if (getValues("password") !== confirmPassword) {
                    return "Passwords don't match!";
                  }
                },
              })}
              id="confirmPassword"
              placeholder="Confirm password"
              className="w-full bg-white-dark px-2 py-2.5 outline-blue-light"
            />

            <img
              src={isConfirmVisible ? visiblePassword : hiddenPassword}
              alt={isConfirmVisible ? "Visible Password" : "Hidden Password"}
              className="w-6 h-6 mx-2 cursor-pointer"
              onClick={handleConfirmToggle}
            />
          </div>
          <p className="text-red-500 text-left ">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          type="submit"
          className={`bg-blue-light text-white rounded p-4 ${
            isSending ? "opacity-50 cursor-wait" : "hover:bg-blue-dark"
          } `}
        >
          {!isSending ? "Sign me up!" : "Signing up..."}
        </button>
      </form>

      <p className="mb-2.5">
        <b>Already have an account? </b>
        <span className="text-blue-light hover:underline">
          <Link to="../login">Log in here!</Link>
        </span>
      </p>
    </div>
  );
};

export default SignupPage;
