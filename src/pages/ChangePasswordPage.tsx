import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import visiblePassword from "../assets/icons/visible-password.svg";
import hiddenPassword from "../assets/icons/hidden-password.svg";
import AuthContext from "../contexts/AuthContext";

const ChangePasswordPage = () => {
  const { resetCodeId } = useParams();
  const resetCode = resetCodeId;
  const navigate = useNavigate();

  const { email, setEmail }: any = useContext(AuthContext);

  const [isResetCodeValid, setIsResetCodeValid] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const findEmail = async (resetCode: string) => {
      try {
        const { data } = await axios.get(
          `http://localhost:7777/reset/${resetCode}`
        );
        await setEmail(data!.foundEmail);
        setIsResetCodeValid(true);
      } catch (err) {
        navigate("../");
      }
    };

    findEmail(resetCode!);
  }, []);

  const handlePasswordToggle = () => {
    setIsPassVisible((isPassVisible) => !isPassVisible);
  };

  const handleConfirmToggle = () => {
    setIsConfirmVisible((isConfirmVisible) => !isConfirmVisible);
  };

  return (
    <>
      {isResetCodeValid && (
        <div className="flex-col text-center items-center w-full max-w-[448px] mx-auto py-5 tablet:pt-0 tablet:pb-6">
          <h3 className="my-4 tablet:mb-5 tablet:text-2xl mx-2.5 tablet:mx-5">
            Change Password
          </h3>
          <p className="mx-2.5 my-5 mt-2.5 tablet:mb-8">
            {!isPasswordChanged
              ? `Type in the new password for ${email}`
              : `We have sent a confirmation email for a successful password change! You can now login with your new password!`}
          </p>

          {!isPasswordChanged ? (
            <form
              onSubmit={handleSubmit(async ({ password }) => {
                try {
                  await axios.put("http://localhost:7777/reset", {
                    email,
                    password,
                    resetCode,
                  });
                  setIsPasswordChanged(true);
                } catch (err) {
                  console.log(err);
                }
              })}
              className="bg-white flex flex-col space-y-2 tablet:space-y-4 mb-5 px-2.5 tablet:px-5 py-2.5 tablet:py-5 border border-gray-border rounded"
            >
              <div className="w-full flex flex-col items-start">
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
                    className="w-full bg-white-dark rounded px-2 py-2.5 outline-blue-light"
                  />

                  <img
                    src={isPassVisible ? visiblePassword : hiddenPassword}
                    alt={isPassVisible ? "Visible Password" : "Hidden Password"}
                    className="w-6 mx-2 cursor-pointer"
                    onClick={handlePasswordToggle}
                  />
                </div>
                <p className="text-red-500 text-left ">
                  {errors.password?.message}
                </p>
              </div>
              <div className="w-full flex flex-col items-start">
                <label htmlFor="confirmPassword" className="font-bold">
                  Confirm Password
                </label>
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
                    alt={
                      isConfirmVisible ? "Visible Password" : "Hidden Password"
                    }
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
                className="bg-green-light text-white rounded hover:bg-green-dark p-4"
              >
                Continue
              </button>
            </form>
          ) : (
            <Link
              to="../login"
              className="flex justify-center items-center max-w-[448px] p-4 mx-auto text-white bg-green-light hover:bg-green-dark rounded"
            >
              Back to Login Page
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default ChangePasswordPage;
