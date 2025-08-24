import { useState, useEffect, useMemo } from "react";
import { Typography, Button, Box, Card } from "@mui/material";
import { generateClient, GraphQLResult } from "aws-amplify/api";
import { listTransactionsQuery } from "../../graphql/transactions";
import AddTransactionModal from "../../components/AddTransactionModal";
import {
  HeaderBox,
  TransactionList,
  TransactionListItem,
  ContentGrid,
  MainContentArea,
  SideContentArea,
} from "./DashboardPage.styles";
import { Transaction } from "./DashboardPage.types";
import { useTranslation } from "react-i18next";
import SummaryCards from "./components/SummaryCards";
// import ExpenseChart from "./components/ExpenseChart"; // Import the new component
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import CategoryChart from "./components/CategoryChart";

const client = generateClient();

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sliceTransactions = transactions.slice(0, 5); // Show last 5 transection

  const { t } = useTranslation();
  const title = t("dashboardPage.title");
  const addTransaction = t("dashboardPage.addTransaction");
  const recentTransactions = t("dashboardPage.recentTransactions");
  const loadingError = t("dashboardPage.loadingError");
  const loadingText = t("common.loading");

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const response = (await client.graphql({
        query: listTransactionsQuery,
      })) as GraphQLResult<{ listTransactions: Transaction[] }>;

      setTransactions(response.data.listTransactions || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError(loadingError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const { monthlyTransactions, summary } = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const filtered = transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    });

    const income = filtered
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = filtered
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      monthlyTransactions: filtered,
      summary: { income, expenses, balance: income - expenses },
    };
  }, [transactions]);

  return (
    <Box>
      <HeaderBox>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          {addTransaction}
        </Button>
      </HeaderBox>

      <SummaryCards
        income={summary.income}
        expenses={summary.expenses}
        balance={summary.balance}
      />

      <AddTransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onTransactionAdded={fetchTransactions}
      />

      {loading ? (
        <p>{loadingText}</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ContentGrid>
          <MainContentArea>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <IncomeExpenseChart transactions={monthlyTransactions} />
              <CategoryChart transactions={monthlyTransactions} />
            </Box>
          </MainContentArea>
          <SideContentArea>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">{recentTransactions}</Typography>
              {loading && <p>{loadingText}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <TransactionList>
                {sliceTransactions.map((tx) => (
                  <TransactionListItem key={tx.id}>
                    <span>
                      {tx.date}: {tx.description || tx.category}
                    </span>
                    <span
                      style={{ color: tx.type === "expense" ? "red" : "green" }}
                    >
                      {tx.amount} ({tx.type})
                    </span>
                  </TransactionListItem>
                ))}
              </TransactionList>
            </Card>
          </SideContentArea>
        </ContentGrid>
      )}
    </Box>
  );
}
