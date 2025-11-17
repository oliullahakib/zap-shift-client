import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BeARider from "../pages/BeARider/BeARider";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"/be-a-rider",
                element:<PrivateRoute><BeARider/></PrivateRoute>
            }
        ]
    },
    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:"/login",
                Component:Login
            },
            {
                path:"/register",
                Component:Register
            },
        ]
    }
])