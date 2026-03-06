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
import Application from "./pages/Recuiters/Application";
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
import NotFound from "./pages/NotFound";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";


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
                  <Route path="/recruiter/profile" element={<RecruiterProfile />} />
                  <Route path="/manage-jobs" element={<ManageJob />} />
                  <Route path="/candidates" element={<Candidates />} />
                  <Route path="/skill-matches" element={<SkillMatch />} />
                  <Route path="/applications" element={<Application />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/companies/:id" element={<CompanyDetails />} />
                  <Route path="/freelance" element={<Freelancing />} />
                  <Route path="/freelance/:id" element={<ProjectDetails />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/my-applications" element={<MyApplication />} />
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
