import { useEffect, useRef } from 'react';
import { 
  Code2, 
  Megaphone, 
  Wrench, 
  BarChart3, 
  Palette, 
  Users2, 
  Laptop, 
  GraduationCap 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'IT & Software',
    description: 'Development, DevOps, Cloud & More',
    count: 450,
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: 'Marketing',
    description: 'Digital Marketing, SEO, Social Media',
    count: 280,
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: 'Engineering',
    description: 'Mechanical, Civil, Electrical',
    count: 190,
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Business & Management',
    description: 'Strategy, Operations, Finance',
    count: 320,
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Designers',
    description: 'UI/UX, Graphic Design, Product',
    count: 215,
  },
  {
    icon: <Users2 className="w-8 h-8" />,
    title: 'HR & Operations',
    description: 'Recruitment, Admin, Support',
    count: 145,
  },
  {
    icon: <Laptop className="w-8 h-8" />,
    title: 'Freelance Projects',
    description: 'Short-term, Contract, Gig Work',
    count: 340,
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Internships',
    description: 'Training, Entry-level Positions',
    count: 180,
  },
];

const CategoriesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.category-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Opportunities by Skill & Category
          </h2>
          <p className="text-muted-foreground">
            Find the perfect role that matches your skills and career goals
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card group bg-card rounded-2xl p-6 border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 bg-secondary/10 group-hover:bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary mb-5 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary">
                  {category.count} Jobs
                </span>
                <span className="text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
