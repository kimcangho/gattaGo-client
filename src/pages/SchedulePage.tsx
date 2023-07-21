import { useEffect } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

const SchedulePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    try {
      const getRegattas = async () => {
        await axiosPrivate.get(`/regattas`, {
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
