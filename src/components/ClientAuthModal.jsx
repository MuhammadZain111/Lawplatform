"use client"

import { useState } from "react"
import Button from "./ui/Button.jsx"
import Input from "./ui/Input.jsx"
import Label from "./ui/Label.jsx"
import Checkbox from "./ui/Checkbox.jsx"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/Dialog.jsx"
import { AlertCircle, CheckCircle2 } from "./icons/Icons.jsx"
import { Alert, AlertDescription } from "./ui/Alert.jsx"
import { Phone, Mail } from "./icons/Icons.jsx"

const ClientAuthModal = ({ isOpen, onClose, lawyerName }) => {
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    if (!termsAccepted) {
      setError("You must accept the Terms of Service and Privacy Policy")
      return
    }

    setIsLoading(true)

    // Simulate API call to send verification code
    try {
      // In a real app, this would call the backend to send an OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll just move to the next step
      setStep("verification")
    } catch (err) {
      setError("Failed to send verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!verificationCode || verificationCode.length < 4) {
      setError("Please enter a valid verification code")
      return
    }

    setIsLoading(true)

    // Simulate API call to verify code
    try {
      // In a real app, this would verify the OTP with the backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll just move to the success step
      // In a real app, we would verify the code against what was sent
      setStep("success")
    } catch (err) {
      setError("Invalid verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    // Reset state when closing
    setStep("phone")
    setPhone("")
    setVerificationCode("")
    setError("")
    setTermsAccepted(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "phone" && (
          <>
            <DialogHeader>
              <DialogTitle>Verify your phone number</DialogTitle>
              <DialogDescription>To contact {lawyerName}, we need to verify your phone number.</DialogDescription>
            </DialogHeader>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="(123) 456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === "verification" && (
          <>
            <DialogHeader>
              <DialogTitle>Enter verification code</DialogTitle>
              <DialogDescription>We've sent a verification code to {phone}. Please enter it below.</DialogDescription>
            </DialogHeader>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setStep("phone")}>
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle>Verification Successful</DialogTitle>
              <DialogDescription>You can now contact {lawyerName}.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-6">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <p className="text-center mb-4">Contact information for {lawyerName}:</p>
              <div className="w-full space-y-2 border rounded-md p-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <span>sarah.johnson@example.com</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ClientAuthModal
