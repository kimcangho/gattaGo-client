import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ChangePasswordPage = () => {
  const { resetCodeId } = useParams();
  const navigate = useNavigate();
  const [isResetCodeValid, setIsResetCodeValid] = useState(false);

  useEffect(() => {
    if (!isResetCodeValid) navigate("../")
  }, [])
  
    return (
      <>
        {isResetCodeValid && (
          <div>
            <p>Change Password Page</p>
            <p>{resetCodeId}</p>
          </div>
        )}
      </>
    );
};

export default ChangePasswordPage;
