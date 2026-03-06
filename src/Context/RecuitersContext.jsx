import React, { createContext, useRef, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const RecuitersContext = createContext();

export const RecuitersProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchedRef = useRef(false);
  const fetchingRef = useRef(false);

  const fetchCompanies = async () => {
    if (!token) return;
    if (fetchedRef.current) return;
    if (fetchingRef.current) return;

    fetchingRef.current = true;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-admin/ertqyuiok/get-all-recruiters', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success && data.data) {
        const mappedCompanies = data.data.map(recruiter => {
          const profile = recruiter.companyProfile || {};
          const sanitizeUrl = (u) => String(u || '').replace(/`/g, '').trim();
          const website = sanitizeUrl(profile.companyWebsite || profile?.socialLinks?.website);
          const socialLinks = {
            website,
            linkedIn: sanitizeUrl(profile?.socialLinks?.linkedIn),
            twitter: sanitizeUrl(profile?.socialLinks?.twitter),
            facebook: sanitizeUrl(profile?.socialLinks?.facebook),
            instagram: sanitizeUrl(profile?.socialLinks?.instagram),
            youtube: sanitizeUrl(profile?.socialLinks?.youtube),
          };
          return {
            id: recruiter._id,
            name: profile.companyName || recruiter.Fullname || 'Unknown Company',
            industry: profile.industry || 'Technology',
            location: profile.companyLocation || 'Remote',
            size: profile.companySize || '',
            website,
            socialLinks,
            description: profile.companyDescription || '',
            designation: profile.designation || '',
            recruiterName: recruiter.Fullname || '',
            recruiterEmail: recruiter.email || '',
            recruiterPhone: recruiter.number || '',
            rating: 4.5,
            reviewsCount: Math.floor(Math.random() * (500 - 50 + 1) + 50),
            openPositions: Math.floor(Math.random() * (20 - 1 + 1) + 1),
            logo: profile.companyLogo || ''
          };
        });
        setCompanies(mappedCompanies);
        fetchedRef.current = true;
        setError(null);
      } else {
        setError(data?.message || 'Failed to fetch recruiters');
      }
    } catch (err) {
      console.error('Error fetching recruiters:', err);
      setError(err.message);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <RecuitersContext.Provider value={{ companies, loading, error, fetchCompanies }}>
      {children}
    </RecuitersContext.Provider>
  );
};
