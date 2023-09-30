import { Routes, Route } from "react-router-dom";
import { LayoutGroup } from "framer-motion";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import ChangePasswordPage from "./pages/Auth/ChangePasswordPage";
import HomePage from "./pages/General/HomePage";
import TeamOverviewPage from "./pages/Overview/TeamOverviewPage";
import CreateNewTeamPage from "./pages/Overview/CreateNewTeamPage";
import EditTeamPage from "./pages/Overview/EditTeamPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ErrorPage from "./pages/General/ErrorPage";
import RosterPage from "./pages/Roster/RosterPage";
import LineupsPage from "./pages/Lineup/LineupsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import NavbarRoute from "./routes/NavbarRoute";
import Header from "./components/General/Header";
import Footer from "./components/General/Footer";
import CreateNewAthletePage from "./pages/Roster/CreateNewAthletePage";
import EditAthletePage from "./pages/Roster/EditAthletePage";
import RacePlanPage from "./pages/RacePlan/RacePlanPage";

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
            <Route
              path="/:userId/team-overview"
              element={<TeamOverviewPage />}
            />
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
                path="/:userId/race_day_plan/:teamId"
                element={<RacePlanPage />}
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
