import React from 'react';

const FilterTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['All', 'Pending', 'Accepted', 'Rejected'];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === tab 
            ? 'text-teal-700 bg-teal-50' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-teal-600 rounded-t-full animate-in fade-in slide-in-from-bottom-1" />
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
