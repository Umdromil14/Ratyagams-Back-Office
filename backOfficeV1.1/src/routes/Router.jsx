import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import AdminView from "../Pages/AdminView.jsx";

const router = createBrowserRouter([
    {
        path: "/*",
        element: <Home/>
    },
    {
        path: "/admin",
        element: <AdminView/>
    }
    //children and outlet
]);

export default router;