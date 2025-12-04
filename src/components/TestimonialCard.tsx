import { Quote, ArrowUp } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Complications":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Fraude":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Facturation":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-primary-red/20 text-primary-red border-primary-red/30";
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#213245] to-[#0f1b29] rounded-2xl shadow-xl border border-white/10 p-8 lg:p-10 text-white backdrop-blur-xl hover:shadow-2xl hover:shadow-red-900/30 transition-transform duration-300 hover:-translate-y-1 animate-fade-in group interactive">
      {/* Icône guillemets */}
      <Quote className="h-12 w-12 text-red-400 mb-6" />

      {/* Citation */}
      <p className="text-white/90 italic text-lg leading-relaxed mb-6">
        {testimonial.quote}
      </p>

      {/* Séparateur */}
      <div className="w-full h-px bg-white/10 mb-6" />

      {/* Identité et tag */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="font-bold text-white">{testimonial.author}</p>
          <p className="text-sm text-white/70">{testimonial.location}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full border backdrop-blur ${getCategoryColor(testimonial.category)}`}>
          {testimonial.category}
        </span>
      </div>

      {/* Bouton */}
      <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg shadow-red-900/40 transition-transform duration-300 group-hover:-translate-y-0.5">
        Consulter la preuve
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
