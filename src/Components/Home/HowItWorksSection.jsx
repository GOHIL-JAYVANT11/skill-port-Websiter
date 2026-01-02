import { useEffect, useRef } from 'react';
import { UserPlus, Zap, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    step: '01',
    title: 'Create Account',
    description: 'Sign up as a Job Seeker, Freelancer, or Recruiter. Build your profile and showcase your skills or company.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    step: '02',
    title: 'Smart Match & Apply / Hire',
    description: 'Our AI matches candidates with opportunities. Apply to jobs or find the perfect talent for your needs.',
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    step: '03',
    title: 'Interview – Payment – Success',
    description: 'Schedule interviews, manage the hiring process, and complete secure payments. Start your success journey!',
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.step-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.timeline-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.5,
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
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How SkillPORT Works
          </h2>
          <p className="text-muted-foreground">
            Get started in three simple steps and transform your career or hiring process.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-border">
            <div className="timeline-line absolute inset-0 bg-gradient-to-r from-secondary to-accent origin-left" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="step-card relative">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-secondary-foreground relative z-10">
                    {step.icon}
                  </div>
                  <span className="text-5xl font-bold text-muted/50">{step.step}</span>
                </div>

                {/* Content */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-secondary to-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
