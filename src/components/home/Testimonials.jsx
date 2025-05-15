"use client"

import { useState } from "react"
import { Card, CardContent } from "../ui/Card.jsx"
import Button from "../ui/Button.jsx"
import { ChevronLeft, ChevronRight, Quote } from "../icons/Icons.jsx"
import IMAGES from "../../constants/Images.js"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Michael Thompson",
    role: "Business Owner",
    testimonial:
      "LawSphere helped me find the perfect attorney for my business needs. The platform is intuitive, and I was connected with a lawyer who understood my industry within hours.",
    image: IMAGES.placeholder.avatar,
  },
  {
    id: 2,
    name: "Jennifer Lee",
    role: "Homeowner",
    testimonial:
      "I needed help with a real estate dispute and found an excellent lawyer through LawSphere. The verification process gave me confidence that I was working with a qualified professional.",
    image: IMAGES.placeholder.avatar,
  },
  {
    id: 3,
    name: "Robert Kim",
    role: "Family Law Client",
    testimonial:
      "During a difficult divorce, LawSphere connected me with a compassionate family law attorney who guided me through the entire process. I'm grateful for this platform.",
    image: IMAGES.placeholder.avatar,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    testimonial:
      "The lawyer I found through LawSphere helped me navigate complex contract negotiations. Their expertise was invaluable, and I continue to use their services for my business.",
    image: IMAGES.placeholder.avatar,
  },
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleTestimonials = TESTIMONIALS.slice(activeIndex, activeIndex + 3)

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(TESTIMONIALS.length - 3, prev + 1))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from clients who have found legal solutions through our platform
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 overflow-hidden">
            {visibleTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="flex-1 min-w-0 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <p className="text-gray-700 mb-6 italic">{testimonial.testimonial}</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={activeIndex >= TESTIMONIALS.length - 3}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
