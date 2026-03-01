import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import RecruiterProfileSummary from '../../Components/Recuiters-Home/RecruiterProfileSummary'

const RecuitersHomePage = () => {
  const { fetchProfile, loading, user } = useContext(AuthContext)

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <div className="p-6">
      {loading ? (
        <div className="text-slate-600">Loading recruiter profile...</div>
      ) : (
        <RecruiterProfileSummary user={user} />
      )}
    </div>
  )
}

export default RecuitersHomePage
