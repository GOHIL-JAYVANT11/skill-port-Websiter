import React, { useState } from 'react';
import { Star, Briefcase, Info, MessageSquare, Award, Clock, Heart, Users, MapPin, ExternalLink, Globe, Linkedin, Twitter, Facebook } from 'lucide-react';
import JobCard from '../Jobs/JobCard';

const CompanyDetailsTabs = ({ company }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Jobs', 'Reviews', 'About'];

  const OverviewTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* About Section */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-teal-600" />
          About {company.name}
        </h3>
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            SkillTech is a skill-driven IT company focused on AI recruitment solutions and next-generation talent management systems. We bridge the gap between academic learning and industry requirements through our innovative platform. Our mission is to democratize career opportunities by focusing on verifiable skills rather than traditional credentials.
          </p>
          <button className="mt-4 text-teal-600 text-sm font-bold hover:underline">Read More</button>
        </div>
      </section>

      {/* Departments Hiring */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Departments Hiring</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: 'Engineering', count: 6, bg: 'bg-blue-50', color: 'text-blue-600' },
            { name: 'Marketing', count: 4, bg: 'bg-emerald-50', color: 'text-emerald-600' },
            { name: 'Product', count: 3, bg: 'bg-purple-50', color: 'text-purple-600' },
            { name: 'HR', count: 2, bg: 'bg-orange-50', color: 'text-orange-600' },
          ].map((dept) => (
            <div key={dept.name} className={`${dept.bg} rounded-xl p-4 border border-transparent hover:border-slate-200 transition-all cursor-pointer group`}>
              <p className={`text-sm font-bold ${dept.color} mb-1`}>{dept.name}</p>
              <p className="text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors">{dept.count} Openings</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          Employee Benefits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Skill Training', desc: 'Unlimited access to premium courses', icon: Award, color: 'text-teal-600' },
            { title: 'Remote Work', desc: 'Flexible work from anywhere options', icon: Globe, color: 'text-blue-600' },
            { title: 'Health Insurance', desc: 'Full coverage for you and family', icon: Heart, color: 'text-rose-500' },
            { title: 'Flexible Hours', desc: 'Focus on output, not clock hours', icon: Clock, color: 'text-amber-600' },
          ].map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-0.5">{benefit.title}</p>
                <p className="text-xs text-slate-500 font-medium">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ratings Detail */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Employee Ratings</h3>
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-5">
          {[
            { label: 'Skill Development', rating: 4.6 },
            { label: 'Career Growth', rating: 4.3 },
            { label: 'Work Life Balance', rating: 4.1 },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>{item.label}</span>
                <span className="text-teal-600">⭐ {item.rating}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(item.rating / 5) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const JobsTab = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {[
        { id: 101, title: 'Senior Frontend Engineer', companyName: company.name, location: company.location, salary: '₹18L - ₹25L', experience: '3-5 Yrs', postedTime: '2 days ago', skills: ['React', 'Node', 'AI'], matchPercentage: 92 },
        { id: 102, title: 'UI/UX Designer', companyName: company.name, location: company.location, salary: '₹12L - ₹18L', experience: '2-4 Yrs', postedTime: '5 days ago', skills: ['Figma', 'Sketch'], matchPercentage: 85 },
      ].map(job => (
        <JobCard key={job.id} job={job} isLoggedIn={true} />
      ))}
    </div>
  );

  const ReviewsTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Recent Reviews</h3>
        <button className="px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-lg hover:bg-teal-700 transition-all shadow-sm shadow-teal-600/10">
          Add Review
        </button>
      </div>
      {[1, 2].map(review => (
        <div key={review} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-3.5 h-3.5 ${star <= 4 ? 'fill-amber-500' : ''}`} />)}
            </div>
            <span className="text-xs font-bold text-slate-900 ml-2">Software Engineer</span>
            <span className="text-xs text-slate-400 font-medium">• 3 months ago</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed italic">
            "Great work culture and strong focus on skill development. The management is very supportive and provides ample opportunities to learn new technologies."
          </p>
        </div>
      ))}
    </div>
  );

  const AboutTab = () => (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Contact Info</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-600">
              <Globe className="w-4 h-4 text-teal-600" />
              <a href="#" className="text-sm font-semibold hover:text-teal-600 transition-colors">www.skilltech.com</a>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold">Ahmedabad, Gujarat (HQ)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Company Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Founded</p>
              <p className="text-sm font-bold text-slate-900">2015</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Team Size</p>
              <p className="text-sm font-bold text-slate-900">51-200 Employees</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-50">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Mission & Vision</h4>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          Our mission is to empower every professional to realize their potential through skill-based hiring. We envision a world where talent is recognized by what they can do, not just where they studied.
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-50">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Follow Us</h4>
        <div className="flex items-center gap-4">
          {[Linkedin, Twitter, Facebook].map((Icon, idx) => (
            <a key={idx} href="#" className="p-3 bg-slate-50 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex items-center gap-8 mb-8 border-b border-slate-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full animate-in fade-in slide-in-from-left-2 duration-300"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'Overview' && <OverviewTab />}
        {activeTab === 'Jobs' && <JobsTab />}
        {activeTab === 'Reviews' && <ReviewsTab />}
        {activeTab === 'About' && <AboutTab />}
      </div>
    </div>
  );
};

export default CompanyDetailsTabs;
