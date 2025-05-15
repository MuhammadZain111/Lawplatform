"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Phone, Mail, Calendar, Award, Briefcase, User } from "lucide-react"
import ClientAuthModal from "@/components/client-auth-modal"

// Mock data for a single lawyer
const MOCK_LAWYER = {
  id: 1,
  name: "Sarah Johnson",
  specialization: "Family Law",
  rating: 4.8,
  reviews: 124,
  location: "New York, NY",
  image: "/placeholder.svg?height=400&width=400",
  phone: "(123) 456-7890",
  email: "sarah.johnson@example.com",
  experience: "15 years",
  education: ["J.D., Harvard Law School", "B.A. in Political Science, Yale University"],
  barAdmissions: ["New York State Bar", "U.S. District Court for the Southern District of New York"],
  languages: ["English", "Spanish"],
  about:
    "Sarah Johnson is a highly experienced family law attorney with over 15 years of practice. She specializes in divorce, child custody, and spousal support cases. Sarah is known for her compassionate approach and dedication to achieving the best possible outcomes for her clients during difficult family transitions.",
  areas: ["Divorce", "Child Custody", "Alimony", "Prenuptial Agreements", "Domestic Violence", "Adoption"],
  testimonials: [
    {
      id: 1,
      name: "Michael T.",
      rating: 5,
      date: "March 15, 2023",
      text: "Sarah was incredibly helpful during my divorce. She was professional, knowledgeable, and compassionate throughout the entire process.",
    },
    {
      id: 2,
      name: "Jennifer L.",
      rating: 5,
      date: "January 8, 2023",
      text: "I couldn't have asked for a better attorney for my custody case. Sarah fought for my rights as a parent and helped me secure a favorable outcome.",
    },
    {
      id: 3,
      name: "Robert K.",
      rating: 4,
      date: "November 22, 2022",
      text: "Sarah provided excellent guidance during a difficult time. Her expertise in family law was evident, and she always kept me informed about my case.",
    },
  ],
}

export default function LawyerProfile() {
  const params = useParams()
  const [lawyer] = useState(MOCK_LAWYER)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleContactClick = () => {
    setIsAuthModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lawyer Info Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                  <img
                    src={lawyer.image || "/placeholder.svg"}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold text-center mb-1">{lawyer.name}</h1>
                <p className="text-gray-600 mb-2">{lawyer.specialization}</p>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="font-medium">{lawyer.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({lawyer.reviews} reviews)</span>
                </div>

                <div className="w-full space-y-4 mt-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{lawyer.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <span>Contact to view</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <span>Contact to view</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{lawyer.experience} experience</span>
                  </div>
                </div>

                <Button className="w-full mt-6" onClick={handleContactClick}>
                  Contact Lawyer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lawyer Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="expertise">Expertise</TabsTrigger>
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About {lawyer.name}</h2>
                    <p className="text-gray-700 mb-6">{lawyer.about}</p>

                    <h3 className="text-lg font-semibold mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {lawyer.languages.map((language, index) => (
                        <Badge key={index} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" onClick={handleContactClick}>
                      Schedule a Consultation
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expertise" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Areas of Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {lawyer.areas.map((area, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" onClick={handleContactClick}>
                      Discuss Your Case
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="credentials" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Education & Credentials</h2>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Education</h3>
                      <ul className="space-y-2">
                        {lawyer.education.map((edu, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Bar Admissions</h3>
                      <ul className="space-y-2">
                        {lawyer.barAdmissions.map((bar, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>{bar}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Client Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                        <span className="font-medium text-lg">{lawyer.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({lawyer.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {lawyer.testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2 mr-3" />
                              <span className="font-medium">{testimonial.name}</span>
                            </div>
                            <div className="flex items-center">
                              {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{testimonial.date}</span>
                          </div>
                          <p className="text-gray-700">{testimonial.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <ClientAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} lawyerName={lawyer.name} />
    </main>
  )
}
