import { useMemo } from "react";
import { Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTranslation } from "react-i18next";
import { ChartWrapper, ChartContainer } from "./IncomeExpenseChart.styles"; // Create these styles
import { ChartProps } from "./IncomeExpenseChart.types";

export default function IncomeExpenseChart({ transactions }: ChartProps) {
  const { t } = useTranslation();
  const chartTitle = t("dashboardPage.incomeVsExpenseTitle");

  const chartData = useMemo(() => {
    // In a real app, you'd process data by day or month. Here's a simplified example.
    const dataMap: { [key: string]: { income: number; expense: number } } = {};
    transactions.forEach((tx) => {
      const day = new Date(tx.date).getDate();
      if (!dataMap[day]) dataMap[day] = { income: 0, expense: 0 };
      dataMap[day][tx.type] += tx.amount;
    });
    return Object.entries(dataMap).map(([day, values]) => ({
      name: `Day ${day}`,
      ...values,
    }));
  }, [transactions]);

  return (
    <ChartWrapper>
      <Typography variant="h6">{chartTitle}</Typography>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22c55e" />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ChartWrapper>
  );
}
