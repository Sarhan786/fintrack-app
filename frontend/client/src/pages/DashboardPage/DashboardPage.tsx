import { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { generateClient, GraphQLResult } from "aws-amplify/api";
import { listTransactionsQuery } from "../../graphql/transactions";
import AddTransactionModal from "../../components/AddTransactionModal";
import {
  HeaderBox,
  TransactionList,
  TransactionListItem,
} from "./DashboardPage.styles";
import { Transaction } from "./DashboardPage.types";
import { useTranslation } from "react-i18next";

const client = generateClient();

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      <AddTransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onTransactionAdded={fetchTransactions}
      />

      <Typography variant="h6">{recentTransactions}</Typography>
      {loading && <p>{loadingText}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TransactionList>
        {transactions.map((tx) => (
          <TransactionListItem key={tx.id}>
            <span>
              {tx.date}: {tx.description || tx.category}
            </span>
            <span style={{ color: tx.type === "expense" ? "red" : "green" }}>
              {tx.amount} ({tx.type})
            </span>
          </TransactionListItem>
        ))}
      </TransactionList>
    </Box>
  );
}
