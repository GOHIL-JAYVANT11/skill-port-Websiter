import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import UserLayout from '../../Components/Layout/UserLayout';
import ProfileCompletionCard from '../../Components/UserHomePage/ProfileCompletionCard';
import RecommendedJobs from '../../Components/UserHomePage/RecommendedJobs';
import RecentJobs from '../../Components/UserHomePage/RecentJobs';
import TopCompanies from '../../Components/UserHomePage/TopCompanies';
import ResumeBuilderPromo from '../../Components/UserHomePage/ResumeBuilderPromo';
import LocationCard from '../../Components/UserHomePage/LocationCard';
import RightPanel from '../../Components/UserHomePage/RightPanel';

const UserHomePage = () => {
  const { user, loading, fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMounted = useRef(false);

  useEffect(() => {
    // Always fetch profile on mount to ensure we have full/fresh data
    if (!isMounted.current) {
      fetchProfile();
      isMounted.current = true;
    }
  }, [fetchProfile]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else {
        const role = user.role || user.Role || '';
        const roleStr = typeof role === 'string' ? role.toLowerCase() : (Array.isArray(role) && role.length > 0 ? role[0].toLowerCase() : '');
        if (roleStr === 'recruiter') {
          navigate('/recruiter-home');
        }
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <UserLayout>
      <div className="max-w-[1200px] mx-auto flex flex-col xl:flex-row gap-6 lg:gap-8">
        {/* Central Content */}
        <div className="flex-1 space-y-6 md:space-y-8 pb-10 min-w-0">
          {/* Profile Completion Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProfileCompletionCard />
          </section>

          {/* Recommended Jobs Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <RecommendedJobs />
          </section>

          {/* Recent Jobs Section */}
          {/* <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <RecentJobs />
          </section> */}

          {/* Resume Builder Promotion Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <ResumeBuilderPromo />
          </section>

          {/* Top Companies Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
            <TopCompanies />
          </section>

          {/* Location Personalization Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
            <LocationCard />
          </section>
        </div>

        {/* Right Utility Panel */}
        <div className="hidden xl:block">
          <RightPanel />
        </div>
      </div>
    </UserLayout>
  );
};

export default UserHomePage;
