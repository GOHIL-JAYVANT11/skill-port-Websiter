import { ArrowRight, Building2, Users } from 'lucide-react';
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

const RecruiterCTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="cta-gradient rounded-3xl p-12 lg:p-16 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                For Recruiters & Companies
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Are You a Recruiter or Company?
            </h2>

            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Hire the best talent faster with SkillPORT. Our smart matching system 
              helps you find candidates that perfectly match your requirements.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" className="gap-2">
                <Users className="w-5 h-5" />
                Post a Job
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Register as Recruiter
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-foreground/10">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  3x
                </div>
                <p className="text-sm text-primary-foreground/60">Faster Hiring</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  85%
                </div>
                <p className="text-sm text-primary-foreground/60">Match Accuracy</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  500+
                </div>
                <p className="text-sm text-primary-foreground/60">Happy Companies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterCTASection;
