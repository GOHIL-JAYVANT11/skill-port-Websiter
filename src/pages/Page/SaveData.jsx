import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Clock, 
  ChevronDown, 
  LayoutGrid,
  Zap
} from 'lucide-react';
import UserLayout from '../../Components/Layout/UserLayout';
import SavedJobCard from '../../Components/SaveData/SavedJobCard';
import SavedInternshipCard from '../../Components/SaveData/SavedInternshipCard';
import SavedFreelanceCard from '../../Components/SaveData/SavedFreelanceCard';
import SavedCompanyCard from '../../Components/SaveData/SavedCompanyCard';
import { AuthContext } from '../../Context/AuthContext';

const SaveData = () => {
  const [activeCategory, setActiveCategory] = useState('Jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const isRecruiter = user?.role?.toLowerCase() === 'recruiter' || user?.Role?.[0]?.toLowerCase() === 'recruiter';

  useEffect(() => {
    if (isRecruiter) {
      navigate('/recruiter-home');
    }
  }, [isRecruiter, navigate]);

  // Mock Data for other categories
  const [savedItems, setSavedItems] = useState({
    Jobs: [],
    Internships: [],
    Freelancing: [],
    Companies: []
  });

  const categories = ['Jobs', 'Internships', 'Freelancing'];

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (activeCategory !== 'Jobs' || !token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/get-saved-jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Check if data.data is an array (based on API response shown: { success: true, data: [...] })
          const jobsArray = Array.isArray(data.data) ? data.data : (data.data?.jobs || []);
          
          if (data.success && jobsArray) {
            const mappedJobs = jobsArray.map(job => {
              // Check if recId is populated (object) or just an ID (string)
              const recruiter = (job.recId && typeof job.recId === 'object') ? job.recId : {};
              const companyName = recruiter.Fullname || 'Confidential';
              const companyLogo = recruiter.profilePic || ''; 

              return {
                id: job._id,
                title: job.jobtitle,
                companyName: companyName,
                companyLogo: companyLogo,
                location: `${job.City}, ${job.State}`,
                salary: job.SalaryType === 'Negotiable' ? 'Negotiable' : `₹${job.Salary?.minSalary} - ₹${job.Salary?.maxSalary}`,
                experience: job.Experience,
                skillMatch: 95, // Mock data
                postedTime: new Date(job.createdAt).toLocaleDateString(),
              };
            });
            setSavedItems(prev => ({ ...prev, Jobs: mappedJobs }));
          }
        } else {
          console.error('Failed to fetch saved jobs');
        }
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedJobs();
  }, [activeCategory, token]);

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
      const keyName = activeCategory === 'Freelancing' ? 'project' : activeCategory.toLowerCase().replace(/s$/, '');
      const commonProps = { [keyName]: item, onUnsave: handleUnsave };

      switch (activeCategory) {
        case 'Jobs': return <SavedJobCard key={item.id} {...commonProps} />;
        case 'Internships': return <SavedInternshipCard key={item.id} {...commonProps} />;
        case 'Freelancing': return <SavedFreelanceCard key={item.id} {...commonProps} />;
        case 'Companies': return <SavedCompanyCard key={item.id} {...commonProps} />;
        default: return null;
      }
    });
  };

  return (
    <UserLayout>
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
    </UserLayout>
  );
};

export default SaveData;
