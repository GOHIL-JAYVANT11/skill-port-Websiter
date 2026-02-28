import React from 'react';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import NotificationListing from '../../Components/Notification/NotificationListing';
import UserSidebar from '../../Components/UserHomePage/UserSidebar';
import Footer from '../../Components/Home/Footer';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Reusing Dashboard Sidebar */}
          <aside className="hidden lg:block lg:w-[280px] shrink-0">
            <UserSidebar isOpen={false} />
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-transparent max-w-4xl mx-auto">
              <NotificationListing />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;
