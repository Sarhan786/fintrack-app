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
