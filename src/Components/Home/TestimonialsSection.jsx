import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    type: 'candidate',
    image: '👩‍💻',
    rating: 5,
    text: 'SkillPORT completely changed my job search. The skill-matching feature connected me with opportunities I never would have found otherwise. Landed my dream job in 3 weeks!',
  },
  {
    name: 'Michael Chen',
    role: 'HR Director at TechCorp',
    type: 'recruiter',
    image: '👨‍💼',
    rating: 5,
    
    text: 'As a recruiter, the quality of candidates I find here is exceptional. The smart matching saves hours of screening time, and the interview scheduling is seamless.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Freelance Designer',
    type: 'candidate',
    image: '👩‍🎨',
    rating: 5,
    text: 'The freelance project section is amazing. I get matched with projects that perfectly align with my skills. The secure payment system gives me peace of mind.',
  },
  {
    name: 'David Park',
    role: 'Talent Acquisition Lead',
    type: 'recruiter',
    image: '🧑‍💼',
    rating: 5,
    text: 'We\'ve reduced our time-to-hire by 40% since using SkillPORT. The platform makes it easy to find, evaluate, and hire top talent quickly.',
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground">
            See what our community says about their experience with SkillPORT.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-secondary/20 mb-4" />

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <span
                  className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                    testimonial.type === 'candidate'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {testimonial.type === 'candidate' ? 'Job Seeker' : 'Recruiter'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
