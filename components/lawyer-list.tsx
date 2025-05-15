"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

// Mock data for lawyers
const MOCK_LAWYERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialization: "Family Law",
    rating: 4.8,
    reviews: 124,
    location: "New York, NY",
    image: "/placeholder.svg?height=300&width=300",
    areas: ["Divorce", "Child Custody", "Alimony"],
  },
  {
    id: 2,
    name: "Michael Chen",
    specialization: "Corporate Law",
    rating: 4.9,
    reviews: 89,
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=300&width=300",
    areas: ["Contracts", "Business Formation", "Mergers"],
  },
  {
    id: 3,
    name: "David Rodriguez",
    specialization: "Criminal Defense",
    rating: 4.7,
    reviews: 156,
    location: "Chicago, IL",
    image: "/placeholder.svg?height=300&width=300",
    areas: ["DUI Defense", "Felony Cases", "Misdemeanors"],
  },
  {
    id: 4,
    name: "Emily Wilson",
    specialization: "Real Estate Law",
    rating: 4.6,
    reviews: 78,
    location: "Austin, TX",
    image: "/placeholder.svg?height=300&width=300",
    areas: ["Property Transactions", "Landlord-Tenant", "Zoning"],
  },
]

export default function LawyerList() {
  const [lawyers] = useState(MOCK_LAWYERS)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {lawyers.map((lawyer) => (
        <Card key={lawyer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square relative">
            <img src={lawyer.image || "/placeholder.svg"} alt={lawyer.name} className="w-full h-full object-cover" />
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold mb-1">{lawyer.name}</h3>
            <p className="text-gray-600 mb-2">{lawyer.specialization}</p>
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
              <span className="font-medium">{lawyer.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({lawyer.reviews} reviews)</span>
            </div>
            <div className="flex items-center text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{lawyer.location}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {lawyer.areas.map((area, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/lawyers/${lawyer.id}`} className="w-full">
              <button className="w-full py-2 text-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
