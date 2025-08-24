export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  type: TransactionType;
};
