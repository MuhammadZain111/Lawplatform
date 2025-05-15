"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card.jsx"
import Badge from "../ui/Badge.jsx"
import Button from "../ui/Button.jsx"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs.jsx"
import { FileText, Calendar, Clock } from "../icons/Icons.jsx"
import IMAGES from "../../constants/Images.js"

// Mock data for pending cases
const MOCK_PENDING_CASES = [
  {
    id: 1,
    client: {
      name: "Michael Thompson",
      image: IMAGES.placeholder.avatar,
    },
    caseNumber: "C-2023-0125",
    caseType: "Divorce",
    status: "Urgent",
    nextHearing: "May 15, 2023",
    description: "Client seeking divorce settlement and child custody arrangement.",
    documents: 5,
    progress: 30,
  },
  {
    id: 2,
    client: {
      name: "Jennifer Lee",
      image: IMAGES.placeholder.avatar,
    },
    caseNumber: "C-2023-0136",
    caseType: "Child Custody",
    status: "In Progress",
    nextHearing: "May 22, 2023",
    description: "Modification of existing child custody arrangement.",
    documents: 8,
    progress: 45,
  },
  {
    id: 3,
    client: {
      name: "Robert Kim",
      image: IMAGES.placeholder.avatar,
    },
    caseNumber: "C-2023-0142",
    caseType: "Property Settlement",
    status: "Pending",
    nextHearing: "June 5, 2023",
    description: "Division of marital assets and property settlement negotiations.",
    documents: 12,
    progress: 20,
  },
  {
    id: 4,
    client: {
      name: "Emily Wilson",
      image: IMAGES.placeholder.avatar,
    },
    caseNumber: "C-2023-0150",
    caseType: "Alimony",
    status: "In Progress",
    nextHearing: "May 30, 2023",
    description: "Client seeking spousal support following separation.",
    documents: 6,
    progress: 60,
  },
]

const CaseCard = ({ caseItem }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={caseItem.client.image || "/placeholder.svg"} alt={caseItem.client.name} />
            <AvatarFallback>{caseItem.client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{caseItem.client.name}</h4>
            <div className="flex items-center text-sm text-gray-500">
              <FileText className="h-3 w-3 mr-1" />
              <span>
                {caseItem.caseNumber} • {caseItem.caseType}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Badge
            variant={
              caseItem.status === "Urgent" ? "destructive" : caseItem.status === "In Progress" ? "default" : "secondary"
            }
            className="mr-2"
          >
            {caseItem.status}
          </Badge>
          <div className="flex items-center text-sm text-gray-500 ml-2">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{caseItem.nextHearing}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-3">{caseItem.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
            <FileText className="h-3 w-3 mr-1" />
            <span>{caseItem.documents} Documents</span>
          </div>
          <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
            <Clock className="h-3 w-3 mr-1" />
            <span>Progress: {caseItem.progress}%</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${caseItem.progress}%` }}></div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Documents
        </Button>
        <Button size="sm">View Case</Button>
      </div>
    </div>
  )
}

const PendingCases = () => {
  const [pendingCases] = useState(MOCK_PENDING_CASES)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Cases</CardTitle>
        <CardDescription>Manage your active legal cases</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Cases</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {pendingCases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4">
            {pendingCases
              .filter((caseItem) => caseItem.status === "Urgent")
              .map((caseItem) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} />
              ))}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {pendingCases
              .filter((caseItem) => caseItem.status === "In Progress")
              .map((caseItem) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} />
              ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingCases
              .filter((caseItem) => caseItem.status === "Pending")
              .map((caseItem) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default PendingCases
