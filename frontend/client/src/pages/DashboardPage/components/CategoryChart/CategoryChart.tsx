import { useMemo } from "react";
import { Typography, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTranslation } from "react-i18next";
import { ChartWrapper, ChartContainer } from "./CategoryChart.style"; // Create these styles
import { ChartProps } from "./CategoryChart.types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export default function CategoryChart({ transactions }: ChartProps) {
  const { t } = useTranslation();
  const chartTitle = t("dashboardPage.categoryChartTitle");

  const chartData = useMemo(() => {
    const expenseByCategory = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        if (!acc[tx.category]) acc[tx.category] = 0;
        acc[tx.category] += tx.amount;
        return acc;
      }, {} as Record<string, number>);
    return Object.entries(expenseByCategory).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <ChartWrapper>
        <Typography variant="h6">{chartTitle}</Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="text.secondary">
            No expense data for this month.
          </Typography>
        </Box>
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper>
      <Typography variant="h6">{chartTitle}</Typography>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(value)
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ChartWrapper>
  );
}
