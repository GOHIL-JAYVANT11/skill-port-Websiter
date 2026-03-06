import React, { useState } from 'react';
import { 
  Edit3, 
  Plus, 
  Building2, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  Sparkles, 
  Video, 
  ShieldCheck, 
  Target, 
  Lock, 
  Bell, 
  Trash2,
  ChevronRight,
  X,
  Check,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

const SectionCard = ({ title, children, onEdit, onAdd, boost, id, isEditing, onSave, onCancel }) => (
  <div id={id} className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border ${isEditing ? 'border-teal-500 ring-4 ring-teal-500/5' : 'border-slate-100'} group/card relative scroll-mt-24 transition-all duration-300`}>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <h3 className={`text-xl font-black tracking-tight ${isEditing ? 'text-teal-600' : 'text-slate-900'}`}>{title}</h3>
        {boost && !isEditing && (
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Add {boost}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!isEditing ? (
          <>
            {onEdit && (
              <button onClick={onEdit} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            {onAdd && (
              <button onClick={onAdd} className="flex items-center gap-1.5 px-4 py-2 text-xs font-black text-teal-600 hover:bg-teal-50 rounded-xl transition-all uppercase tracking-widest">
                <Plus className="w-4 h-4" />
                Add Details
              </button>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={onCancel} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Cancel">
              <X className="w-5 h-5" />
            </button>
            <button onClick={onSave} className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-teal-200" title="Save Changes">
              <Check className="w-4 h-4" />
              Save
            </button>
          </div>
        )}
      </div>
    </div>
    <div className={isEditing ? 'animate-in fade-in slide-in-from-top-2 duration-300' : ''}>
      {children}
    </div>
  </div>
);

const InfoRow = ({ label, value, icon: Icon, isLink }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-50 last:border-0 gap-2">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="w-4 h-4 text-slate-400" />}
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </div>
    <div className="text-right">
      {isLink ? (
        <a href={value} target="_blank" rel="noreferrer" className="text-sm font-bold text-teal-600 hover:underline truncate max-w-[200px] inline-block">
          {value || 'Not added'}
        </a>
      ) : (
        <span className={`text-sm font-bold ${value ? 'text-slate-800' : 'text-slate-300 italic'}`}>
          {value || 'Not added'}
        </span>
      )}
    </div>
  </div>
);

const RecruiterProfileSections = ({ formData, handleInputChange, onSave }) => {
  const [activeSection, setActiveSection] = useState(null);

  const handleEdit = (section) => setActiveSection(section);
  const handleCancel = () => setActiveSection(null);
  const handleSaveClick = () => {
    onSave();
    setActiveSection(null);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server/storage bucket
      // For now, we'll create a local URL to display it
      const objectUrl = URL.createObjectURL(file);
      
      // Simulate an event object to reuse handleInputChange
      handleInputChange({
        target: {
          name: 'companyLogo',
          value: objectUrl // In real app: response.data.url
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Company Information */}
      <SectionCard 
        title="Company Information" 
        id="company" 
        boost={!formData.companyName ? "+20%" : null}
        isEditing={activeSection === 'company'}
        onEdit={() => handleEdit('company')}
        onSave={handleSaveClick}
        onCancel={handleCancel}
        onAdd={!formData.companyName ? () => handleEdit('company') : null}
      >
        {activeSection === 'company' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Company Name *</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/10 outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Industry *</label>
              <input type="text" name="industry" value={formData.industry} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/10 outline-none transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Company Size *</label>
              <select name="companySize" value={formData.companySize} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6] bg-white">
                <option value="">Select Size</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="200+">200+</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Founded Year</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" placeholder="e.g. 2020" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Company Website</label>
              <div className="relative">
                <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" placeholder="https://company.com" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-bold text-slate-700">About Company</label>
              <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6] resize-none" placeholder="Describe your company culture, mission and vision..." />
              <p className="text-right text-[10px] text-slate-400 font-bold">0 / 2000 characters</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <InfoRow label="Company Name" value={formData.companyName} icon={Building2} />
            <InfoRow label="Industry" value={formData.industry} />
            <InfoRow label="Company Size" value={formData.companySize} />
            <InfoRow label="Website" value={formData.companyWebsite} isLink icon={Globe} />
            <div className="pt-4 mt-2 border-t border-slate-50">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {formData.about || 'No description added yet. Click edit to add details about your company culture and mission.'}
              </p>
            </div>
          </div>
        )}
      </SectionCard>

      {/* Personal Information */}
      <SectionCard 
        title="Personal Information" 
        id="personal" 
        boost={!formData.fullName ? "+10%" : null}
        isEditing={activeSection === 'personal'}
        onEdit={() => handleEdit('personal')}
        onSave={handleSaveClick}
        onCancel={handleCancel}
        onAdd={!formData.fullName ? () => handleEdit('personal') : null}
      >
        {activeSection === 'personal' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Full Name *</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Designation *</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Work Email *</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Mobile Number *</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-bold text-slate-700">LinkedIn Profile</label>
              <div className="relative">
                <Linkedin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" placeholder="linkedin.com/in/username" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <InfoRow label="Full Name" value={formData.fullName} icon={User} />
            <InfoRow label="Designation" value={formData.designation} />
            <InfoRow label="Work Email" value={formData.personalEmail} icon={Mail} />
            <InfoRow label="Mobile" value={formData.mobile} icon={Phone} />
            <InfoRow label="LinkedIn" value={formData.linkedin} isLink icon={Linkedin} />
          </div>
        )}
      </SectionCard>

      {/* Company Branding */}
      <SectionCard 
        title="Company Branding" 
        id="branding" 
        boost="+15%"
        isEditing={activeSection === 'branding'}
        onEdit={() => handleEdit('branding')}
        onSave={handleSaveClick}
        onCancel={handleCancel}
      >
        {activeSection === 'branding' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Company Logo *</label>
                <div 
                  className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:border-[#14B8A6] hover:bg-teal-50 transition-all cursor-pointer group relative"
                  onClick={() => document.getElementById('logo-upload').click()}
                >
                  <input 
                    type="file" 
                    id="logo-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  {formData.companyLogo ? (
                    <img src={formData.companyLogo} alt="Logo" className="w-20 h-20 object-contain mb-2" />
                  ) : (
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#14B8A6] transition-colors">
                      <Plus size={24} />
                    </div>
                  )}
                  <p className="text-xs font-bold text-slate-500">{formData.companyLogo ? 'Click to change' : 'Upload SVG, PNG or JPG'}</p>
                </div>
              </div>
              {/* <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Cover Banner</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:border-[#14B8A6] hover:bg-teal-50 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#14B8A6] transition-colors">
                    <Plus size={24} />
                  </div>
                  <p className="text-xs font-bold text-slate-500">Recommended 1200x400</p>
                </div>
              </div> */}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Intro Video URL (YouTube/Vimeo)</label>
              <div className="relative">
                <Video size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="youtube" value={formData.youtube} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" placeholder="https://youtube.com/watch?v=..." />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                 <Building2 className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-xs font-bold text-slate-500">Company Logo</p>
            </div>
            {/* <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden">
               <div className="absolute inset-0 bg-slate-100" />
               <div className="relative z-10 flex flex-col items-center">
                 <Sparkles className="w-8 h-8 text-slate-300 mb-2" />
                 <p className="text-xs font-bold text-slate-500">Cover Banner</p>
               </div>
            </div> */}
          </div>
        )}
      </SectionCard>

      {/* Verification Documents */}
      {/* <SectionCard 
        title="Verification Documents" 
        id="verification" 
        boost="+25%"
        isEditing={activeSection === 'verification'}
        onEdit={() => handleEdit('verification')}
        onSave={handleSaveClick}
        onCancel={handleCancel}
      >
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 mb-6 flex gap-4">
          <div className="shrink-0 w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-900">Get the Verified Badge</p>
            <p className="text-xs text-amber-700 leading-relaxed">Verified recruiters receive <span className="font-bold">3x more applications</span> and appear higher in candidate searches.</p>
          </div>
        </div>

        {activeSection === 'verification' ? (
          <div className="space-y-5">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                  <Target size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Business Registration Certificate</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Required for Badge</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white text-slate-600 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50">Upload</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">GST Number (Optional)</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" placeholder="22AAAAA0000A1Z5" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Company PAN (Optional)</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#14B8A6]" placeholder="ABCDE1234F" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
             <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                   <FileText className="w-5 h-5 text-slate-400" />
                   <span className="text-sm font-bold text-slate-600">Business Registration</span>
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Pending</span>
             </div>
             <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                   <FileText className="w-5 h-5 text-slate-400" />
                   <span className="text-sm font-bold text-slate-600">GST Number</span>
                </div>
                <span className="text-xs font-bold text-slate-400 italic">Not added</span>
             </div>
          </div>
        )}
      </SectionCard> */}

      {/* Account & Security */}
      {/* <SectionCard title="Account & Security" id="account">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#14B8A6] transition-all group">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-700">Change Password</span>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-[#14B8A6]" />
          </button>
          <button className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#14B8A6] transition-all group">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-700">Notifications</span>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-[#14B8A6]" />
          </button>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">Deactivate Account</p>
            <p className="text-xs text-slate-500">Temporarily hide your profile and jobs.</p>
          </div>
          <button className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5">
            <Trash2 size={14} /> Deactivate
          </button>
        </div>
      </SectionCard> */}
    </div>
  );
};

export default RecruiterProfileSections;
