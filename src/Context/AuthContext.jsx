import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Check if user is logged in (from cookies)
  useEffect(() => {
    const savedToken = getCookie('token');
    const savedUserId = getCookie('userId');
    const savedName = getCookie('name');
    const savedNumber = getCookie('number');
    const savedRole = getCookie('role') || 'seeker';
    
    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUser({
        _id: savedUserId,
        Fullname: savedName || 'User',
        number: savedNumber || '',
        role: savedRole
      });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/login', {
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
      const response = await fetch('http://localhost:4518/auth/google/callback', {
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

  // Register function
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Registration failed');
      }

      const data = await response.json();
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
    register,
    logout,
    updateUser,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
