import { styled } from "@mui/material/styles";
import { Box, Card as MuiCard } from "@mui/material";

export const ChartWrapper = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "400px", // Give the chart a fixed height
  display: "flex",
  flexDirection: "column",
}));

export const ChartContainer = styled(Box)({
  width: "100%",
  height: "100%",
});
