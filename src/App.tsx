import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DashboardPage from "./pages/DashboardPage";

const App = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen justify-between">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
              />
            }
          />

          <Route path="/:userId/dashboard" element={<DashboardPage />} />

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
  );
};

export default App;
