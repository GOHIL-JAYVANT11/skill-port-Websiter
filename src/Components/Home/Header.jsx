import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/Images/SkillPORT_logo.png";
import { cn } from "@/lib/utils";

// Inline Button component
const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    cta: "bg-gradient-to-r from-secondary to-accent text-secondary-foreground hover:opacity-90 shadow-md hover:shadow-lg",
  },
  sizes: {
    default: "h-10 px-5 py-2",
    sm: "h-9 rounded-lg px-4 text-xs",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10",
  },
};

const Button = ({
  className,
  variant = "default",
  size = "default",
  ...props
}) => {
  return (
    <button
      className={cn(
        buttonVariants.base,
        buttonVariants.variants[variant],
        buttonVariants.sizes[size],
        className,
      )}
      {...props}
    />
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Jobs", href: "#jobs" },
    { label: "Companies", href: "#companies" },
  ];

  return (
    <header
      className={`fixed top-[-2px] left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto max-h-[45px] px-4 lg:px-6">
        <nav className="flex max-h-[50px] items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1">
            <div className="w-[100px] h-[70px] pt-1.5 rounded-xl  flex items-center justify-center">
              <img
                src={logo}
                alt="SkillPORT logo"
                className="w-[100px] h-[70px] "
              />
            </div>
            <span className="text-xl font-bold">
              Skill<span className="text-[#39C5B9]">PORT</span>
            </span>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex ml-44 items-center gap-12">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-bold text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </a>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button variant="cta" size="sm">
              Post Job
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-card shadow-lg border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
                <Button variant="cta" className="w-full justify-center">
                  Post Job
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
