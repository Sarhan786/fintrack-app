import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import {
  CreateTransactionInput,
  Transaction,
} from "../types/transaction.types";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const { TABLE_NAME } = process.env;

export const createTransaction = async (
  userId: string,
  input: CreateTransactionInput
): Promise<Transaction> => {
  const transactionId = uuidv4();
  const transaction: Transaction = {
    id: transactionId,
    userId: userId,
    ...input,
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      PK: `USER#${userId}`,
      SK: `TRANSACTION#${transactionId}`,
      ...transaction,
    },
  });

  await docClient.send(command);
  return transaction;
};

export const listTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": "TRANSACTION#",
    },
  });

  const { Items } = await docClient.send(command);
  return (Items as Transaction[]) || [];
};
