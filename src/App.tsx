import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import CreateNewTeamPage from "./pages/CreateNewTeamPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";

const App = (): JSX.Element => {
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col h-screen justify-between">
          <Header
            setEmail={setEmail}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/signup"
              element={<SignupPage email={email} setEmail={setEmail} />}
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  email={email}
                  setEmail={setEmail}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setAccessToken={setAccessToken}
                />
              }
            />

            <Route
              path="/:userId/overview"
              element={
                <OverviewPage
                // accessToken={accessToken}
                />
              }
            />
            <Route path="/:userId/dashboard" element={<DashboardPage />} />
            <Route path="/:userId/new" element={<CreateNewTeamPage />} />

            <Route
              path="/reset_password"
              element={<ResetPasswordPage email={email} setEmail={setEmail} />}
            />
            <Route
              path="/reset_password/:resetCodeId"
              element={<ChangePasswordPage email={email} setEmail={setEmail} />}
            />

            <Route path="/*" element={<ErrorPage />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
