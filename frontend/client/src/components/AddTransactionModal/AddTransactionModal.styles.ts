import { styled } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";

export const StyledModalBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: (theme.shape.borderRadius as number) * 2,
}));
