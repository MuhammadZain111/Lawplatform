import { Card } from "../ui/Card.jsx"

// Mock data for charts
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

const DashboardCharts = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Case Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {caseTypeData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-1"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm">
                      {entry.name}: {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-gray-500 text-sm">
                (Chart visualization would be implemented with a charting library)
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Cases</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {monthlyData.map((entry, index) => (
                  <div key={index} className="text-sm">
                    {entry.name}: {entry.cases} cases
                  </div>
                ))}
              </div>
              <div className="text-gray-500 text-sm">
                (Chart visualization would be implemented with a charting library)
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {revenueData.map((entry, index) => (
                <div key={index} className="text-sm">
                  {entry.name}: ${entry.revenue}
                </div>
              ))}
            </div>
            <div className="text-gray-500 text-sm">
              (Chart visualization would be implemented with a charting library)
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DashboardCharts
