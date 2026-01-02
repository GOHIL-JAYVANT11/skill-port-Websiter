import { useEffect, useRef, useState } from 'react';
import { Briefcase, Users, UserCheck, FolderKanban, Video, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: <Briefcase className="w-6 h-6" />, value: 1450, suffix: '+', label: 'Active Jobs' },
  { icon: <Users className="w-6 h-6" />, value: 50000, suffix: '+', label: 'Job Seekers' },
  { icon: <UserCheck className="w-6 h-6" />, value: 120, suffix: '+', label: 'Active Recruiters' },
  { icon: <FolderKanban className="w-6 h-6" />, value: 340, suffix: '+', label: 'Freelance Projects' },
  { icon: <Video className="w-6 h-6" />, value: 2800, suffix: '+', label: 'Interviews Scheduled' },
  { icon: <Award className="w-6 h-6" />, value: 8500, suffix: '+', label: 'Successful Hirings' },
];

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'k';
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-primary-foreground whitespace-nowrap tabular-nums">
      {formatNumber(count)}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30 },
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
    <section ref={sectionRef} className="py-20 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-foreground/10"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-xl text-secondary mb-4">
                {stat.icon}
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-primary-foreground/70 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
