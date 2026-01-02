import { useEffect, useRef } from 'react';
import { MapPin, Clock, DollarSign, Building2, Bookmark, TrendingUp } from 'lucide-react';
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

const jobs = [
  {
    id: 1,
    company: 'TechCorp Inc.',
    logo: '🏢',
    title: 'Senior React Developer',
    salary: '$120k - $150k',
    experience: '5+ years',
    location: 'Remote',
    type: 'Full-time',
    skills: ['React', 'TypeScript', 'Node.js'],
    trending: true,
  },
  {
    id: 2,
    company: 'DesignHub',
    logo: '🎨',
    title: 'UI/UX Designer',
    salary: '$90k - $110k',
    experience: '3+ years',
    location: 'New York, NY',
    type: 'Full-time',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    trending: true,
  },
  {
    id: 3,
    company: 'DataFlow',
    logo: '📊',
    title: 'Data Scientist',
    salary: '$130k - $160k',
    experience: '4+ years',
    location: 'San Francisco, CA',
    type: 'Full-time',
    skills: ['Python', 'ML', 'TensorFlow'],
    trending: false,
  },
  {
    id: 4,
    company: 'CloudScale',
    logo: '☁️',
    title: 'DevOps Engineer',
    salary: '$115k - $140k',
    experience: '4+ years',
    location: 'Remote',
    type: 'Contract',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    trending: false,
  },
  {
    id: 5,
    company: 'GrowthLabs',
    logo: '📈',
    title: 'Digital Marketing Manager',
    salary: '$80k - $100k',
    experience: '3+ years',
    location: 'Chicago, IL',
    type: 'Full-time',
    skills: ['SEO', 'Google Ads', 'Analytics'],
    trending: true,
  },
  {
    id: 6,
    company: 'FinanceFirst',
    logo: '💰',
    title: 'Financial Analyst',
    salary: '$95k - $120k',
    experience: '2+ years',
    location: 'Boston, MA',
    type: 'Full-time',
    skills: ['Excel', 'SQL', 'Financial Modeling'],
    trending: false,
  },
];

const FeaturedJobsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.job-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
              Latest Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Latest & Trending Jobs
            </h2>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            View All Jobs →
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="job-card bg-card rounded-2xl p-6 border border-border hover:border-secondary/30 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-2xl">
                    {job.logo}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="w-3 h-3" />
                      {job.company}
                    </div>
                  </div>
                </div>
                {job.trending && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    Hot
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4 text-secondary" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {job.experience} • {job.type}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="cta" size="sm" className="flex-1">
                  Apply Now
                </Button>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
