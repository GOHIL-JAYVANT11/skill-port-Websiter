import React from 'react'

const RecruiterProfileSummary = ({ user }) => {
  if (!user) {
    return <div className="text-slate-600">No recruiter profile found</div>
  }
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-black text-slate-900 mb-2">Recruiter Profile</h2>
      <div className="text-sm text-slate-700">
        <div className="mb-1">Name: {user.Fullname || user.name || 'N/A'}</div>
        <div className="mb-1">Email: {user.email || 'N/A'}</div>
        <div className="mb-1">Role: {Array.isArray(user.Role) ? user.Role.join(', ') : (user.Role || user.role || 'N/A')}</div>
      </div>
      <pre className="mt-4 text-xs bg-slate-50 p-3 rounded-lg overflow-auto">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export default RecruiterProfileSummary
