 import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import Footer from '../../Components/Home/Footer';
import ProfileHeader from '../../Components/Profile/ProfileHeader';
import QuickLinks from '../../Components/Profile/QuickLinks';
import ProfileSections from '../../Components/Profile/ProfileSections';
import { toast } from 'sonner';
import EditProfileModal from '../../Components/Profile/EditProfileModal';

const Profile = () => {
  const { user, fetchProfile, token } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Always fetch profile on mount to ensure we have full data (education, etc.)
    if (!isMounted.current) {
      fetchProfile();
      isMounted.current = true;
    }
  }, [fetchProfile]);

  const handleUpdateProfile = async (formData) => {
    try {
      const response = await fetch('http://localhost:4518/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Profile updated successfully');
        await fetchProfile();
        setIsEditModalOpen(false);
        return true;
      } else {
        // Handle potential non-JSON responses (like 413 Payload Too Large)
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          toast.error(data.message || 'Failed to update profile');
        } else {
          if (response.status === 413) {
            toast.error('File too large', {
              description: 'The server rejected the upload because the file is too large. Please ensure your backend supports large payloads.'
            });
          } else {
            toast.error(`Error: ${response.statusText || 'Update failed'}`);
          }
        }
        return false;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Network error. Please try again.');
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          {/* Top Profile Header */}
          <ProfileHeader 
            user={user} 
            completion={68} 
            onEditClick={() => setIsEditModalOpen(true)} 
          />

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Sidebar - Quick Links */}
            <aside className="hidden lg:block lg:w-[280px] shrink-0 sticky top-24 self-start">
              <QuickLinks />
            </aside>

            {/* Main Profile Sections */}
            <div className="flex-1 w-full">
              <ProfileSections user={user} onUpdateProfile={handleUpdateProfile} />
            </div>
          </div>
        </div>
      </main>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleUpdateProfile}
      />

      <Footer />
    </div>
  );
};

export default Profile;
