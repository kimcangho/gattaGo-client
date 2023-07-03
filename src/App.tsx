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
import RosterPage from "./pages/RosterPage";
import LineupsPage from "./pages/LineupsPage";
import SchedulePage from "./pages/SchedulePage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import NavbarRoute from "./Routes/NavbarRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateNewAthletePage from "./pages/CreateNewAthletePage";
import EditAthletePage from "./pages/EditAthletePage";

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col h-screen justify-start">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset_password" element={<ResetPasswordPage />} />
            <Route
              path="/reset_password/:resetCodeId"
              element={<ChangePasswordPage />}
            />

            <Route element={<ProtectedRoute redirectPath="login" />}>
              <Route path="/:userId/overview" element={<OverviewPage />} />
              <Route path="/:userId/new" element={<CreateNewTeamPage />} />

              <Route element={<NavbarRoute />}>
                <Route
                  path="/:userId/dashboard/:teamId"
                  element={<DashboardPage />}
                />
                <Route
                  path="/:userId/roster/:teamId"
                  element={<RosterPage />}
                />
                <Route
                  path="/:userId/roster/:teamId/new"
                  element={<CreateNewAthletePage />}
                />
                <Route
                  path="/:userId/roster/:teamId/edit/:athleteId"
                  element={<EditAthletePage />}
                />
                <Route
                  path="/:userId/lineups/:teamId"
                  element={<LineupsPage />}
                />
                <Route
                  path="/:userId/schedule/:teamId"
                  element={<SchedulePage />}
                />
              </Route>
            </Route>

            <Route path="/*" element={<ErrorPage />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
