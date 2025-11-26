import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BeARider from "../pages/BeARider/BeARider";
import Converage from "../pages/Converage/Converage";
import SendParcel from "../pages/SendParcel/SendParcel";
import Dashboard from "../layouts/Dashboard";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import Riders from "../pages/Dashboard/Riders/Riders";

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
                path:"be-a-rider",
                element:<PrivateRoute><BeARider/></PrivateRoute>,
                loader:()=>fetch('/serviceCenters.json')
            },
            {
                path:'converage',
                Component:Converage,
                loader:()=>fetch('/serviceCenters.json')
            },
            {
                path:'send-parcel',
                element:<PrivateRoute><SendParcel/></PrivateRoute>,
                loader:()=>fetch('/serviceCenters.json').then(res=>res.json())
            }
        ]
    },
    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:"login",
                Component:Login
            },
            {
                path:"register",
                Component:Register
            },
        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:"my-parcels",
                Component:MyParcels
            },
            {
                path:"payment-success",
                Component:PaymentSuccess
            }
            ,
            {
                path:"payment-cancel",
                Component:PaymentCancel
            }
            ,
            {
                path:"riders",
                Component:Riders
            }
        ]
    }
])