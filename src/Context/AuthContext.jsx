import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isInitialized = useRef(false);
  const fetchingRef = useRef(false);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const setCookie = (name, value, days = 1) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const fetchProfile = useCallback(async (authToken) => {
    const currentToken = authToken || token || getCookie('token');
    if (!currentToken) {
      setLoading(false);
      return;
    }

    // Prevent concurrent calls
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/get-profile', {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Merge user and education data if it exists in data.data
        if (data.data?.user) {
          const rawUser = data.data.user;
          const rawData = data.data;

          // Helper to pick the best data source (prefer non-empty sibling over nested)
          const pickBest = (sibling, nested) => {
            if (Array.isArray(sibling) && sibling.length > 0) return sibling;
            if (Array.isArray(nested) && nested.length > 0) return nested;
            return sibling || nested || [];
          };

          const education = pickBest(
            rawData.education || rawData.Education,
            rawUser.education || rawUser.Education
          );
          
          const projects = pickBest(
            rawData.projects || rawData.Projects,
            rawUser.projects || rawUser.Projects
          );
          
          const SocialLinks = pickBest(
            rawData.SocialLinks || rawData.socialLinks,
            rawUser.SocialLinks || rawUser.socialLinks
          );

          const certification = pickBest(
            rawData.certifications || rawData.Certification || rawData.certification,
            rawUser.certifications || rawUser.Certification || rawUser.certification
          );

          setUser({
            ...rawUser,
            education,
            projects,
            SocialLinks,
            certifications: certification
          });
        } else {
          setUser(data.data || data.user || data);
        }
      } else {
        // If token is invalid and we were trying to refresh, logout
        if (!authToken) logout();
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [token]);

  // Check if user is logged in (from cookies)
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const savedToken = getCookie('token');
    const savedUserId = getCookie('userId');
    
    if (savedToken && savedUserId) {
      setToken(savedToken);
      fetchProfile(savedToken);
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4518/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Login failed');
      }

      const data = await response.json();
      const userObj = data.user || {
        _id: data.userId,
        Fullname: data.name || 'User',
        number: data.number || '',
        role: data.role || 'seeker'
      };
      
      setToken(data.token);
      setUser(userObj);
      
      // Save to cookies for persistence
      if (data.token) setCookie('token', data.token);
      if (userObj._id) setCookie('userId', userObj._id);
      if (userObj.Fullname) setCookie('name', userObj.Fullname);
      if (userObj.number) setCookie('number', userObj.number);
      if (userObj.role) setCookie('role', userObj.role);
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Google Login function
  const googleLogin = useCallback(async (credential) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4518/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credential })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Google Login failed');
      }

      const data = await response.json();
      const userObj = data.user || {
        _id: data.userId,
        Fullname: data.name || 'User',
        number: data.number || '',
        role: data.role || 'seeker'
      };
      
      setToken(data.token);
      setUser(userObj);
      
      // Save to cookies for persistence
      if (data.token) setCookie('token', data.token);
      if (userObj._id) setCookie('userId', userObj._id);
      if (userObj.Fullname) setCookie('name', userObj.Fullname);
      if (userObj.number) setCookie('number', userObj.number);
      if (userObj.role) setCookie('role', userObj.role);
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    deleteCookie('token');
    deleteCookie('userId');
    deleteCookie('name');
    deleteCookie('number');
    deleteCookie('role');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }, []);

  // Update user
  const updateUser = useCallback((userData) => {
    setUser(userData);
    if (userData.Fullname) setCookie('name', userData.Fullname);
    if (userData.number) setCookie('number', userData.number);
    if (userData.role) setCookie('role', userData.role);
    if (userData._id) setCookie('userId', userData._id);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    googleLogin,
    logout,
    updateUser,
    fetchProfile,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
