import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import AdminView from "../Pages/AdminView.jsx";
import AdminForm from "../Pages/AdminForm.jsx";

const router = createBrowserRouter([
    {
        path: "/*",
        element: <Home/>
    },
    {
        path: "/admin",
        element: <AdminView/>
    },
    {
        path: "/admin/form",
        element: <AdminForm/>
    
    }
]);

export default router;