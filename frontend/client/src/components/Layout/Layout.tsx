import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { RootBox, AppBar, Drawer, NavBox, MainContent } from "./Layout.styles";

const navItems = [
  {
    text: "layout.dashboard", //  from local -> from en.json
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "layout.transactions",
    icon: <SwapHorizIcon />,
    path: "/transactions",
  },
  {
    text: "layout.investments",
    icon: <ShowChartIcon />,
    path: "/investments",
  },
  {
    text: "layout.liabilities",
    icon: <AccountBalanceIcon />,
    path: "/liabilities",
  },
  {
    text: "layout.reports",
    icon: <AssessmentIcon />,
    path: "/reports",
  },
  {
    text: "layout.settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const FinTrackText = t("common.appName");

  return (
    <RootBox>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {FinTrackText}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Toolbar />
        <NavBox>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={NavLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={t(item.text)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </NavBox>
      </Drawer>
      <MainContent>
        <Toolbar />
        {children}
      </MainContent>
    </RootBox>
  );
}
