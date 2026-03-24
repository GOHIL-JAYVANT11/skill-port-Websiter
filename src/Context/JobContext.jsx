import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applicationsError, setApplicationsError] = useState(null);
  const { token, user } = useContext(AuthContext);

  const fetchData = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const jobsResponse = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/get-All-Job', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const jobsData = await jobsResponse.json();
      
      if (jobsResponse.ok && jobsData.success && Array.isArray(jobsData.data)) {
        const mappedJobs = jobsData.data.map(job => {
          const rawSkills = Array.isArray(job.MandatorySkills) ? job.MandatorySkills : (Array.isArray(job.skills) ? job.skills : []);
          const skills = rawSkills
            .flatMap(s => String(s || '').split('|'))
            .map(s => s.trim())
            .filter(Boolean);

          const rawBenefits = Array.isArray(job.Benefits) ? job.Benefits : (Array.isArray(job.benefits) ? job.benefits : []);
          const benefits = rawBenefits
            .flatMap(b => String(b || '').split('|'))
            .map(b => b.trim())
            .filter(Boolean);

          const salaryMin = Number(job?.Salary?.minSalary);
          const salaryMax = Number(job?.Salary?.maxSalary);
          const hasSalaryRange = Number.isFinite(salaryMin) && Number.isFinite(salaryMax);
          const salaryType = job.SalaryType || '';

          const salaryText = salaryType === 'Negotiable'
            ? 'Negotiable'
            : (hasSalaryRange ? `₹${salaryMin} - ₹${salaryMax}` : 'Not disclosed');

          const experienceText = typeof job.Experience === 'string'
            ? job.Experience
            : (job.minExperience ? `${job.minExperience}-${job.maxExperience}` : '0-1 Yrs');

          const country = job.Country || job.country || '';
          const state = job.State || job.state || '';
          const city = job.City || job.city || '';
          const locationText = job.location || [city, state, country].filter(Boolean).join(', ') || 'Remote';

          return {
            id: job._id,
            title: job.jobtitle || job.title || job.jobTitle,
            companyName: job.companyName || job.company || 'Unknown Company',
            companyLogo: job.companyLogo || '',
            companyRating: '',
            location: locationText,
            salary: salaryText,
            salaryType,
            salaryMin: hasSalaryRange ? salaryMin : null,
            salaryMax: hasSalaryRange ? salaryMax : null,
            experience: experienceText,
            postedTime: new Date(job.createdAt).toLocaleDateString(),
            skills,
            description: job.JobDescription || job.description || job.Description || '',
            employmentType: job.EmploymentType || job.jobType || '',
            workMode: job.WorkMode || '',
            department: job.Department || '',
            industry: job.Industry || '',
            openings: job.Openings ?? null,
            deadline: job.Deadline || '',
            qualification: job.Qualification || '',
            degreeRequired: job.DegreeRequired || '',
            interviewMode: job.InterviewMode || '',
            benefits,
            matchPercentage: 95,
            companyAbout: '',
            recId: job.recId?._id || job.recId || '',
            isNew: new Date(job.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          };
        });
        setJobs(mappedJobs);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobApplications = async () => {
    if (!token || !user?._id) return;

    setApplicationsLoading(true);
    try {
      // Trying common recruiter endpoints if get-job-applications fails
      const response = await fetch(`http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-recruiter-jobs?userId=${user._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON from response:', text.substring(0, 100));
        throw new Error('Invalid JSON response from server');
      }

      if (response.ok && data.success) {
        setApplications(data.data || []);
      } else {
        setApplicationsError(data.message || 'Failed to fetch applications');
      }
    } catch (err) {
      console.error('Error fetching job applications:', err);
      setApplicationsError(err.message);
    } finally {
      setApplicationsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (user && (user.role === 'Recruiter' || user.Role === 'Recruiter' || (Array.isArray(user.role) && user.role[0] === 'Recruiter'))) {
      fetchJobApplications();
    }
  }, [token, user]);

  return (
    <JobContext.Provider value={{ 
      jobs, 
      loading, 
      error, 
      fetchJobs: fetchData,
      applications,
      applicationsLoading,
      applicationsError,
      fetchJobApplications
    }}>
      {children}
    </JobContext.Provider>
  );
};
