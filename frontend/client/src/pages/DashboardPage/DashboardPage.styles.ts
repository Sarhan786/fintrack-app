import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

export const TransactionList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const TransactionListItem = styled("li")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: theme.spacing(3),
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
}));

export const MainContentArea = styled(Box)({
  gridColumn: "span 1 / span 1",
  "@media (min-width: 1024px)": {
    gridColumn: "span 3 / span 3",
  },
});

export const SideContentArea = styled(Box)({
  gridColumn: "span 1 / span 1",
  "@media (min-width: 1024px)": {
    gridColumn: "span 2 / span 2",
  },
});
