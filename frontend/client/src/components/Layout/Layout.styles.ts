import { styled } from "@mui/material/styles";
import { Box, Drawer as MuiDrawer, AppBar as MuiAppBar } from "@mui/material";

const drawerWidth = 240;

export const RootBox = styled(Box)({
  display: "flex",
});

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export const NavBox = styled(Box)({
  overflow: "auto",
});

export const MainContent = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));
