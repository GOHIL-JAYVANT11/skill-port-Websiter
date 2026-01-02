import { useEffect, useRef } from 'react';
import { Zap, Calendar, Shield, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Skill-Based Matching',
    description: 'Our AI analyzes skills to auto-match recruiters with the most relevant candidates, saving time and improving hiring quality.',
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Interview & Meeting Management',
    description: 'Schedule, track, and manage all your interviews and meetings in one place with calendar integration.',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Secure Payments & Commission',
    description: 'Escrow-based payments protect both parties. Automated commission system for freelance recruiters.',
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Networking & Messaging',
    description: 'Built-in messaging system for seamless recruiter-candidate communication and professional networking.',
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
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
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why SkillPORT is Different?
          </h2>
          <p className="text-muted-foreground">
            We've reimagined the hiring process with powerful features that benefit everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-card rounded-2xl p-8 border border-border hover:border-secondary/30 hover:shadow-lg transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
