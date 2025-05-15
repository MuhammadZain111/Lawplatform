import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"
import { Scale, Users, Award, MessageSquare } from "../components/icons/Icons.jsx"
import IMAGES from "../constants/Images.js"

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About LawSphere</h1>
            <p className="text-xl opacity-90 mb-8">Connecting clients with the right legal professionals since 2020</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At LawSphere, we believe everyone deserves access to quality legal representation. Our mission is to
                bridge the gap between clients seeking legal assistance and qualified lawyers who can provide the
                expertise they need.
              </p>
              <p className="text-gray-600 mb-6">
                We've built a platform that makes finding, connecting with, and hiring legal professionals simple,
                transparent, and efficient. By leveraging technology, we're transforming how legal services are
                discovered and delivered.
              </p>
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium">Justice made accessible for everyone</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={IMAGES.placeholder.hero || "/placeholder.svg"} alt="LawSphere team" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do at LawSphere</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  We believe legal services should be accessible to everyone, regardless of background or location.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We maintain high standards for the lawyers on our platform, ensuring quality representation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  We promote clear communication and honest reviews to build trust between clients and lawyers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Meet the dedicated professionals behind LawSphere</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((id) => (
              <Card key={id} className="overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={IMAGES.placeholder.avatar || "/placeholder.svg"}
                    alt={`Team member ${id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-lg">Team Member {id}</h3>
                  <p className="text-gray-600">Co-Founder & {id % 2 === 0 ? "CTO" : "CEO"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a client seeking legal help or a lawyer looking to grow your practice, LawSphere is here to
            connect you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/lawyers"
              className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Find a Lawyer
            </a>
            <a
              href="/auth/register"
              className="bg-white/10 text-white px-6 py-3 rounded-md font-medium hover:bg-white/20 transition-colors"
            >
              Join as a Lawyer
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
