import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const AuthPageWrapper = styled(Box)({
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const AuthForm = styled("form")({
  width: "100%", // Fix IE11 issue.
  marginTop: 24,
});
