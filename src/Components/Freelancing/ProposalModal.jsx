import React, { useState, useRef, useContext } from 'react';
import { X, Paperclip, IndianRupee, Clock, Send, Loader2, FileText } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'sonner';

const ProposalModal = ({ isOpen, onClose, project }) => {
  const { token, user } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedBudget: '',
    deliveryDays: '',
    experience: 'Beginner',
    estimatedHours: '',
    skills: '',
    portfolio: '',
    milestones: '',
    questions: ''
  });

  const [attachments, setAttachments] = useState([]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    const newAttachments = [];

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large (max 10MB)`);
        continue;
      }

      try {
        const base64 = await convertToBase64(file);
        newAttachments.push({
          fileUrl: base64,
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
        });
      } catch (err) {
        toast.error(`Failed to read ${file.name}`);
      }
    }

    setAttachments(prev => [...prev, ...newAttachments]);
    setIsUploading(false);
    e.target.value = ''; // Reset input
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.coverLetter || !formData.proposedBudget || !formData.deliveryDays) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        projectId: project?._id || project?.id,
        recId: project?.recruiterId || project?.recId || project?.postedBy, // Try common fields
        freelancerId: user?._id || user?.id,
        coverLetter: formData.coverLetter,
        proposedBudget: Number(formData.proposedBudget),
        deliveryDays: Number(formData.deliveryDays),
        attachments: attachments.map(a => ({ fileUrl: a.fileUrl })),
        // Additional fields from form if needed by backend (though schema is simple)
        experience: formData.experience,
        estimatedHours: Number(formData.estimatedHours),
        skills: formData.skills,
        portfolio: formData.portfolio,
        milestones: formData.milestones,
        questions: formData.questions
      };

      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/apply-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Proposal submitted successfully!');
        onClose();
      } else {
        toast.error(data.message || 'Failed to submit proposal');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Submit Proposal</h2>
            <p className="text-sm font-bold text-slate-500 mt-1">Project: <span className="text-teal-600">{project?.title}</span></p>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all group">
            <X className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto space-y-6 custom-scrollbar">

          {/* Cover Letter */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Cover Letter <span className="text-rose-500">*</span></label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Describe why you are the best fit for this project..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Budget + Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Proposed Budget <span className="text-rose-500">*</span></label>
              <div className="relative group">
                <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="number"
                  name="proposedBudget"
                  value={formData.proposedBudget}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 5000"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Delivery Time (Days) <span className="text-rose-500">*</span></label>
              <div className="relative group">
                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="number"
                  name="deliveryDays"
                  value={formData.deliveryDays}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 5"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none"
                />
              </div>
            </div>

          </div>

          {/* Experience + Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Experience Level</label>
              <select 
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none cursor-pointer appearance-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Estimated Hours</label>
              <input
                type="number"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleInputChange}
                placeholder="e.g. 40"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none"
              />
            </div>

          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Skills (Comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none"
            />
          </div>

          {/* Portfolio */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Portfolio Link</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              placeholder="https://portfolio.com"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none"
            />
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Attachments</label>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            <div 
              onClick={handleFileClick}
              className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center bg-slate-50/50 hover:bg-slate-50 hover:border-teal-500 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                {isUploading ? <Loader2 className="w-5 h-5 text-teal-600 animate-spin" /> : <Paperclip className="w-5 h-5 text-teal-600" />}
              </div>
              <p className="text-sm font-black text-slate-900">Click to upload files</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PDF, JPG, PNG (Max 10MB per file)</p>
            </div>

            {/* Selected Files List */}
            {attachments.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm group">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-900 truncate tracking-tight">{file.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{file.size}</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Milestones */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Proposed Milestones</label>
            <textarea
              name="milestones"
              value={formData.milestones}
              onChange={handleInputChange}
              rows="2"
              placeholder="e.g. Phase 1: Design & Wireframes (2 days) - $1500"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Questions */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Questions for Client</label>
            <textarea
              name="questions"
              value={formData.questions}
              onChange={handleInputChange}
              rows="2"
              placeholder="Ask the client anything about the project scope..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none resize-none leading-relaxed"
            />
          </div>

        </form>

        {/* Footer */}
        <div className="p-8 flex gap-4 border-t bg-slate-50/50">
          <button
            onClick={onClose}
            className="flex-1 py-4 border border-slate-200 bg-white rounded-2xl text-xs font-black text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all uppercase tracking-widest"
          >
            Cancel
          </button>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || isUploading}
            className="flex-1 py-4 bg-teal-600 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-teal-500 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-teal-600/20 uppercase tracking-widest"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
          </button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}} />
    </div>
  );
};

export default ProposalModal;