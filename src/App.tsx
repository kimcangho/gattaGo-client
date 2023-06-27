import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import CreateNewTeamPage from "./pages/CreateNewTeamPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col h-screen justify-between">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/:userId/overview" element={<OverviewPage />} />
            <Route path="/:userId/dashboard" element={<DashboardPage />} />
            <Route path="/:userId/new" element={<CreateNewTeamPage />} />

            <Route path="/reset_password" element={<ResetPasswordPage />} />
            <Route
              path="/reset_password/:resetCodeId"
              element={<ChangePasswordPage />}
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
