import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import LiabilitiesPage from "./pages/LiabilitiesPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import TransactionsPage from "./pages/TransactionsPage";

import { theme } from "./theme";
import Layout from "./components/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            }
          />
          <Route
            path="/transactions"
            element={
              <Layout>
                <TransactionsPage />
              </Layout>
            }
          />
          <Route
            path="/investments"
            element={
              <Layout>
                <InvestmentsPage />
              </Layout>
            }
          />
          <Route
            path="/liabilities"
            element={
              <Layout>
                <LiabilitiesPage />
              </Layout>
            }
          />
          <Route
            path="/reports"
            element={
              <Layout>
                <ReportsPage />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <SettingsPage />
              </Layout>
            }
          />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
