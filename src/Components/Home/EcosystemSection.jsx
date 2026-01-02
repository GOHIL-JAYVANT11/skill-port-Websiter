import { useEffect, useRef } from 'react';
import { 
  UserPlus, 
  FileText, 
  Search, 
  Zap, 
  Send, 
  CreditCard, 
  Star, 
  MessageSquare,
  Briefcase,
  Users,
  Download,
  Calendar,
  Shield,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

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

const jobSeekerFeatures = [
  { icon: <UserPlus className="w-5 h-5" />, text: 'Create Profile' },
  { icon: <FileText className="w-5 h-5" />, text: 'Add Skills, Resume, Portfolio' },
  { icon: <Search className="w-5 h-5" />, text: 'Find Jobs, Internships & Freelance Projects' },
  { icon: <Zap className="w-5 h-5" />, text: 'Smart Skill-Based Job Matching' },
  { icon: <Send className="w-5 h-5" />, text: 'Apply Easily' },
  { icon: <CreditCard className="w-5 h-5" />, text: 'Work & Payment Management' },
  { icon: <Star className="w-5 h-5" />, text: 'Ratings & Reviews' },
  { icon: <MessageSquare className="w-5 h-5" />, text: 'Messaging & Interview Management' },
];

const recruiterFeatures = [
  { icon: <Briefcase className="w-5 h-5" />, text: 'Post Jobs / Internships / Freelance Projects' },
  { icon: <Users className="w-5 h-5" />, text: 'View & Filter Candidates' },
  { icon: <Zap className="w-5 h-5" />, text: 'Smart Skill Matching (Top 5 Matches)' },
  { icon: <Download className="w-5 h-5" />, text: 'Download Resume / Portfolio' },
  { icon: <Calendar className="w-5 h-5" />, text: 'Schedule Meetings' },
  { icon: <Shield className="w-5 h-5" />, text: 'Escrow Payment Support' },
  { icon: <CheckCircle2 className="w-5 h-5" />, text: 'Hire Securely' },
  { icon: <Star className="w-5 h-5" />, text: 'Rate Candidates' },
];

const EcosystemSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ecosystem-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
            Two Powerful Ecosystems
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            One Platform, Complete Solutions
          </h2>
          <p className="text-muted-foreground">
            Whether you're looking for your next opportunity or searching for top talent, 
            SkillPORT has the tools you need.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Job Seeker Panel */}
          <div className="ecosystem-card bg-card rounded-3xl p-8 lg:p-10 border border-border relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-2xl mb-6">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">
                For Job Seekers & Freelancers
              </h3>
              <p className="text-muted-foreground mb-8">
                Build your profile, showcase your skills, and find opportunities that match your expertise.
              </p>

              <div className="space-y-4 mb-8">
                {jobSeekerFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="cta">Register as Job Seeker</Button>
                <Button variant="outline">Browse Jobs</Button>
              </div>
            </div>
          </div>

          {/* Recruiter Panel */}
          <div className="ecosystem-card bg-primary rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/20 rounded-2xl mb-6">
                <Briefcase className="w-7 h-7 text-secondary" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                For Recruiters & Freelance Recruiters
              </h3>
              <p className="text-primary-foreground/70 mb-8">
                Post opportunities, find matched talent, and hire securely with our smart tools.
              </p>

              <div className="space-y-4 mb-8">
                {recruiterFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-primary-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">Register as Recruiter</Button>
                <Button variant="ghost" className="text-primary-foreground border-primary-foreground/30 border hover:bg-primary-foreground/10">
                  Post a Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
