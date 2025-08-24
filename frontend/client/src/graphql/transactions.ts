export const createTransactionMutation = /* GraphQL */ `
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      amount
      category
      date
      description
      type
    }
  }
`;

export const listTransactionsQuery = /* GraphQL */ `
  query ListTransactions {
    listTransactions {
      id
      amount
      category
      date
      description
      type
    }
  }
`;
