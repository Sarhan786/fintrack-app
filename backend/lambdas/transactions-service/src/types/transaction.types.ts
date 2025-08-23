export interface CreateTransactionInput {
  amount: number;
  category: string;
  date: string;
  description?: string;
  type: "income" | "expense";
}

export interface Transaction extends CreateTransactionInput {
  id: string;
  userId: string;
}

export interface AppSyncEvent {
  identity: {
    sub: string; // The unique ID of the logged-in user
  };
  arguments: {
    input: CreateTransactionInput;
  };
  info: {
    fieldName: "createTransaction" | "listTransactions";
  };
}
