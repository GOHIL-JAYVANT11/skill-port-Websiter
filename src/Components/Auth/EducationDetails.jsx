import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown, X, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { doctorateOptions, mastersOptions, mastersCommonOptions, graduationOptions, graduationCommonOptions, educationBoardOptions, educationBoardCommonOptions, mediumOptions, percentageOptions } from '../../assets/Dropdown_sugeetions';
import { AuthContext } from '../../Context/AuthContext';

export const EducationDetails = ({ onComplete, authToken, userId }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    highestQualification: '',
    course: '',
    courseType: '',
    specialization: '',
    universityInstitute: '',
    startingYear: '',
    passingYear: '',
    gradingSystem: '',
    cgpa: '',
    cgpaOutOf: '10', // Default based on screenshot
    keySkills: '',
    isCurrentlyPursuing: false,
    medium: '',
    percentage: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showOtherDoctorateInput, setShowOtherDoctorateInput] = useState(false);
  const [showOtherMastersInput, setShowOtherMastersInput] = useState(false);
  const [showOtherGraduateInput, setShowOtherGraduateInput] = useState(false);
  const [showOtherBoardInput, setShowOtherBoardInput] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  const qualifications = [
    "Doctorate/PhD",
    "Masters/Post-Graduation",
    "Graduation/Diploma",
    "12th",
    "10th",
    "Below 10th"
  ];

  const courseTypes = ["Full Time", "Part Time", "Distance Learning"];
  const gradingSystems = ["Scale 10 Grading System", "Scale 4 Grading System", "% Marks of 100 Maximum"];

  // Generate years
  const currentYear = new Date().getFullYear();
  const startingYears = Array.from({ length: 50 }, (_, i) => (currentYear - 1) - i);
  const passingYears = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const filteredPassingYears = formData.startingYear
    ? passingYears.filter(year => year >= parseInt(formData.startingYear, 10))
    : passingYears;

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateCourseSuggestions = (value, forceShowAll = false) => {
    let options = [];
    if (formData.highestQualification === "Doctorate/PhD") {
      options = doctorateOptions;
    } else if (formData.highestQualification === "Masters/Post-Graduation") {
      options = mastersOptions;
    } else if (formData.highestQualification === "Graduation/Diploma") {
      options = graduationOptions;
    } else if (["12th", "10th"].includes(formData.highestQualification)) {
      options = educationBoardOptions;
    }

    if (options.length > 0) {
      if (value && !forceShowAll) {
        const filtered = options.filter(opt =>
          opt.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
      } else {
        setSuggestions(options);
      }
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "startingYear") {
      setFormData(prev => {
        const updated = { ...prev, startingYear: value };
        if (prev.passingYear && parseInt(prev.passingYear, 10) < parseInt(value, 10)) {
          updated.passingYear = "";
        }
        return updated;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (name === "course") {
      updateCourseSuggestions(value);
    }
  };

  const handleQualificationSelect = (qual) => {
    setFormData(prev => ({
      ...prev,
      highestQualification: qual,
      course: '',
      courseType: '',
      specialization: '',
      universityInstitute: '',
      startingYear: '',
      passingYear: '',
      gradingSystem: '',
      cgpa: '',
      medium: '',
      percentage: ''
    }));
    setShowOtherDoctorateInput(false);
    setShowOtherMastersInput(false);
    setShowOtherGraduateInput(false);
    setShowOtherBoardInput(false);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleCourseOptionSelect = (option) => {
    setShowSuggestions(false);

    if (option === "Other Doctorate") {
      setShowOtherDoctorateInput(true);
      setShowOtherMastersInput(false);
      setShowOtherGraduateInput(false);
      setShowOtherBoardInput(false);
      setFormData(prev => ({ ...prev, course: '' }));
    } else if (option === "Other Post Graduate") {
      setShowOtherMastersInput(true);
      setShowOtherDoctorateInput(false);
      setShowOtherGraduateInput(false);
      setShowOtherBoardInput(false);
      setFormData(prev => ({ ...prev, course: '' }));
    } else if (option === "Other Graduate") {
      setShowOtherGraduateInput(true);
      setShowOtherDoctorateInput(false);
      setShowOtherMastersInput(false);
      setShowOtherBoardInput(false);
      setFormData(prev => ({ ...prev, course: '' }));
    } else if (option === "Other" && ["12th", "10th"].includes(formData.highestQualification)) {
      setShowOtherBoardInput(true);
      setShowOtherDoctorateInput(false);
      setShowOtherMastersInput(false);
      setShowOtherGraduateInput(false);
      setFormData(prev => ({ ...prev, course: '' }));
    } else {
      setShowOtherDoctorateInput(false);
      setShowOtherMastersInput(false);
      setShowOtherGraduateInput(false);
      setShowOtherBoardInput(false);
      setFormData(prev => ({ ...prev, course: option }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Transform keySkills from string to array if needed, or keep as is based on backend expectation
    // The curl example shows an array: ["JavaScript", "React", "Node.js"]
    const skillsArray = formData.keySkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '');

    let payload = {
      highestQualification: formData.highestQualification,
      course: formData.course?.trim(), // Education board is saved here as 'course'
      keySkills: skillsArray,
      isPrimary: true,
      passingYear: parseInt(formData.passingYear) || null,
    };

    if (["12th", "10th"].includes(formData.highestQualification)) {
      payload = {
        ...payload,
        medium: formData.medium?.trim(), // Medium is saved as 'medium'
        percentage: formData.percentage?.trim(), // Percentage of marks is saved as 'percentage'
      };
    } else if (formData.highestQualification === "Below 10th") {
        // No additional fields for Below 10th
    } else {
      payload = {
        ...payload,
        courseType: formData.courseType,
        specialization: formData.specialization,
        universityInstitute: formData.universityInstitute,
        startingYear: parseInt(formData.startingYear) || null,
        gradingSystem: formData.gradingSystem,
        cgpa: parseFloat(formData.cgpa) || null,
        cgpaOutOf: parseFloat(formData.cgpaOutOf) || null,
      };
    }

    try {
      // Using the user ID provided in props or fallback to the one in the prompt if missing (for testing)
      //   const targetUserId = userId || 'ertqyuiok'; 
      const url = `http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/add-education`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || '<YOUR_AUTH_TOKEN>'}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('Education Details Saved', {
          description: 'Your profile has been updated successfully.'
        });
        // Update context and redirect to /userhomepage
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };

        const currentUserId = userId || getCookie('userId');
        const currentName = getCookie('name');
        const currentNumber = getCookie('number');

        updateUser({
          _id: currentUserId,
          Fullname: currentName || 'User',
          number: currentNumber || '',
          role: 'seeker'
        });

        if (onComplete) onComplete();
        navigate('/userhomepage');
      } else {
        const data = await response.json();
        toast.error('Failed to save details', {
          description: data.message || 'Please check your inputs and try again.'
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education details</h2>
        <p className="text-gray-500">These details help recruiters identify your background</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Highest Qualification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Highest qualification/Degree currently pursuing<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {qualifications.map((qual) => (
              <button
                key={qual}
                type="button"
                onClick={() => handleQualificationSelect(qual)}
                className={`px-4 py-2 rounded-full border transition-all ${formData.highestQualification === qual
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
                  }`}
              >
                {qual}
              </button>
            ))}
          </div>
        </div>

        {/* Show other fields only if qualification is selected */}
        {formData.highestQualification && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">

            {/* Course / Education Board Input with Suggestions */}
            {formData.highestQualification !== "Below 10th" && (
            <div ref={suggestionsRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {["12th", "10th"].includes(formData.highestQualification) ? "Education board" : "Course"}<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="course"
                value={showOtherDoctorateInput ? "Other Doctorate" : showOtherMastersInput ? "Other Post Graduate" : showOtherGraduateInput ? "Other Graduate" : showOtherBoardInput ? "Other" : formData.course}
                onChange={handleInputChange}
                onFocus={(e) => updateCourseSuggestions(e.target.value, true)}
                className={`block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all ${(showOtherDoctorateInput || showOtherMastersInput || showOtherGraduateInput || showOtherBoardInput) ? "bg-gray-100" : "bg-white"
                  }`}
                placeholder={
                  formData.highestQualification === "Doctorate/PhD" ? "Select Doctorate" :
                    formData.highestQualification === "Masters/Post-Graduation" ? "Select Post Graduate" :
                      formData.highestQualification === "Graduation/Diploma" ? "Select Graduation" :
                        ["12th", "10th"].includes(formData.highestQualification) ? "Select Board" : "e.g. B.Tech"
                }
                required
                autoComplete="off"
              />

              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white mt-1 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleCourseOptionSelect(option)}
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Doctorate Options Buttons */}
              {formData.highestQualification === "Doctorate/PhD" && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {doctorateOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleCourseOptionSelect(option)}
                      className={`px-4 py-2 rounded-full border transition-all ${(option === "Other Doctorate" ? showOtherDoctorateInput : formData.course === option)
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                          : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Masters Common Options Buttons */}
              {formData.highestQualification === "Masters/Post-Graduation" && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">Suggestions</p>
                  <div className="flex flex-wrap gap-3">
                    {mastersCommonOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleCourseOptionSelect(option)}
                        className={`px-4 py-2 rounded-full border transition-all ${formData.course === option
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Graduation Common Options Buttons */}
              {formData.highestQualification === "Graduation/Diploma" && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">Suggestions</p>
                  <div className="flex flex-wrap gap-3">
                    {graduationCommonOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleCourseOptionSelect(option)}
                        className={`px-4 py-2 rounded-full border transition-all ${formData.course === option
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 12th/10th Common Options Buttons */}
              {["12th", "10th"].includes(formData.highestQualification) && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">Suggestions</p>
                  <div className="flex flex-wrap gap-3">
                    {educationBoardCommonOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleCourseOptionSelect(option)}
                        className={`px-4 py-2 rounded-full border transition-all ${formData.course === option
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Doctorate Input */}
              {showOtherDoctorateInput && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                    placeholder="Enter your Doctorate course name"
                    required
                  />
                </div>
              )}

              {/* Other Masters Input */}
              {showOtherMastersInput && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                    placeholder="Enter your Post Graduate course name"
                    required
                  />
                </div>
              )}

              {/* Other Graduate Input */}
              {showOtherGraduateInput && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                    placeholder="Enter your Graduation course name"
                    required
                  />
                </div>
              )}

              {/* Other Board Input */}
              {showOtherBoardInput && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education board Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                    placeholder="Enter your Education board name"
                    required
                  />
                </div>
              )}
            </div>
            )}

            {/* Standard Fields (Hidden for 12th, 10th, Below 10th) */}
            {!["12th", "10th", "Below 10th"].includes(formData.highestQualification) && (
              <>
                {/* Course Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Course type<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {courseTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, courseType: type })}
                        className={`px-4 py-2 rounded-full border transition-all ${formData.courseType === type
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                    placeholder="e.g. Computer Science"
                    required
                  />
                </div>

                {/* University/Institute */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University / Institute<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="universityInstitute"
                    value={formData.universityInstitute}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                    placeholder="e.g. Tech University"
                    required
                  />
                </div>

                {/* Years */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting year<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="startingYear"
                        value={formData.startingYear}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white appearance-none"
                        required
                      >
                        <option value="">Select</option>
                        {startingYears.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passing year<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="passingYear"
                        value={formData.passingYear}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white appearance-none"
                        required
                      >
                        <option value="">Select</option>
                        {filteredPassingYears.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                {/* Grading System */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grading System<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="gradingSystem"
                      value={formData.gradingSystem}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white appearance-none"
                      required
                    >
                      <option value="">Select Grading System</option>
                      {gradingSystems.map(sys => (
                        <option key={sys} value={sys}>{sys}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                {/* CGPA */}
                {formData.gradingSystem && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Determine label based on grading system */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {formData.gradingSystem.includes("Marks") ? "Marks Obtained" : "CGPA"}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="cgpa"
                        step="0.01"
                        value={formData.cgpa}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                        placeholder="e.g. 8.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Out of<span className="text-red-500">*</span>
                      </label>
                      <select
                        name="cgpaOutOf"
                        value={formData.cgpaOutOf}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white appearance-none"
                      >
                        <option value="10">10</option>
                        <option value="4">4</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* 12th/10th Specific Fields */}
            {["12th", "10th"].includes(formData.highestQualification) && (
              <div className="space-y-6">
                {/* Medium */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medium<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="medium"
                    value={formData.medium}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                    placeholder="Select or type medium"
                    required
                  />
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-2">Suggestions</p>
                    <div className="flex flex-wrap gap-2">
                      {mediumOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, medium: option }))}
                          className={`px-4 py-2 rounded-full border transition-all text-sm ${formData.medium === option
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                              : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Percentage and Passing Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Percentage of marks<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                      placeholder="e.g. 85.5 or Select Range"
                      required
                    />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passing year<span className="text-red-500">*</span>
                     </label>
                     <div className="relative">
                       <select
                         name="passingYear"
                         value={formData.passingYear}
                         onChange={handleInputChange}
                         className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white appearance-none"
                         required
                       >
                         <option value="">Select</option>
                         {passingYears.map(year => (
                           <option key={year} value={year}>{year}</option>
                         ))}
                       </select>
                       <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                     </div>
                  </div>
                </div>

                {/* Percentage Suggestions */}
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">Suggestions</p>
                  <div className="flex flex-wrap gap-2">
                    {percentageOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, percentage: option }))}
                        className={`px-4 py-2 rounded-full border transition-all text-sm ${formData.percentage === option
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Key Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key skills<span className="text-red-500">*</span>
              </label>
              <textarea
                name="keySkills"
                value={formData.keySkills}
                onChange={handleInputChange}
                rows={3}
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white resize-none"
                placeholder="Key skills are crucial for recruiters to hire you (comma separated)"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Saving...' : 'Save and continue'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
