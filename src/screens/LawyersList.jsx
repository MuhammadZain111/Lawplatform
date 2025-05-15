"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/Card.jsx"
import Input from "../components/ui/Input.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select.jsx"
import Checkbox from "../components/ui/Checkbox.jsx"
import Label from "../components/ui/Label.jsx"
import Button from "../components/ui/Button.jsx"
import { Search } from "../components/icons/Icons.jsx"
import LawyerList from "../components/LawyerList.jsx"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

const LawyersList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialization, setSpecialization] = useState("all")
  const [location, setLocation] = useState("all")
  const [ratings, setRatings] = useState({
    4: false,
    3: false,
    2: false,
    1: false,
  })

  const handleRatingChange = (rating) => {
    setRatings((prev) => ({
      ...prev,
      [rating]: !prev[rating],
    }))
  }

  const handleApplyFilters = () => {
    // In a real app, this would filter the lawyers based on the selected criteria
    console.log("Applying filters:", { searchTerm, specialization, location, ratings })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Find a Lawyer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="search"
                      placeholder="Search by name"
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Select value={specialization} onValueChange={setSpecialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="All specializations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All specializations</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="criminal">Criminal Defense</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="realestate">Real Estate Law</SelectItem>
                      <SelectItem value="ip">Intellectual Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="newyork">New York, NY</SelectItem>
                      <SelectItem value="losangeles">Los Angeles, CA</SelectItem>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                      <SelectItem value="houston">Houston, TX</SelectItem>
                      <SelectItem value="miami">Miami, FL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Rating</Label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={ratings[rating]}
                          onCheckedChange={() => handleRatingChange(rating)}
                        />
                        <Label htmlFor={`rating-${rating}`} className="font-normal">
                          {rating}+ stars
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lawyer Listings */}
          <div className="lg:col-span-3">
            <LawyerList />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default LawyersList
