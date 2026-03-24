import React, { useState, useEffect, useContext } from 'react';
import ProjectCard from './ProjectCard';
import { AuthContext } from '../../Context/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ErrorBoundary from '../Common/ErrorBoundary';

const FreelancingListing = () => {
  const { token, user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProjects = async () => {
    try {
      // Corrected to the recruiter namespace where the endpoint is located
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-all-freelance-projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response as JSON:', text.substring(0, 100));
        throw new Error('Invalid JSON response from server');
      }

      if (response.ok && data.success) {
        setProjects(data.data || []);
      } else {
        toast.error(data.message || 'Failed to load projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('An error occurred while fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Freelance Projects</h1>
        <p className="text-sm text-slate-500 font-medium">Find high-quality projects matched to your specific skills</p>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
          <p className="text-slate-400 font-bold">Loading opportunities...</p>
        </div>
      ) : projects.length > 0 ? (
        <div className="space-y-6">
          {projects.map((project) => (
            <ErrorBoundary key={project._id}>
              <ProjectCard 
                project={project} 
                onClick={handleCardClick}
              />
            </ErrorBoundary>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No freelance projects found at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default FreelancingListing;
