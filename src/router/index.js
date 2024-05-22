/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/SignUp/Home";
import { Login } from "../pages/Login";
import { Tickets} from "../pages/Tickets"
import {Profile} from "../pages/Profile"
import { Buy } from "../pages/Tickets/Buy";


export default createBrowserRouter([

    {
        path:"/",
        Component: App,
        children:[
        {
            path:"/",
            index:true,
            Component:Home,
        },

        {
            path:"/signup",
            Component:SignUp
        },
        {
            path:"/login",
            Component:Login
        },
        {
            path:"/ticket",
            Component:Tickets
        },
        {
            path:"/ticket/:id",
            Component:Buy
        },

        {
            path: "/profile/:id",
            Component: Profile
        },

    ]
    }
  ]);