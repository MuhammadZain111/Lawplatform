"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Settings,
  MessageSquare,
  Calendar,
  FileText,
  Users,
  Clock,
  ChevronRight,
  Phone,
  Mail,
  Bell,
  LogOut,
  Scale,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DashboardCharts from "@/components/lawyer/dashboard-charts"
import PendingCases from "@/components/lawyer/pending-cases"
import CaseHistory from "@/components/lawyer/case-history"
import ChatInterface from "@/components/chat/chat-interface"

// Mock data
const MOCK_PROFILE = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "(123) 456-7890",
  specialization: "Family Law",
  image: "/placeholder.svg?height=200&width=200",
  status: "Active",
}

export default function LawyerDashboard() {
  const [profile] = useState(MOCK_PROFILE)
  const [showChat, setShowChat] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Scale className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-xl">LawSphere</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              <Button variant="ghost" size="icon" onClick={() => setShowChat(!showChat)}>
                <MessageSquare className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/lawyer/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/lawyer/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login" className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Lawyer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {profile.name}</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              New Case
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-2xl font-bold">24</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-2xl font-bold">12</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">2 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-2xl font-bold">8</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Next: Today at 10:00 AM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-2xl font-bold">92%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your professional information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{profile.name}</h3>
                <p className="text-gray-600">{profile.specialization}</p>
                <Badge className="mt-2" variant={profile.status === "Active" ? "default" : "secondary"}>
                  {profile.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            <Tabs defaultValue="dashboard">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="pending">Pending Cases</TabsTrigger>
                <TabsTrigger value="history">Case History</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Your case statistics and performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardCharts />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <PendingCases />
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <CaseHistory />
              </TabsContent>

              <TabsContent value="appointments" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Appointments</CardTitle>
                      <CardDescription>Manage your schedule</CardDescription>
                    </div>
                    <Button size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((id) => (
                        <div
                          key={id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <h4 className="font-medium">Client Name {id}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>May {12 + id}, 2023, 10:00 AM</span>
                            </div>
                            <p className="text-sm text-gray-500">Initial Consultation</p>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="default" className="mr-4">
                              Upcoming
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View Full Calendar
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border overflow-hidden z-20">
          <ChatInterface onClose={() => setShowChat(false)} />
        </div>
      )}
    </main>
  )
}
