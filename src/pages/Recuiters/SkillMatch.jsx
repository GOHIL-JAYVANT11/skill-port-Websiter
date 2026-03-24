import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import RecruiterNavbar from "../../Components/Recuiters-Home/RecruiterNavbar";
import { BrainCircuit, Briefcase, ChevronDown, Sparkles } from "lucide-react";
import Footer from "../../Components/Home/Footer";
import MatchFilterSidebar from "../../Components/SkillMatch/MatchFilterSidebar";
import SkillMatchStats from "../../Components/SkillMatch/SkillMatchStats";
import JobCandidateMatchPanel from "../../Components/ManageJob/JobCandidateMatchPanel";

const SkillMatch = () => {
  const { user, loading, token } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getUserRole = (currentUser) => {
    const rawRole = currentUser?.role || currentUser?.Role || "";
    const normalized = Array.isArray(rawRole) ? rawRole[0] : rawRole;
    return (normalized || "").toLowerCase();
  };

  // Redirect if not recruiter
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else {
        const roleStr = getUserRole(user);
        if (roleStr !== "recruiter") {
          navigate("/user-home");
        }
      }
    }
  }, [user, loading, navigate]);

  // Fetch match data
  useEffect(() => {
    const fetchShortlist = async () => {
      if (!token) return;
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/ShortListApplication", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setMatchData(result.data);
        }
      } catch (error) {
        console.error("Error fetching shortlist:", error);
      } finally {
        setIsFetching(false);
      }
    };

    if (user && getUserRole(user) === "recruiter") {
      fetchShortlist();
    }
  }, [token, user]);

  if (loading || isFetching) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const roleStr = getUserRole(user);
  if (!user || roleStr !== "recruiter") return null;

  const joinMeeting = (meetingLink) => {
    const roomCode = meetingLink.split('/').pop();
    navigate(`/meet/${roomCode}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-inter">
      {/* Top Navbar */}
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Header Section */}
      <div className="bg-white border-b border-slate-100 sticky mt-12 z-30 shadow-sm">
        <main className="max-w-[1440px] mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Sticky Sidebar */}
            <div className="w-full lg:w-80 shrink-0">
              <MatchFilterSidebar />
            </div>

            {/* Center: Main Content */}
            <div className="flex-1 min-w-0">
              {/* Stats Summary */}
              <SkillMatchStats totalJobs={matchData.length} />

              {/* Match Panel with real data */}
              <JobCandidateMatchPanel matchData={matchData} onJoinMeeting={joinMeeting} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SkillMatch;
