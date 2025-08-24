import { Box, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { SummaryGrid, SummaryCard } from "./SummaryCards.styles";
import { SummaryCardsProps } from "./SummaryCards.types";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export default function SummaryCards({
  income,
  expenses,
  balance,
}: SummaryCardsProps) {
  const { t } = useTranslation();
  const incomeCardTitle = t("summaryCards.income");
  const expenseCardTitle = t("summaryCards.expenses");
  const balanceCardTitle = t("summaryCards.balance");

  return (
    <SummaryGrid>
      <SummaryCard>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {incomeCardTitle}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", color: "green" }}>
            <ArrowDownwardIcon sx={{ mr: 1 }} />
            <Typography variant="h5" component="div">
              {formatCurrency(income)}
            </Typography>
          </Box>
        </CardContent>
      </SummaryCard>
      <SummaryCard>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {expenseCardTitle}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", color: "red" }}>
            <ArrowUpwardIcon sx={{ mr: 1 }} />
            <Typography variant="h5" component="div">
              {formatCurrency(expenses)}
            </Typography>
          </Box>
        </CardContent>
      </SummaryCard>
      <SummaryCard>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {balanceCardTitle}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "primary.main",
            }}
          >
            <AccountBalanceWalletIcon sx={{ mr: 1 }} />
            <Typography variant="h5" component="div">
              {formatCurrency(balance)}
            </Typography>
          </Box>
        </CardContent>
      </SummaryCard>
    </SummaryGrid>
  );
}
