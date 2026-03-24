import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, LayoutGrid, List, Search, BrainCircuit, 
  Calendar as CalendarIcon, Filter, SlidersHorizontal, ChevronRight, Zap
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useAuth } from '../../Context/AuthContext';

import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import Footer from '../../Components/Home/Footer';

// Sub-components
import InterviewStatsBar from '../../Components/RecuiterInterview/InterviewStatsBar';
import InterviewFilterTabs from '../../Components/RecuiterInterview/InterviewFilterTabs';
import InterviewSearchBar from '../../Components/RecuiterInterview/InterviewSearchBar';
import InterviewCard from '../../Components/RecuiterInterview/InterviewCard';
import CalendarView from '../../Components/RecuiterInterview/CalendarView';

// Modals
import RescheduleModal from '../../Components/RecuiterInterview/RescheduleModal';
import CancelInterviewModal from '../../Components/RecuiterInterview/CancelInterviewModal';
import MarkCompleteModal from '../../Components/RecuiterInterview/MarkCompleteModal';
import ScheduleInterviewModal from '../../Components/SkillMatch/ScheduleInterviewModal';

const RecuiterInterviewpage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isMarkCompleteOpen, setIsMarkCompleteOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Real Data from API
  const [interviews, setInterviews] = useState([]);

  // Fetch Meetings from API
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-recruiter-meetings', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        if (result.success) {
          // Map API data to component format
          const mappedData = result.data.map(meeting => ({
            id: meeting._id,
            candidateName: meeting.candidateId?.Fullname || 'Unknown Candidate',
            candidatePhoto: meeting.candidateId?.profilePic?.trim().replace(/^`|`$/g, '') || '',
            candidateEmail: meeting.candidateId?.email || '',
            jobTitle: meeting.jobId?.jobtitle || 'General Position',
            date: meeting.interviewDate ? new Date(meeting.interviewDate).toISOString().split('T')[0] : '',
            time: meeting.interviewTime || '',
            duration: meeting.duration || 30,
            mode: meeting.interviewType || 'Online',
            platform: meeting.meetingPlatform || 'SkillPort Meet',
            interviewerName: meeting.interviewTitle || 'Interviewer',
            status: meeting.status || 'Scheduled',
            meetingLink: meeting.meetingLink?.trim().replace(/^`|`$/g, '') || '',
            notes: meeting.notes || '',
            // Store IDs for update API
            jobId: meeting.jobId?._id || meeting.jobId,
            candidateId: meeting.candidateId?._id || meeting.candidateId,
            applicationId: meeting.applicationId?._id || meeting.applicationId,
            interviewTitle: meeting.interviewTitle,
            interviewType: meeting.interviewType,
            meetingPlatform: meeting.meetingPlatform,
            interviewDate: meeting.interviewDate,
            interviewTime: meeting.interviewTime,
            result: meeting.result || 'Pending'
          }));
          setInterviews(mappedData);
        } else {
          toast.error(result.message || 'Failed to fetch meetings');
        }
      } catch (error) {
        console.error('Error fetching meetings:', error);
        toast.error('An error occurred while fetching meetings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [token]);

  // Derived Stats
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      total: interviews.length,
      today: interviews.filter(i => i.date === today).length,
      completed: interviews.filter(i => i.status === 'Completed').length,
      cancelled: interviews.filter(i => i.status === 'Cancelled').length,
    };
  }, [interviews]);

  const tabCounts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      All: interviews.length,
      Upcoming: interviews.filter(i => i.status === 'Scheduled' || i.status === 'Rescheduled').length,
      Today: interviews.filter(i => i.date === today).length,
      Completed: interviews.filter(i => i.status === 'Completed').length,
      Cancelled: interviews.filter(i => i.status === 'Cancelled').length,
      Rescheduled: interviews.filter(i => i.status === 'Rescheduled').length,
    };
  }, [interviews]);

  // Filter and Sort Logic
  const filteredInterviews = useMemo(() => {
    let filtered = [...interviews];
    const today = new Date().toISOString().split('T')[0];

    // Tab Filter
    if (activeTab === 'Upcoming') {
      filtered = filtered.filter(i => i.status === 'Scheduled' || i.status === 'Rescheduled');
    } else if (activeTab === 'Today') {
      filtered = filtered.filter(i => i.date === today);
    } else if (activeTab !== 'All') {
      filtered = filtered.filter(i => i.status === activeTab);
    }

    // Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(i => 
        i.candidateName.toLowerCase().includes(q) || 
        i.jobTitle.toLowerCase().includes(q)
      );
    }

    // Job Filter
    if (jobFilter) {
      filtered = filtered.filter(i => i.jobTitle === jobFilter);
    }

    // Mode Filter
    if (modeFilter) {
      filtered = filtered.filter(i => i.mode === modeFilter);
    }

    // Date Filter
    if (dateFilter) {
      filtered = filtered.filter(i => i.date === dateFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      if (sortOrder === 'newest') return dateB - dateA;
      if (sortOrder === 'oldest') return dateA - dateB;
      if (sortOrder === 'today') {
        const isTodayA = a.date === today ? 0 : 1;
        const isTodayB = b.date === today ? 0 : 1;
        return isTodayA - isTodayB || dateA - dateB;
      }
      return 0;
    });

    return filtered;
  }, [interviews, activeTab, searchQuery, jobFilter, modeFilter, dateFilter, sortOrder]);

  // Action Handlers
  const handleReschedule = (interview) => {
    setSelectedInterview(interview);
    setIsRescheduleOpen(true);
  };

  const handleCancel = (interview) => {
    setSelectedInterview(interview);
    setIsCancelOpen(true);
  };

  const handleMarkComplete = (interview) => {
    setSelectedInterview(interview);
    setIsMarkCompleteOpen(true);
  };

  const handleJoinNow = (interview) => {
    if (interview.meetingLink) {
      // Check if it's a SkillPort internal meeting
      if (interview.platform === 'SkillPort Meet' || interview.meetingLink.includes('SkillPortMeeting.com')) {
        const roomCode = interview.meetingLink.split('/').pop();
        navigate(`/meet/${roomCode}`);
      } else {
        window.open(interview.meetingLink, '_blank');
      }
      toast.success('Joining meeting...');
    }
  };

  const handleRescheduleSubmit = (data) => {
    setInterviews(prev => prev.map(i => 
      i.id === data.interviewId 
        ? { ...i, date: data.newDate, time: data.newTime, status: 'Rescheduled' } 
        : i
    ));
    setIsRescheduleOpen(false);
    toast.success('Interview rescheduled successfully! Candidate notified.');
  };

  const handleCancelSubmit = (data) => {
    setInterviews(prev => prev.map(i => 
      i.id === data.interviewId ? { ...i, status: 'Cancelled' } : i
    ));
    setIsCancelOpen(false);
    toast.error('Interview cancelled. Rejection email sent to candidate.');
  };

  const handleMarkCompleteSubmit = async (data) => {
    if (!token || !selectedInterview) return;

    if (data.outcome === "Next Round" && (!data.newDate || !data.newTime)) {
      toast.error("Please provide a date and time for the next round");
      return;
    }

    try {
      // Logic for status and date/time
      let finalStatus = 'Completed';
      let finalDate = selectedInterview.interviewDate;
      let finalTime = selectedInterview.interviewTime;

      if (data.outcome === "Next Round") {
        finalStatus = 'Scheduled'; // Or keep as is, but usually Next Round means a new scheduled interview
        finalDate = data.newDate;
        finalTime = data.newTime;
      } else if (data.outcome === "On Hold") {
        finalStatus = selectedInterview.status; // Keep original status if On Hold
      }

      const updateData = {
        jobId: selectedInterview.jobId,
        candidateId: selectedInterview.candidateId,
        applicationId: selectedInterview.applicationId,
        interviewTitle: selectedInterview.interviewTitle,
        interviewType: selectedInterview.interviewType,
        meetingPlatform: selectedInterview.meetingPlatform,
        meetingLink: selectedInterview.meetingLink,
        interviewDate: finalDate,
        interviewTime: finalTime,
        duration: selectedInterview.duration,
        notes: data.internalNotes || selectedInterview.notes,
        status: finalStatus,
        result: data.outcome
      };

      const response = await fetch(`http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/update-meeting/${selectedInterview.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();
      if (result.success) {
        setInterviews(prev => prev.map(i => 
          i.id === selectedInterview.id ? { ...i, status: finalStatus, result: data.outcome, date: finalDate, time: finalTime } : i
        ));
        setIsMarkCompleteOpen(false);
        toast.success('Interview outcome updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update meeting status');
      }
    } catch (error) {
      console.error('Error updating meeting status:', error);
      toast.error('An error occurred while updating meeting status');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <RecruiterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pr-0">
          <div className="max-w-[1200px] mx-auto">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-teal-100 text-teal-600 rounded-lg">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">Interview Management</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                  Track & Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Interviews</span>
                </h1>
                <p className="text-slate-500 text-sm mt-2 font-medium tracking-tight">Streamline your hiring process with AI-powered interview tracking.</p>
              </motion.div>

              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsScheduleOpen(true)}
                className="flex items-center gap-2.5 bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white px-8 py-4 rounded-3xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-500/20 active:scale-95 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Schedule Interview
              </motion.button>
            </div>

            {/* Top Stats Bar */}
            <InterviewStatsBar stats={stats} />

            {/* Filter Tabs */}
            <InterviewFilterTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              counts={tabCounts}
            />

            {/* Search and Advanced Filters */}
            <InterviewSearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              jobFilter={jobFilter}
              onJobFilterChange={setJobFilter}
              modeFilter={modeFilter}
              onModeFilterChange={setModeFilter}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              jobOptions={[
                { value: 'Senior Frontend Engineer', label: 'Senior Frontend Engineer' },
                { value: 'Product Designer', label: 'Product Designer' },
                { value: 'DevOps Engineer', label: 'DevOps Engineer' },
              ]}
            />

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                    ${viewMode === 'list' ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List className="w-4 h-4" />
                  List View
                </button>
                <button 
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                    ${viewMode === 'calendar' ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <CalendarIcon className="w-4 h-4" />
                  Calendar
                </button>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full border border-teal-100">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {filteredInterviews.length} Results Found
                </span>
              </div>
            </div>

            {/* Main Content: List or Calendar */}
            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {viewMode === 'list' ? (
                    <motion.div 
                      key="list"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {filteredInterviews.length > 0 ? (
                        filteredInterviews.map((interview) => (
                          <InterviewCard 
                            key={interview.id} 
                            interview={interview}
                            onReschedule={handleReschedule}
                            onCancel={handleCancel}
                            onMarkComplete={handleMarkComplete}
                            onViewProfile={() => toast.info('Candidate profile feature coming soon!')}
                            onJoinNow={handleJoinNow}
                          />
                        ))
                      ) : (
                        <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-slate-300" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">No interviews found</h3>
                          <p className="text-sm font-bold text-slate-500 mb-8">We couldn't find any interviews matching your current criteria.</p>
                          <button 
                            onClick={() => {setActiveTab('All'); setSearchQuery(''); setJobFilter(''); setModeFilter(''); setDateFilter('');}}
                            className="px-8 py-3 bg-teal-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
                          >
                            Clear All Filters
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="calendar"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <CalendarView interviews={interviews} />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {/* Modals */}
      <RescheduleModal 
        isOpen={isRescheduleOpen} 
        onClose={() => setIsRescheduleOpen(false)} 
        onSubmit={handleRescheduleSubmit}
        interview={selectedInterview}
      />
      <CancelInterviewModal 
        isOpen={isCancelOpen} 
        onClose={() => setIsCancelOpen(false)} 
        onSubmit={handleCancelSubmit}
        interview={selectedInterview}
      />
      <MarkCompleteModal 
        isOpen={isMarkCompleteOpen} 
        onClose={() => setIsMarkCompleteOpen(false)} 
        onSubmit={handleMarkCompleteSubmit}
        interview={selectedInterview}
      />
      <ScheduleInterviewModal 
        isOpen={isScheduleOpen} 
        onClose={() => setIsScheduleOpen(false)} 
        onSubmit={(data) => {
          setInterviews(prev => [...prev, { ...data, id: prev.length + 1, status: 'Scheduled', candidateName: 'New Candidate', jobTitle: 'General Position' }]);
          setIsScheduleOpen(false);
          toast.success('Interview scheduled successfully!');
        }}
        candidateName="Selected Candidate"
        jobTitle="Target Role"
      />

      {/* Mobile Schedule FAB */}
      <button 
        onClick={() => setIsScheduleOpen(true)}
        className="lg:hidden fixed bottom-20 right-6 w-16 h-16 bg-gradient-to-tr from-teal-500 to-teal-700 text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all z-40 border-4 border-white"
      >
        <PlusCircle className="w-8 h-8" />
      </button>

      {/* CSS for custom styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}} />
    </div>
  );
};

export default RecuiterInterviewpage;
