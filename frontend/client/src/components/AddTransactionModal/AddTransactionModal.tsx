import { useState } from "react";
import {
  Modal,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { generateClient } from "aws-amplify/api";
import { createTransactionMutation } from "../../graphql/transactions";
import { StyledModalBox } from "./AddTransactionModal.styles";
import { AddTransactionModalProps } from "./AddTransactionModal.types";
import { useTranslation } from "react-i18next";

const client = generateClient();

export default function AddTransactionModal({
  open,
  onClose,
  onTransactionAdded,
}: AddTransactionModalProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");

  const { t } = useTranslation();
  const title = t("addTransactionModal.title");
  const amountLabel = t("addTransactionModal.amountLabel");
  const categoryLabel = t("addTransactionModal.categoryLabel");
  const descriptionLabel = t("addTransactionModal.descriptionLabel");
  const dateLabel = t("addTransactionModal.dateLabel");
  const typeLabel = t("addTransactionModal.typeLabel");
  const expense = t("addTransactionModal.expense");
  const income = t("addTransactionModal.income");
  const saveButton = t("addTransactionModal.saveButton");
  const transactionFailedError = t(
    "addTransactionModal.transactionFailedError"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await client.graphql({
        query: createTransactionMutation,
        variables: {
          input: {
            amount: parseFloat(amount),
            category,
            date,
            description,
            type,
          },
        },
      });
      onTransactionAdded();
      onClose();
    } catch (err) {
      console.error("Error creating transaction:", err);
      setError(transactionFailedError);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label={amountLabel}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label={categoryLabel}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label={descriptionLabel}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label={dateLabel}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label={typeLabel}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="expense">{expense}</MenuItem>
            <MenuItem value="income">{income}</MenuItem>
          </Select>
        </FormControl>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          {saveButton}
        </Button>
      </StyledModalBox>
    </Modal>
  );
}
