"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import HeroSection from "../components/home/HeroSection.jsx"
import FeaturedLawyers from "../components/home/FeaturedLawyers.jsx"
import Testimonials from "../components/home/Testimonials.jsx"
import HowItWorks from "../components/home/HowItWorks.jsx"
import Stats from "../components/home/Stats.jsx"
import Button from "../components/ui/Button.jsx"
import { ArrowRight, CheckCircle, Shield, Users } from "../components/icons/Icons.jsx"

const Home = () => {
  // Refs for animation elements
  const statsRef = useRef(null)
  const featuredRef = useRef(null)
  const howItWorksRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  // Handle scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = [
      statsRef.current,
      featuredRef.current,
      howItWorksRef.current,
      testimonialsRef.current,
      ctaRef.current,
    ]

    elements.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Header />

      <HeroSection />

      <div ref={statsRef} className="opacity-0 transition-all duration-700 ease-out transform translate-y-8">
        <Stats />
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LawSphere?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We connect clients with top legal professionals, making legal services accessible and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Lawyers</h3>
              <p className="text-gray-600">
                Access to a network of verified legal professionals with expertise across various practice areas.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Your information is protected with industry-standard security measures and encryption.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
              <p className="text-gray-600">
                Authentic client reviews and ratings to help you make informed decisions about legal representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div ref={howItWorksRef} className="opacity-0 transition-all duration-700 ease-out transform translate-y-8">
        <HowItWorks />
      </div>

      <div ref={featuredRef} className="opacity-0 transition-all duration-700 ease-out transform translate-y-8">
        <FeaturedLawyers />
      </div>

      <div ref={testimonialsRef} className="opacity-0 transition-all duration-700 ease-out transform translate-y-8">
        <Testimonials />
      </div>

      <div ref={ctaRef} className="opacity-0 transition-all duration-700 ease-out transform translate-y-8">
        <section className="py-20 bg-gradient-to-r from-primary/90 to-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Legal Representative?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of clients who have found the right lawyer for their legal needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/lawyers">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Find a Lawyer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}

export default Home
