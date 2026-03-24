import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Sparkles, Lightbulb } from 'lucide-react';
import UserLayout from '../../Components/Layout/UserLayout';
import ProposalAnalytics from '../../Components/MyProposal/ProposalAnalytics';
import FilterTabs from '../../Components/MyProposal/FilterTabs';
import ProposalCard from '../../Components/MyProposal/ProposalCard';
import ProposalDetailModal from '../../Components/MyProposal/ProposalDetailModal';

const MyProposals = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Mock Data based on Schema
  const mockProposals = [
    {
      id: 'prop-1',
      projectTitle: 'Build MERN Stack Dashboard',
      clientName: 'TechNova Pvt Ltd',
      coverLetter: 'I have extensive experience building scalable MERN stack applications. I can deliver this dashboard with full authentication, real-time data updates, and a responsive UI within your timeframe.',
      budget: 25000,
      deliveryDays: 7,
      attachmentsCount: 2,
      status: 'Pending',
      date: 'Oct 24, 2023'
    },
    {
      id: 'prop-2',
      projectTitle: 'E-commerce Mobile App UI/UX',
      clientName: 'StyleStore',
      coverLetter: 'As a senior UI/UX designer, I specialize in creating high-converting e-commerce experiences. I have attached similar case studies in my portfolio.',
      budget: 40000,
      deliveryDays: 14,
      attachmentsCount: 1,
      status: 'Accepted',
      date: 'Oct 20, 2023'
    },
    {
      id: 'prop-3',
      projectTitle: 'Python Web Scraper Script',
      clientName: 'DataCorp',
      coverLetter: 'I can write a robust Python script using BeautifulSoup and Selenium to extract the required data and export it to CSV format.',
      budget: 8000,
      deliveryDays: 3,
      attachmentsCount: 0,
      status: 'Rejected',
      date: 'Oct 15, 2023'
    }
  ];

  const stats = {
    total: 8,
    accepted: 2,
    rejected: 3,
    successRate: 25
  };

  const filteredProposals = useMemo(() => {
    return mockProposals.filter(p => {
      const matchesTab = activeTab === 'All' || p.status === activeTab;
      const matchesSearch = p.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleViewDetails = (proposal) => {
    setSelectedProposal(proposal);
    setIsDetailModalOpen(true);
  };

  const handleWithdraw = (proposal) => {
    if(window.confirm('Are you sure you want to withdraw this proposal?')) {
      alert('Proposal withdrawn successfully.');
    }
  };

  const handleEdit = (proposal) => {
    alert('Edit modal would open here.');
  };

  return (
    <UserLayout>
      <div className="max-w-[1200px] mx-auto space-y-8 pb-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-teal-50">
                <Sparkles className="w-5 h-5 text-teal-600" />
              </div>
              <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">Freelancer Hub</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Proposals</span>
            </h1>
            <p className="text-slate-500 text-sm mt-3 font-medium">Track and manage your submitted project bids.</p>
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all shadow-sm"
              />
            </div>
            <div className="relative hidden sm:block">
              <select className="appearance-none bg-white border border-slate-200 rounded-2xl pl-5 pr-10 py-3.5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all shadow-sm cursor-pointer">
                <option>Latest First</option>
                <option>Budget: High to Low</option>
                <option>Delivery Time</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[24px] p-6 text-white flex items-start sm:items-center gap-4 shadow-lg">
          <div className="p-3 bg-teal-500/20 rounded-xl shrink-0">
            <Lightbulb className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h4 className="font-black text-lg mb-1">AI Insight</h4>
            <p className="text-slate-300 text-sm font-medium">
              You have submitted 8 proposals. 2 accepted. <span className="text-teal-400 font-bold">Adding portfolio links increases acceptance chance by 35%.</span> Try updating your pending proposals.
            </p>
          </div>
        </div>

        {/* Analytics */}
        <ProposalAnalytics stats={stats} />

        {/* Main Content Area */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
          <div className="mb-6 border-b border-slate-100">
            <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProposals.length > 0 ? (
              filteredProposals.map(proposal => (
                <ProposalCard 
                  key={proposal.id} 
                  proposal={proposal} 
                  onView={handleViewDetails}
                  onEdit={handleEdit}
                  onWithdraw={handleWithdraw}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">No proposals found</h3>
                <p className="text-slate-500 font-medium">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && (
        <ProposalDetailModal 
          proposal={selectedProposal} 
          onClose={() => setIsDetailModalOpen(false)} 
        />
      )}
    </UserLayout>
  );
};

export default MyProposals;
