import { Users, Scale, MessageSquare, Award } from "lucide-react"

export default function Stats() {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Users className="h-10 w-10 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">10,000+</div>
            <div className="text-primary-foreground/80">Clients Served</div>
          </div>
          <div className="flex flex-col items-center">
            <Scale className="h-10 w-10 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">2,500+</div>
            <div className="text-primary-foreground/80">Verified Lawyers</div>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="h-10 w-10 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">50,000+</div>
            <div className="text-primary-foreground/80">Consultations</div>
          </div>
          <div className="flex flex-col items-center">
            <Award className="h-10 w-10 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">95%</div>
            <div className="text-primary-foreground/80">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
