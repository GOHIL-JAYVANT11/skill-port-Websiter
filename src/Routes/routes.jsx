import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Page/HomePage";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";



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
    
]);
export default router;
