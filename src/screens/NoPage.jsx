"use client"

import { Link } from "react-router-dom"
import Button from "../components/ui/Button.jsx"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { Scale } from "../components/icons/Icons.jsx"

const NoPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-12">
          <Scale className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.history.back()}>Go Back</Button>
            <Link to="/">
              <Button variant="outline">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NoPage
