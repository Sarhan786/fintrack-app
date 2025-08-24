import { Transaction } from "../../DashboardPage.types";

export interface ExpenseChartProps {
  transactions: Transaction[];
}

export interface ChartData {
  name: string;
  value: number;
}
