import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Page/HomePage";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import UserHomePage from "../pages/Page/UserHomePage";
import Jobs from "../pages/Page/Jobs";
import JobDetails from "../pages/Page/JobDetails";
import SavedJobs from "../pages/Page/SavedJobs";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,     
    },
    {
        path: "/login",
        element: <Login />,     
    },
    {
        path: "/register",
        element: <Register />,     
    },
    {
        path: "/HomePage",
        element: <UserHomePage />,     
    },
    {
        path: "/jobs",
        element: <Jobs />,     
    },
    {
        path: "/jobs/:id",
        element: <JobDetails />,     
    },
    {
        path: "/saved-jobs",
        element: <SavedJobs />,     
    },

    
]);
export default router;
