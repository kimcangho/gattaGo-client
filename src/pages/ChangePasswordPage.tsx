import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface ChangePasswordProps {
  email: string;
  setEmail: Function;
}

const ChangePasswordPage = ({ email, setEmail }: ChangePasswordProps) => {
  const { resetCodeId } = useParams();
  const navigate = useNavigate();
  const [isResetCodeValid, setIsResetCodeValid] = useState(false);

  useEffect(() => {
    const findEmail = async (resetCodeId: string) => {
      try {
        const { data } = await axios.post(
          `http://localhost:7777/reset/${resetCodeId}`,
          {
            resetCodeId,
          }
        );
        await setEmail(data.foundEmail);
        setIsResetCodeValid(true);
      } catch (err) {
        navigate("../");
      }
    };

    findEmail(resetCodeId!);
  }, []);

  return (
    <>
      {isResetCodeValid && (
        <div>
          <p>Change Password Page</p>
          <p>Email: {email}</p>
        </div>
      )}
    </>
  );
};

export default ChangePasswordPage;
