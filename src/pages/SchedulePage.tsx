import { useEffect, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

const SchedulePage = () => {
  const { accessToken }: AuthContextTypes = useContext(AuthContext)!;
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    try {
      const getRegattas = async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        await axiosPrivate.get(`/regattas`, {
          headers,
          withCredentials: true,
        });
      };

      getRegattas();
    } catch (err) {
      console.log(err);
      logoutRedirect("/login");
    }
  }, []);
  return <div>SchedulePage</div>;
};

export default SchedulePage;
