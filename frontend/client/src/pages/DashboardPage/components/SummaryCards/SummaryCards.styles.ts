import { styled } from "@mui/material/styles";
import { Box, Card as MuiCard } from "@mui/material";

export const SummaryGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const SummaryCard = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(2),
}));
