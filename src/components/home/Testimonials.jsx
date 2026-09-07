import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    quote: "Learning IoT and building my first smart sensor node with CIoT's in-house kit gave me the confidence to pursue emerging technology in engineering.",
    name: "Workshop Student",
    role: "Class XII STEM Student",
    institution: "School Tech Camp Participant",
  },
  {
    quote: "The Train-the-Teacher (ToT) program equipped our faculty to comfortably guide school students in microcontrollers, robotics, and innovation clubs.",
    name: "High School Teacher",
    role: "Senior Science Educator",
    institution: "ToT Programme Certified",
  },
  {
    quote: "IoTify Lab's outreach brought practical AI and robotics exposure directly to our students, bridging the gap between textbook theory and real-world application.",
    name: "School Principal",
    role: "Institutional Head",
    institution: "Partner School Outreach",
  },
  {
    quote: "Building real-time telemetry projects using CIoT in-house learning kits was the highlight of the 3-day technology bootcamp at MITS Gwalior.",
    name: "Bootcamp Participant",
    role: "Undergraduate Researcher",
    institution: "MITS Gwalior Workshop",
  },
  {
    quote: "The experiential, project-based approach using specialized kits developed by CIoT made complex embedded systems concepts easy to understand.",
    name: "Innovation Club Member",
    role: "Student Researcher",
    institution: "STEM Innovation Club",
  },
];

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);

  // Triple items for seamless marquee loop
  const marqueeReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section className="relative py-20 lg:py-28 bg-cream-primary text-gray-900 overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.4] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-badge mb-4 text-xs sm:text-sm tracking-[0.25em] font-mono text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mr-2" />
            PARTICIPANT FEEDBACK
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-900 mb-6">
            What educators & participants say about{" "}
            <span className="text-accent">IoTify Lab.</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Real feedback from school students, teachers, and workshop participants who experienced hands-on learning with CIoT MITS.
          </p>
        </motion.div>
      </div>

      {/* Infinite Auto-Playing Marquee Carousel */}
      <div
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Keyframe animation for seamless marquee */}
        <style>{`
          @keyframes testimonialMarquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
          .testimonial-track {
            animation: testimonialMarquee 38s linear infinite;
            will-change: transform;
          }
          .testimonial-paused {
            animation-play-state: paused !important;
          }
        `}</style>

        {/* Left Edge Vignette Overlay */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-44 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(255,242,229,1) 0%, rgba(255,242,229,0.8) 60%, transparent 100%)",
          }}
        />

        {/* Right Edge Vignette Overlay */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-44 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(255,242,229,1) 0%, rgba(255,242,229,0.8) 60%, transparent 100%)",
          }}
        />

        {/* Marquee Track */}
        <div
          className={`flex items-stretch gap-6 w-max testimonial-track ${
            isHovered ? "testimonial-paused" : ""
          }`}
        >
          {marqueeReviews.map((rev, idx) => (
            <div
              key={`${rev.name}-${idx}`}
              className="group relative w-[320px] sm:w-[420px] p-8 rounded-3xl border border-gray-200 bg-white shadow-sm flex-shrink-0 flex flex-col justify-between transition-all duration-300 hover:border-accent hover:shadow-md hover:-translate-y-1 text-justify"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-accent">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={16} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-body mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-gray-900 text-base group-hover:text-accent transition-colors">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-body">
                    {rev.role} • <span className="text-gray-700">{rev.institution}</span>
                  </p>
                </div>
                <Quote size={24} className="text-accent/20 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
