import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import JobPostForm from '../../Components/JobPost/JobPostForm';
import JobPostPreview from '../../Components/JobPost/JobPostPreview';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const JobPost = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialFormState = {
    jobTitle: '',
    employmentType: 'Full-Time',
    workMode: 'On-site',
    department: '',
    industry: '',
    openings: 1,
    deadline: '',
    country: '',
    state: '',
    city: '',
    officeAddress: '',
    minSalary: '',
    maxSalary: '',
    salaryType: 'Fixed',
    isPaid: 'Paid',
    stipendAmount: '',
    minExperience: 0,
    maxExperience: 1,
    experienceLevel: 'Entry Level',
    requiredSkills: [],
    niceToHaveSkills: [],
    education: {
      qualification: '',
      degreeRequired: 'No'
    },
    jobDescription: '',
    benefits: [],
    settings: {
      autoShortlist: 'No',
      minSkillMatch: 75,
      allowDM: 'Yes',
      autoClose: 'No'
    },
    interview: {
      mode: 'Online',
      autoSchedule: 'No',
      platform: 'Google Meet'
    },
    commissionAgreed: false
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.commissionAgreed) {
      toast.error('Please agree to the commission agreement to post the job.');
      return;
    }

    // Get token from cookie
    const getToken = () => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const token = getToken();
    if (!token) {
      toast.error('You must be logged in to post a job.');
      return;
    }

    // Map form data to API payload structure
    const payload = {
      jobtitle: formData.jobTitle,
      EmploymentType: formData.employmentType,
      WorkMode: formData.workMode,
      Department: formData.department,
      Industry: formData.industry,
      Openings: parseInt(formData.openings),
      Deadline: formData.deadline,
      Country: formData.country,
      State: formData.state,
      City: formData.city,
      OfficeAddress: formData.workMode === 'Remote' ? '' : formData.officeAddress,
      MinSalary: formData.employmentType === 'Internship' ? (formData.isPaid === 'Paid' ? parseInt(formData.stipendAmount) : 0) : parseInt(formData.minSalary),
      MaxSalary: formData.employmentType === 'Internship' ? (formData.isPaid === 'Paid' ? parseInt(formData.stipendAmount) : 0) : parseInt(formData.maxSalary),
      SalaryType: formData.employmentType === 'Internship' ? (formData.isPaid === 'Paid' ? 'Stipend' : 'Unpaid') : formData.salaryType,
      Experience: `${formData.minExperience}-${formData.maxExperience} years`,
      MandatorySkills: formData.requiredSkills.map(skill => skill.name),
      Qualification: formData.education.qualification,
      DegreeRequired: formData.education.degreeRequired === 'Yes' ? 'Computer Science' : 'Any', 
      JobDescription: formData.jobDescription,
      Benefits: formData.benefits,
      InterviewMode: formData.interview.mode
    };

    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/post-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Job Posted Successfully!', {
          description: 'Your job listing is now live and matching with candidates.',
        });
        // Reset form data to initial state
        setFormData(initialFormState);
      } else {
        toast.error(data.message || 'Failed to post job. Please try again.');
        console.error('Job post error:', data);
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('An error occurred while posting the job.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      <Toaster position="top-right" expand={true} richColors />
      
      {/* Top Navbar */}
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <RecruiterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6">
          <div className="max-w-[1200px] mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Post a New Job</h1>
              <p className="text-slate-500 mt-1">Create a skill-based job listing to find the best talent.</p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Side: Form Sections */}
              <div className="w-full lg:w-[65%] space-y-6">
                <JobPostForm formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />
                
                {/* Mobile/Tablet Submit Button (Sticky) */}
                <div className="lg:hidden sticky bottom-4 left-0 right-0 z-10 bg-white p-4 rounded-2xl shadow-lg border border-slate-100">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Post Job Listing
                  </button>
                </div>
              </div>

              {/* Right Side: Live Preview (Sticky) */}
              <div className="w-full lg:w-[35%] lg:sticky lg:top-24">
                <JobPostPreview formData={formData} />
                
                {/* Desktop Submit Button */}
                <button
                  type="submit"
                  className="hidden lg:block w-full mt-6 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Post Job Listing
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobPost;