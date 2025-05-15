"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card.jsx"
import Badge from "../ui/Badge.jsx"
import Button from "../ui/Button.jsx"
import Input from "../ui/Input.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select.jsx"
import { FileText, Search, Calendar, Clock } from "../icons/Icons.jsx"

// Mock data for case history
const MOCK_CASE_HISTORY = [
  {
    id: 1,
    caseNumber: "C-2022-0056",
    client: "David Wilson",
    caseType: "Divorce",
    status: "Completed",
    outcome: "Successful",
    closedDate: "December 15, 2022",
    duration: "6 months",
  },
  {
    id: 2,
    caseNumber: "C-2022-0078",
    client: "Amanda Rodriguez",
    caseType: "Child Support",
    status: "Completed",
    outcome: "Successful",
    closedDate: "January 22, 2023",
    duration: "3 months",
  },
  {
    id: 3,
    caseNumber: "C-2022-0092",
    client: "James Thompson",
    caseType: "Property Settlement",
    status: "Completed",
    outcome: "Partially Successful",
    closedDate: "February 10, 2023",
    duration: "5 months",
  },
  {
    id: 4,
    caseNumber: "C-2022-0105",
    client: "Sophia Chen",
    caseType: "Custody Modification",
    status: "Completed",
    outcome: "Successful",
    closedDate: "March 5, 2023",
    duration: "4 months",
  },
  {
    id: 5,
    caseNumber: "C-2022-0118",
    client: "Michael Brown",
    caseType: "Alimony",
    status: "Completed",
    outcome: "Unsuccessful",
    closedDate: "March 28, 2023",
    duration: "7 months",
  },
]

const CaseHistory = () => {
  const [caseHistory] = useState(MOCK_CASE_HISTORY)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOutcome, setFilterOutcome] = useState("all")

  const filteredCases = caseHistory.filter((caseItem) => {
    const matchesSearch =
      caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.caseType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOutcome = filterOutcome === "all" || caseItem.outcome.toLowerCase() === filterOutcome.toLowerCase()

    return matchesSearch && matchesOutcome
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case History</CardTitle>
        <CardDescription>Review your past cases and outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by client, case number, or type..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <Select value={filterOutcome} onValueChange={setFilterOutcome}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outcomes</SelectItem>
                <SelectItem value="successful">Successful</SelectItem>
                <SelectItem value="partially successful">Partially Successful</SelectItem>
                <SelectItem value="unsuccessful">Unsuccessful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCases.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No cases match your search criteria.</p>
            </div>
          ) : (
            filteredCases.map((caseItem) => (
              <div key={caseItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h4 className="font-medium">{caseItem.client}</h4>
                      <Badge
                        variant={
                          caseItem.outcome === "Successful"
                            ? "default"
                            : caseItem.outcome === "Partially Successful"
                              ? "secondary"
                              : "destructive"
                        }
                        className="ml-2"
                      >
                        {caseItem.outcome}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="h-3 w-3 mr-1" />
                      <span>
                        {caseItem.caseNumber} • {caseItem.caseType}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Closed: {caseItem.closedDate}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Duration: {caseItem.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CaseHistory
