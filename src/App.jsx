import { Toaster } from "sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./Context/AuthContext";
import { JobProvider } from "./Context/JobContext";
import { RecuitersProvider } from "./Context/RecuitersContext";
import Index from "./pages/Index";
import UserHomePage from "./pages/Page/UserHomePage";
import RecuitersHomePage from "./pages/Recuiters/RecuitersHomePage";
import JobPost from "./pages/Recuiters/JobPost";
import RecruiterProfile from "./pages/Recuiters/Profile";
import ManageJob from "./pages/Recuiters/ManageJob";
import Candidates from "./pages/Recuiters/Candidates";
import SkillMatch from "./pages/Recuiters/SkillMatch";
import MeetingRoom from "./pages/Recuiters/MeetingRoom";
import RecuiterInterviewpage from "./pages/Recuiters/RecuiterInterviewpage";
import Application from "./pages/Recuiters/Application";
import Proposal from "./pages/Recuiters/Proposal";
import ShortListProposals from "./pages/Recuiters/ShortListProposals";
import BillingANDPayments from "./pages/Recuiters/BillingANDPayments";
import FreelancingPost from "./pages/Recuiters/FreelancingPost";
import ManageFreelnacing from "./pages/Recuiters/ManageFreelnacing";
import FreelancingPostDetials from "./pages/Recuiters/FreelancingPostDetials";
import Jobs from "./pages/Page/Jobs";
import JobDetails from "./pages/Page/JobDetails";
import Companies from "./pages/Page/Companies";
import CompanyDetails from "./pages/Page/CompanyDetails";
import Freelancing from "./pages/Page/Freelancing";
import ProjectDetails from "./pages/Page/ProjectDetails";
import Notifications from "./pages/Page/Notifications";
import Profile from "./pages/Page/Profile";
import MyApplication from "./pages/Page/MyApplication";
import Interview from "./pages/Page/Interview";
import SaveData from "./pages/Page/SaveData";
import MyProposals from "./pages/Page/MyProposals";
import NotFound from "./pages/NotFound";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ApplyJobs from "./pages/Page/ApplyJobs";


const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <JobProvider>
          <RecuitersProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/user-home" element={<UserHomePage />} />
                  <Route path="/recruiter-home" element={<RecuitersHomePage />} />
                  <Route path="/recruiter/post-job" element={<JobPost />} />
                  <Route path="/recruiter/post-freelance" element={<FreelancingPost />} />
                  <Route path="/recruiter/manage-freelance" element={<ManageFreelnacing />} />
                  <Route path="/recruiter/manage-freelance/:projectId" element={<FreelancingPostDetials />} />
                  <Route path="/recruiter/profile" element={<RecruiterProfile />} />
                  <Route path="/manage-jobs" element={<ManageJob />} />
                  <Route path="/candidates" element={<Candidates />} />
                  <Route path="/skill-matches" element={<SkillMatch />} />
                  <Route path="/meet/:roomCode" element={<MeetingRoom />} />
                  <Route path="/recruiter-interviews" element={<RecuiterInterviewpage />} />
                  <Route path="/applications" element={<Application />} />
                  <Route path="/proposals" element={<Proposal />} />
                  <Route path="/shortlisted-proposals" element={<ShortListProposals />} />
                  <Route path="/recruiter/billing" element={<BillingANDPayments />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/jobs/:jobId/apply" element={<ApplyJobs />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/companies/:id" element={<CompanyDetails />} />
                  <Route path="/freelance" element={<Freelancing />} />
                  <Route path="/freelance/:id" element={<ProjectDetails />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/my-applications" element={<MyApplication />} />
                  <Route path="/my-proposals" element={<MyProposals />} />
                  <Route path="/interviews" element={<Interview />} />
                  <Route path="/saved-jobs" element={<SaveData />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </RecuitersProvider>
        </JobProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
