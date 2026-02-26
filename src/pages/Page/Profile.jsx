import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import JobsHeader from '../../Components/Jobs/JobsHeader';
import Footer from '../../Components/Home/Footer';
import ProfileHeader from '../../Components/Profile/ProfileHeader';
import QuickLinks from '../../Components/Profile/QuickLinks';
import ProfileSections from '../../Components/Profile/ProfileSections';

const Profile = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JobsHeader onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          {/* Top Profile Header */}
          <ProfileHeader user={user} completion={68} />

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Sidebar - Quick Links */}
            <aside className="hidden lg:block lg:w-[280px] shrink-0">
              <QuickLinks />
            </aside>

            {/* Main Profile Sections */}
            <div className="flex-1 w-full">
              <ProfileSections user={user} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
