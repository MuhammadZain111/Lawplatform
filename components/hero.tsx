import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Find the Right Legal Expert for Your Case
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with experienced lawyers specializing in various legal fields. Get professional legal advice and
              representation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/lawyers">
                <Button size="lg" className="w-full sm:w-auto">
                  Find a Lawyer
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join as a Lawyer
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src="/placeholder.svg?height=400&width=600" alt="Legal consultation" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
