import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Heart, 
  ChevronDown, 
  Star, 
  Users, 
  Clock, 
  Filter,
  Sparkles,
  ArrowRight,
  LayoutGrid,
  Building2,
  Zap
} from 'lucide-react';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import UserSidebar from '../../Components/UserHomePage/UserSidebar';
import SavedJobCard from '../../Components/SaveData/SavedJobCard';
import SavedInternshipCard from '../../Components/SaveData/SavedInternshipCard';
import SavedFreelanceCard from '../../Components/SaveData/SavedFreelanceCard';
import SavedCompanyCard from '../../Components/SaveData/SavedCompanyCard';

const SaveData = () => {
  const [activeCategory, setActiveCategory] = useState('Jobs');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock Data
  const [savedItems, setSavedItems] = useState({
    Jobs: [
      { id: 1, title: 'Senior Frontend Developer', companyName: 'TechCorp Solutions', location: 'Remote', salary: '₹18L - ₹25L', experience: '5-8 Yrs', skillMatch: 95, companyLogo: 'https://cdn-icons-png.flaticon.com/512/281/281764.png' },
      { id: 2, title: 'UI/UX Designer', companyName: 'Creative Flow', location: 'Bangalore', salary: '₹12L - ₹18L', experience: '3-5 Yrs', skillMatch: 88, companyLogo: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png' },
      { id: 3, title: 'React Developer', companyName: 'Innovate AI', location: 'Ahmedabad', salary: '₹8L - ₹15L', experience: '2-4 Yrs', skillMatch: 75, companyLogo: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png' },
    ],
    Internships: [
      { id: 4, title: 'Web Development Intern', companyName: 'StartUp Hub', location: 'Remote', stipend: '₹15,000 /mo', duration: '6 Months', skills: ['React', 'Tailwind', 'Node.js'], companyLogo: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
      { id: 5, title: 'Product Design Intern', companyName: 'Design Studio', location: 'Pune', stipend: '₹20,000 /mo', duration: '3 Months', skills: ['Figma', 'UI Design', 'Prototyping'], companyLogo: 'https://cdn-icons-png.flaticon.com/512/2583/2583161.png' },
    ],
    Freelancing: [
      { id: 6, title: 'E-commerce Website Build', budget: '₹50,000 - ₹80,000', duration: '1 Month', experienceLevel: 'Expert', skills: ['Next.js', 'Stripe', 'Supabase'], aiMatch: 92 },
      { id: 7, title: 'Mobile App Bug Fixes', budget: '₹10,000 - ₹15,000', duration: '1 Week', experienceLevel: 'Intermediate', skills: ['React Native', 'Firebase'], aiMatch: 85 },
    ],
    Companies: [
      { id: 8, name: 'Google', industry: 'Internet / Tech', location: 'Hyderabad', rating: 4.8, openPositions: 15, logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
      { id: 9, name: 'Microsoft', industry: 'Software', location: 'Bangalore', rating: 4.6, openPositions: 22, logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png' },
    ]
  });

  const categories = ['Jobs', 'Internships', 'Freelancing'];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleUnsave = (id) => {
    setSavedItems(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].filter(item => item.id !== id)
    }));
  };

  const currentItems = savedItems[activeCategory].filter(item => {
    const title = item.title || item.name || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderCards = () => {
    if (currentItems.length === 0) {
      return (
        <div className="md:col-span-2 text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <LayoutGrid className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No {activeCategory} saved yet</h3>
          <p className="text-slate-500 mb-6">Start browsing to add some {activeCategory.toLowerCase()} to your list.</p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/30 transition-all transform hover:-translate-y-1 active:scale-95">
            Browse {activeCategory}
          </button>
        </div>
      );
    }

    return currentItems.map((item) => {
      const key = activeCategory === 'Freelancing' ? 'project' : activeCategory.toLowerCase().replace(/s$/, '');
      const props = { key: item.id, [key]: item, onUnsave: handleUnsave };

      switch (activeCategory) {
        case 'Jobs': return <SavedJobCard {...props} />;
        case 'Internships': return <SavedInternshipCard {...props} />;
        case 'Freelancing': return <SavedFreelanceCard {...props} />;
        case 'Companies': return <SavedCompanyCard {...props} />;
        default: return null;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <UserNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          <div className="max-w-[1000px] mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                  Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#0F766E]">Items</span>
                </h1>
                <p className="text-slate-500 font-medium">Manage your bookmarked opportunities and companies.</p>
              </div>

              
            </div>

            {/* Category Switch Buttons */}
            <div className="relative mb-8 overflow-x-auto no-scrollbar pb-2">
              <div className="flex items-center gap-3 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2 flex items-center gap-2 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white border-transparent shadow-md shadow-teal-500/20 scale-105'
                        : 'bg-white text-slate-600 border-slate-100 hover:border-teal-200 hover:text-teal-600'
                    }`}
                  >
                    {category}
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${
                      activeCategory === category ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {savedItems[category].length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-slate-100 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[240px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by title..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
                  <MapPin className="w-4 h-4" />
                  Location
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
                  <Clock className="w-4 h-4" />
                  Date Saved
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-xl text-sm font-bold text-teal-700 hover:bg-teal-100 transition-all">
                  <Zap className="w-4 h-4" />
                  Skill Match %
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Cards List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 4, 5].map((i) => (
                  <div key={i} className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {renderCards()}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default SaveData;
