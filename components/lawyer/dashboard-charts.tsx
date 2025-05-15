"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const caseTypeData = [
  { name: "Family", value: 35 },
  { name: "Corporate", value: 25 },
  { name: "Real Estate", value: 20 },
  { name: "Criminal", value: 15 },
  { name: "Other", value: 5 },
]

const monthlyData = [
  { name: "Jan", cases: 4, success: 3 },
  { name: "Feb", cases: 6, success: 5 },
  { name: "Mar", cases: 8, success: 7 },
  { name: "Apr", cases: 10, success: 9 },
  { name: "May", cases: 7, success: 6 },
  { name: "Jun", cases: 9, success: 8 },
]

const revenueData = [
  { name: "Jan", revenue: 5000 },
  { name: "Feb", revenue: 7500 },
  { name: "Mar", revenue: 10000 },
  { name: "Apr", revenue: 12500 },
  { name: "May", revenue: 9000 },
  { name: "Jun", revenue: 11000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function DashboardCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Case Distribution</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={caseTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {caseTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend />
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Cases</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cases" fill="#8884d8" name="Total Cases" />
                    <Bar dataKey="success" fill="#82ca9d" name="Successful Cases" />
                  </BarChart>
                </ResponsiveContainer>
              </Chart>
              <ChartLegend />
            </ChartContainer>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <div className="h-64">
          <ChartContainer>
            <Chart>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue ($)" />
                </LineChart>
              </ResponsiveContainer>
            </Chart>
            <ChartLegend />
          </ChartContainer>
        </div>
      </Card>
    </div>
  )
}
