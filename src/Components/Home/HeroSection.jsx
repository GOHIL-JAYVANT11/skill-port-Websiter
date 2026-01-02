import { useEffect, useRef } from 'react';
import { Search, MapPin, Briefcase, Users, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { cn } from "@/lib/utils";

// Inline Button component
const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    cta: "bg-gradient-to-r from-secondary to-accent text-secondary-foreground hover:opacity-90 shadow-md hover:shadow-lg",
  },
  sizes: {
    default: "h-10 px-5 py-2",
    sm: "h-9 rounded-lg px-4 text-xs",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10",
  }
};

const Button = ({ className, variant = "default", size = "default", ...props }) => {
  return (
    <button
      className={cn(
        buttonVariants.base,
        buttonVariants.variants[variant],
        buttonVariants.sizes[size],
        className
      )}
      {...props}
    />
  );
};

// Inline Input component
const Input = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
};

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const searchRef = useRef(null);
  const illustrationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        illustrationRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Content */}
          <div ref={textRef} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-secondary">
                #1 Skill-Powered Career Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Skill<span className="text-secondary">PORT</span> – Where{' '}
              <span className="text-primary">Skills</span> Meet{' '}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              A smart skill-first hiring platform connecting Job Seekers,
              Freelancers, Recruiters & Companies with powerful matching and
              hiring tools.
            </p>

            {/* Search Bar */}
            <div
              ref={searchRef}
              className="bg-card rounded-2xl p-4 shadow-lg border border-border"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Job Title or Skill"
                    className="pl-12 h-12 bg-muted/50 border-0"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Location"
                    className="pl-12 h-12 bg-muted/50 border-0"
                  />
                </div>
                <Button variant="cta" size="lg" className="h-12 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search Jobs
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg">
                Find Jobs
              </Button>
              <Button variant="outline" size="lg">
                Post a Job
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">
                  50,000+ Active Users
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">
                  500+ Companies
                </span>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div
            ref={illustrationRef}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="w-96 h-80 bg-card rounded-3xl shadow-lg border border-border p-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Senior Developer
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        TechCorp Inc.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                      Node.js
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Salary</span>
                      <span className="font-medium text-foreground">
                        $120k - $150k
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium text-foreground">
                        5+ years
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-foreground">Remote</span>
                    </div>
                  </div>
                  <Button variant="cta" className="w-full mt-4">
                    Apply Now
                  </Button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-secondary/20 rounded-2xl animate-float flex items-center justify-center">
                <span className="text-3xl">💼</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/10 rounded-2xl animate-float animation-delay-1000 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="absolute top-1/2 -right-12 w-16 h-16 bg-accent/15 rounded-xl animate-float animation-delay-500 flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
