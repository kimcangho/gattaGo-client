import { Routes, Route } from "react-router-dom";
import { LayoutGroup } from "framer-motion";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import CreateNewTeamPage from "./pages/CreateNewTeamPage";
import EditTeamPage from "./pages/EditTeamPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import RosterPage from "./pages/RosterPage";
import LineupsPage from "./pages/LineupsPage";
import RaceDayPage from "./pages/RaceDayPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import NavbarRoute from "./Routes/NavbarRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateNewAthletePage from "./pages/CreateNewAthletePage";
import EditAthletePage from "./pages/EditAthletePage";
import TeamRaceDayPage from "./pages/TeamRaceDayPage";

const App = (): JSX.Element => {
  return (
    <div className="flex flex-col">
      <LayoutGroup>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset_password" element={<ResetPasswordPage />} />
          <Route
            path="/reset_password/:resetCodeId"
            element={<ChangePasswordPage />}
          />

          {/* Private Routes */}
          <Route element={<ProtectedRoute redirectPath="login" />}>
            {/* Team Overview Page */}
            <Route path="/:userId/overview" element={<OverviewPage />} />
            <Route path="/:userId/new" element={<CreateNewTeamPage />} />
            <Route path="/:userId/edit/:teamId/" element={<EditTeamPage />} />

            <Route element={<NavbarRoute />}>
              {/* Dashboard Page */}
              <Route
                path="/:userId/dashboard/:teamId"
                element={<DashboardPage />}
              />

              {/* Roster Page */}
              <Route path="/:userId/roster/:teamId" element={<RosterPage />} />
              <Route
                path="/:userId/roster/:teamId/new"
                element={<CreateNewAthletePage />}
              />
              <Route
                path="/:userId/roster/:teamId/edit/:athleteId"
                element={<EditAthletePage />}
              />

              {/* Lineup Page */}
              <Route
                path="/:userId/lineups/:teamId"
                element={<LineupsPage />}
              />

              {/* Race Day Page */}
              <Route
                path="/:userId/race_day/:teamId"
                element={<RaceDayPage />}
              />
              <Route
                path="/:userId/race_day/:teamId/plan/"
                element={<TeamRaceDayPage />}
              />
              <Route
                path="/:userId/race_day/:teamId/plan/:raceDayPlanId"
                element={<TeamRaceDayPage />}
              />
            </Route>
          </Route>

          <Route path="/*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </LayoutGroup>
    </div>
  );
};

export default App;
