import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterProfileHeader from '../../Components/RecuiterProfile/RecruiterProfileHeader';
import RecruiterQuickLinks from '../../Components/RecuiterProfile/RecruiterQuickLinks';
import RecruiterProfileSections from '../../Components/RecuiterProfile/RecruiterProfileSections';
import { toast } from 'sonner';

const RecruiterProfile = () => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    fullName: '',
    designation: '',
    personalEmail: '',
    mobile: '',
    about: '',
    linkedin: '',
    companyWebsite: '',
    companyLocation: '',
    companySize: '',
    companyLogo: '',
    profilePic: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: ''
  });

  // Create a flattened user object for display components
  const displayUser = user ? {
    ...user,
    ...(user.companyProfile || {}), // Merge companyProfile fields to top level
    // Ensure specific fields are mapped correctly if names differ
    companyName: user.companyProfile?.companyName || user.companyName || '',
    industry: user.companyProfile?.industry || user.industry || '',
    designation: user.companyProfile?.designation || user.designation || '',
    companyLocation: user.companyProfile?.companyLocation || user.companyLocation || '',
    companyWebsite: user.companyProfile?.companyWebsite || user.companyWebsite || '',
    about: user.companyProfile?.companyDescription || user.about || '',
    companySize: user.companyProfile?.companySize || user.companySize || '',
    companyLogo: user.companyProfile?.companyLogo || user.companyLogo || '',
    // Personal fields
    Fullname: user.Fullname || user.fullName || '',
    email: user.email || '',
    mobile: user.number || user.mobile || user.phone || '',
    profilePic: user.profilePic || '',
    // Social Links
    linkedin: user.socialLinks?.linkedIn || user.linkedin || '',
    twitter: user.socialLinks?.twitter || '',
    facebook: user.socialLinks?.facebook || '',
    instagram: user.socialLinks?.instagram || '',
    youtube: user.socialLinks?.youtube || ''
  } : null;

  useEffect(() => {
    if (displayUser) {
      setFormData({
        companyName: displayUser.companyName,
        industry: displayUser.industry,
        fullName: displayUser.Fullname,
        designation: displayUser.designation,
        personalEmail: displayUser.email,
        mobile: displayUser.mobile,
        about: displayUser.about,
        linkedin: displayUser.linkedin || '',
        companyWebsite: displayUser.companyWebsite,
        companyLocation: displayUser.companyLocation,
        companySize: displayUser.companySize,
        companyLogo: displayUser.companyLogo,
        profilePic: displayUser.profilePic,
        twitter: displayUser.twitter,
        facebook: displayUser.facebook,
        instagram: displayUser.instagram,
        youtube: displayUser.youtube
      });
    }
  }, [user]); // Depend on user, but use displayUser calculated from it

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const payload = {
        Fullname: formData.fullName,
        number: formData.mobile,
        email: formData.personalEmail,
        profilePic: formData.profilePic,
        companyName: formData.companyName,
        designation: formData.designation,
        industry: formData.industry,
        companySize: formData.companySize,
        companyWebsite: formData.companyWebsite,
        companyLocation: formData.companyLocation,
        companyDescription: formData.about,
        companyLogo: formData.companyLogo,
        socialLinks: {
          linkedIn: formData.linkedin,
          website: formData.companyWebsite,
          twitter: formData.twitter,
          facebook: formData.facebook,
          instagram: formData.instagram,
          youtube: formData.youtube
        }
      };

      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Profile updated successfully');
        // Optionally trigger a user refresh here if AuthContext supports it
        // fetchProfile(); 
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <RecruiterNavbar onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          {/* Header */}
          <RecruiterProfileHeader user={displayUser} completion={75} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar - Quick Links */}
            <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
              <RecruiterQuickLinks user={displayUser} />
            </div>

            {/* Main Content - Sections */}
            <div className="lg:col-span-9 space-y-6">
              <RecruiterProfileSections 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  onSave={handleUpdateProfile}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterProfile;
