import { AppSyncEvent } from "../types/transaction.types";
import {
  createTransaction,
  listTransactions,
} from "../services/transaction.service";

export const handler = async (event: AppSyncEvent) => {
  console.log("Transaction service invoked with event:", event);
  const userId = event.identity.sub;

  switch (event.info.fieldName) {
    case "createTransaction":
      return await createTransaction(userId, event.arguments.input);
    case "listTransactions":
      return await listTransactions(userId);
    default:
      throw new Error("Unknown field, unable to resolve.");
  }
};
