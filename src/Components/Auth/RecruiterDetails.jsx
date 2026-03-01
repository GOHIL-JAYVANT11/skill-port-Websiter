import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown, Building2, Globe, MapPin, Layout, FileText, Camera, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { designationOptions, companySizeOptions, industryOptions } from '../../assets/Dropdown_sugeetions';
import { AuthContext } from '../../Context/AuthContext';

export const RecruiterDetails = ({ onComplete, authToken, userId }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    companyName: '',
    designation: '',
    industry: '',
    companySize: '',
    companyWebsite: '',
    companyLocation: '',
    companyDescription: '',
    companyLogo: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File too large', { description: 'Logo size should be less than 2MB' });
        return;
      }
      setFormData(prev => ({ ...prev, companyLogo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Build JSON payload (matching provided curl body)
    const payload = {
      companyName: formData.companyName,
      designation: formData.designation,
      industry: formData.industry,
      companySize: formData.companySize,
      companyWebsite: formData.companyWebsite,
      companyLocation: formData.companyLocation,
      companyDescription: formData.companyDescription,
    };

    try {
      const url = `http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/add-recruiter-details`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('Recruiter Details Saved', {
          description: 'Your company profile has been created successfully.'
        });

        // Update user context
        updateUser({
          _id: userId,
          role: 'recruiter'
        });

        if (onComplete) onComplete();
        navigate('/HomePage'); 
      } else {
        const errorData = await response.json();
        toast.error('Failed to save details', {
          description: errorData.message || 'Please check your inputs and try again.'
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Network Error', {
        description: 'Unable to connect to the server. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Details</h2>
        <p className="text-gray-500">Complete your profile to start hiring top talent</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-400">
              {logoPreview ? (
                <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-xs text-gray-500 font-medium">Add Logo</span>
                </div>
              )}
              <input
                type="file"
                name="companyLogo"
                onChange={handleLogoChange}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {logoPreview && (
              <button
                type="button"
                onClick={() => { setFormData(prev => ({ ...prev, companyLogo: null })); setLogoPreview(null); }}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <Check size={14} className="rotate-45" />
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-400">PNG, JPG or SVG (Max 2MB)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Building2 size={16} className="text-emerald-500" />
              Company Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              placeholder="e.g. Acme Inc"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
            />
          </div>

          {/* Designation */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Layout size={16} className="text-emerald-500" />
              Your Designation<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 appearance-none"
              >
                <option value="">Select Designation</option>
                {designationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText size={16} className="text-emerald-500" />
              Industry<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 appearance-none"
              >
                <option value="">Select Industry</option>
                {industryOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Layout size={16} className="text-emerald-500" />
              Company Size<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 appearance-none"
              >
                <option value="">Select Size</option>
                {companySizeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Globe size={16} className="text-emerald-500" />
              Company Website
            </label>
            <input
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MapPin size={16} className="text-emerald-500" />
              Company Location<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleInputChange}
              required
              placeholder="e.g. New York, USA"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileText size={16} className="text-emerald-500" />
            Company Description<span className="text-red-500">*</span>
          </label>
          <textarea
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="Tell us about your company..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>Complete Registration <ArrowRight size={20} /></>
          )}
        </button>
      </form>
    </div>
  );
};
