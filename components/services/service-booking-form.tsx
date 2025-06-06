"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const SERVICE_TYPES = [
  "Family Law",
  "Corporate Law",
  "Criminal Defense",
  "Real Estate Law",
  "Immigration Law",
  "Intellectual Property",
  "Personal Injury",
  "Tax Law",
  "Employment Law",
  "Estate Planning",
  "Other",
]

export default function ServiceBookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
  })
  const [date, setDate] = useState<Date | undefined>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your service request. A member of our team will contact you within 24 hours to discuss your
            legal needs and match you with the right lawyer.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>Submit Another Request</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="(123) 456-7890"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Preferred Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceType">Service Type</Label>
        <Select onValueChange={handleServiceTypeChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a service type" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Describe your legal needs</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Please provide details about your legal situation and what kind of help you're looking for..."
          rows={5}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Request Consultation"}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        By submitting this form, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  )
}
